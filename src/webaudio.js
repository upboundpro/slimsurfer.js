import * as util from './util';

// using consts to prevent someone writing the string wrong
const PLAYING = 'playing';
const PAUSED = 'paused';
const FINISHED = 'finished';

/**
 * WebAudio backend
 *
 * @extends {Observer}
 */
export default class WebAudio extends util.Observer {
    /** @private */
    static scriptBufferSize = 256;
    /** @private */
    audioContext = null;
    /** @private */
    offlineAudioContext = null;
    /** @private */
    stateBehaviors = {
        [PLAYING]: {
            init() {
                this.addOnAudioProcess();
            },
            getPlayedPercents() {
                const duration = this.getDuration();
                return this.getCurrentTime() / duration || 0;
            },
            getCurrentTime() {
                return this.startPosition + this.getPlayedTime();
            }
        },
        [PAUSED]: {
            init() {
                this.removeOnAudioProcess();
            },
            getPlayedPercents() {
                const duration = this.getDuration();
                return this.getCurrentTime() / duration || 0;
            },
            getCurrentTime() {
                return this.startPosition;
            }
        },
        [FINISHED]: {
            init() {
                this.removeOnAudioProcess();
                this.fireEvent('finish');
            },
            getPlayedPercents() {
                return 1;
            },
            getCurrentTime() {
                return this.getDuration();
            }
        }
    };

    /**
     * Construct the backend
     *
     * @param {WavesurferParams} params initialization params for the backend
     */
    constructor(params) {
        super();
        /** @private */
        this.params = params;
        /**@private */
        this.lastPlay = this.ac.currentTime;
        /** @private */
        this.startPosition = 0;
        /** @private  */
        this.scheduledPause = null;
        /** @private */
        this.states = {
            [PLAYING]: Object.create(this.stateBehaviors[PLAYING]),
            [PAUSED]: Object.create(this.stateBehaviors[PAUSED]),
            [FINISHED]: Object.create(this.stateBehaviors[FINISHED])
        };
        /** @private */
        this.analyser = null;
        /** @private */
        this.buffer = null;
        /** @private */
        this.filters = [];
        /** @private */
        this.gainNode = null;
        /** @private */
        this.mergedPeaks = null;
        /** @private */
        this.offlineAc = null;
        /** @private */
        this.peaks = null;
        /** @private */
        this.playbackRate = 1;
        /** @private */
        this.analyser = null;
        /** @private */
        this.scriptNode = null;
        /** @private */
        this.source = null;
        /** @private */
        this.splitPeaks = [];
        /** @private */
        this.state = null;
        /** @private */
        this.explicitDuration = null;
    }

    /**
     * Initialize the backend, called in `slimsurfer.createBackend()`
     */
    init() {
        this.createVolumeNode();
        this.createScriptNode();
        this.createAnalyserNode();

        this.setState(PAUSED);
        this.setPlaybackRate(1.0);
        this.setLength(0);
    }

    /** @private */
    disconnectFilters() {
        if (this.filters) {
            this.filters.forEach(filter => {
                filter && filter.disconnect();
            });
            this.filters = null;
            // Reconnect direct path
            this.analyser.connect(this.gainNode);
        }
    }

    /**
     * 
     *
     * @param {...AudioNode} state the state of the backend
     */
    setState(state) {
        if (this.state !== this.states[state]) {
            this.state = this.states[state];
            this.state.init.call(this);
        }
    }

    /**
     * Unpacked `setFilters()`
     *
     * @param {...AudioNode} filters
     */
    setFilter(...filters) {
        this.setFilters(filters);
    }

    /**
     * Insert custom Web Audio nodes into the graph
     *
     * @param {AudioNode[]} filters Packed filters array
     * @example
     * const lowpass = slimsurfer.backend.ac.createBiquadFilter();
     * slimsurfer.backend.setFilter(lowpass);
     */
    setFilters(filters) {
        // Remove existing filters
        this.disconnectFilters();

        // Insert filters if filter array not empty
        if (filters && filters.length) {
            this.filters = filters;

            // Disconnect direct path before inserting filters
            this.analyser.disconnect();

            // Connect each filter in turn
            filters
                .reduce((prev, curr) => {
                    prev.connect(curr);
                    return curr;
                }, this.analyser)
                .connect(this.gainNode);
        }
    }

    /** @private */
    createScriptNode() {
        if (this.params.audioScriptProcessor) {
            this.scriptNode = this.params.audioScriptProcessor;
        } else {
            if (this.ac.createScriptProcessor) {
                this.scriptNode = this.ac.createScriptProcessor(
                    WebAudio.scriptBufferSize
                );
            } else {
                this.scriptNode = this.ac.createJavaScriptNode(
                    WebAudio.scriptBufferSize
                );
            }
        }
        this.scriptNode.connect(this.ac.destination);
    }

    /** @private */
    addOnAudioProcess() {
        this.scriptNode.onaudioprocess = () => {
            const time = this.getCurrentTime();

            if (time >= this.getDuration()) {
                this.setState(FINISHED);
                this.fireEvent('pause');
            } else if (time >= this.scheduledPause) {
                this.pause();
            } else if (this.state === this.states[PLAYING]) {
                this.fireEvent('audioprocess', time);
            }
        };
    }

    /** @private */
    removeOnAudioProcess() {
        this.scriptNode.onaudioprocess = null;
    }

    /** @private */
    createAnalyserNode() {
        this.analyser = this.ac.createAnalyser();
        this.analyser.connect(this.gainNode);
    }

    /** @private */
    decodeArrayBuffer(arraybuffer, callback, errback) {
        if (!this.offlineAc) {
            this.offlineAc = this.getOfflineAudioContext(
                this.ac ? this.ac.sampleRate : 44100
            );
        }
        this.offlineAc.decodeAudioData(
            arraybuffer,
            data => callback(data),
            errback
        );
    }

    /**
     * Set pre-decoded peaks
     *
     * @param {number[]|number[][]} peaks
     * @param {?number} duration
     */
    setPeaks(peaks, duration) {
        this.explicitDuration = duration;
        this.peaks = peaks;
    }

    /**
     * Set the rendered length (different from the length of the audio).
     *
     * @param {number} length
     */
    setLength(length) {
        // No resize, we can preserve the cached peaks.
        if (this.mergedPeaks && length == 2 * this.mergedPeaks.length - 1 + 2) {
            return;
        }

        this.splitPeaks = [];
        this.mergedPeaks = [];
        // Set the last element of the sparse array so the peak arrays are
        // appropriately sized for other calculations.
        const channels = this.buffer ? this.buffer.numberOfChannels : 1;
        let c;
        for (c = 0; c < channels; c++) {
            this.splitPeaks[c] = [];
            this.splitPeaks[c][2 * (length - 1)] = 0;
            this.splitPeaks[c][2 * (length - 1) + 1] = 0;
        }
        this.mergedPeaks[2 * (length - 1)] = 0;
        this.mergedPeaks[2 * (length - 1) + 1] = 0;
    }

    /**
     * Get the position from 0 to 1
     *
     * @return {number}
     */
    getPlayedPercents() {
        return this.state.getPlayedPercents.call(this);
    }

    /** @private */
    disconnectSource() {
        if (this.source) {
            this.source.disconnect();
        }
    }

    /**
     * This is called when slimsurfer is destroyed
     */
    destroy() {
        if (!this.isPaused()) {
            this.pause();
        }
        this.unAll();
        this.buffer = null;
        this.disconnectFilters();
        this.disconnectSource();
        this.gainNode.disconnect();
        this.scriptNode.disconnect();
        this.analyser.disconnect();

        // close the audioContext if closeAudioContext option is set to true
        if (this.params.closeAudioContext) {
            // check if browser supports AudioContext.close()
            if (
                typeof this.ac.close === 'function' &&
                this.ac.state != 'closed'
            ) {
                this.ac.close();
            }
            // clear the reference to the audiocontext
            this.ac = null;
            // clear the actual audiocontext, either passed as param or the
            // global singleton
            if (!this.params.audioContext) {
                window.WaveSurferAudioContext = null;
            } else {
                this.params.audioContext = null;
            }
            // clear the offlineAudioContext
            window.WaveSurferOfflineAudioContext = null;
        }
    }

    /** @private */
    createSource() {
        this.disconnectSource();
        this.source = this.ac.createBufferSource();

        // adjust for old browsers
        this.source.start = this.source.start || this.source.noteGrainOn;
        this.source.stop = this.source.stop || this.source.noteOff;

        this.source.playbackRate.setValueAtTime(
            this.playbackRate,
            this.ac.currentTime
        );
        this.source.buffer = this.buffer;
        this.source.connect(this.analyser);
    }

    /**
     * Used by `slimsurfer.isPlaying()` and `slimsurfer.playPause()`
     *
     * @return {boolean}
     */
    isPaused() {
        return this.state !== this.states[PLAYING];
    }

    /**
     * Used by `slimsurfer.getDuration()`
     *
     * @return {number}
     */
    getDuration() {
        if (!this.buffer) {
            if (this.explicitDuration) {
                return this.explicitDuration;
            }
            return 0;
        }
        return this.buffer.duration;
    }

    /**
     * Used by `slimsurfer.seekTo()`
     *
     * @param {number} start Position to start at in seconds
     * @param {number} end Position to end at in seconds
     * @return {{start: number, end: number}}
     */
    seekTo(start, end) {
        if (!this.buffer) {
            return;
        }

        this.scheduledPause = null;

        if (start == null) {
            start = this.getCurrentTime();
            if (start >= this.getDuration()) {
                start = 0;
            }
        }
        if (end == null) {
            end = this.getDuration();
        }

        this.startPosition = start;
        this.lastPlay = this.ac.currentTime;

        if (this.state === this.states[FINISHED]) {
            this.setState(PAUSED);
        }

        return {
            start: start,
            end: end
        };
    }

    /**
     * Get the playback position in seconds
     *
     * @return {number}
     */
    getPlayedTime() {
        return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
    }

    /**
     * Plays the loaded audio region.
     *
     * @param {number} start Start offset in seconds, relative to the beginning
     * of a clip.
     * @param {number} end When to stop relative to the beginning of a clip.
     */
    play(start, end) {
        if (!this.buffer) {
            return;
        }

        // need to re-create source on each playback
        this.createSource();

        const adjustedTime = this.seekTo(start, end);

        start = adjustedTime.start;
        end = adjustedTime.end;

        this.scheduledPause = end;

        this.source.start(0, start, end - start);

        if (this.ac.state == 'suspended') {
            this.ac.resume && this.ac.resume();
        }

        this.setState(PLAYING);

        this.fireEvent('play');
    }

    /**
     * Pauses the loaded audio.
     */
    pause() {
        this.scheduledPause = null;

        this.startPosition += this.getPlayedTime();
        this.source && this.source.stop(0);

        this.setState(PAUSED);

        this.fireEvent('pause');
    }

    /**
     * Returns the current time in seconds relative to the audioclip's
     * duration.
     *
     * @return {number}
     */
    getCurrentTime() {
        return this.state.getCurrentTime.call(this);
    }

    /**
     * Returns the current playback rate. (0=no playback, 1=normal playback)
     *
     * @return {number}
     */
    getPlaybackRate() {
        return this.playbackRate;
    }

    /**
     * Set the audio source playback rate.
     *
     * @param {number} value
     */
    setPlaybackRate(value) {
        value = value || 1;
        if (this.isPaused()) {
            this.playbackRate = value;
        } else {
            this.pause();
            this.playbackRate = value;
            this.play();
        }
    }
}
