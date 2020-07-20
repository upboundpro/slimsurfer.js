import * as util from './util';

/**
 * MediaElement backend
 */
export default class MediaElement extends util.Observer {
    /**
     * Construct the backend (extends WebAudio)
     *
     * @param {WavesurferParams} params
     */
    constructor(params) {
        super(params);
        /** @private */
        this.params = params;

        // Dummy media to catch errors
        /** @private */
        this.media = {
            currentTime: 0,
            duration: 0
        };

        /** @private */
        this.mediaType = params.mediaType.toLowerCase();
        /** @private */
        this.elementPosition = params.elementPosition;
        /** @private */
        this.peaks = null;
        /** @private */
        this.onPlayEnd = null;
    }

    /**
     * Initialise the backend, called in `slimsurfer.createBackend()`
     */
    init() {
        this.createTimer();
    }

    /**
     * Create a timer to provide a more precise `audioprocess` event.
     *
     * @private
     */
    createTimer() {
        const onAudioProcess = () => {
            if (this.isPaused()) {
                return;
            }
            this.fireEvent('audioprocess', this.getCurrentTime());

            // Call again in the next frame
            const requestAnimationFrame =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame;
            requestAnimationFrame(onAudioProcess);
        };

        this.on('play', onAudioProcess);

        // Update the progress one more time to prevent it from being stuck in case of lower framerates
        this.on('pause', () => {
            this.fireEvent('audioprocess', this.getCurrentTime());
        });
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
     * Create media element with url as its source,
     * and append to container element.
     *
     * @param {string} url Path to media file
     * @param {HTMLElement} container HTML element
     * @param {number[]|number[][]} peaks Array of peak data
     * @param {string} preload HTML 5 preload attribute value
     */
    load(container, peaks, duration) {
        const media = document.createElement(this.mediaType);
        media.controls = this.params.mediaControls;
        //media.autoplay = this.params.autoplay || false;
        //media.preload = preload == null ? 'auto' : preload;
        //media.src = url;
        // Addes custom styling
        media.style.width = '100%';
        media.style.height = '100%';

        const prevMedia = container.querySelector(this.mediaType);
        if (prevMedia) {
            container.removeChild(prevMedia);
        }
        container.appendChild(media);

        this._load(media, peaks);
    }

    /**
     * Private method called by both load (from url)
     * and loadElt (existing media element).
     *
     * @param {HTMLMediaElement} media HTML5 Audio or Video element
     * @param {number[]|number[][]} peaks Array of peak data
     * @private
     */
    _load(media, peaks) {
        // load must be called manually on iOS, otherwise peaks won't draw
        // until a user interaction triggers load --> 'ready' event
        if (typeof media.load == 'function') {
            // Resets the media element and restarts the media resource. Any
            // pending events are discarded. How much media data is fetched is
            // still affected by the preload attribute.
            media.load();
        }

        media.addEventListener('error', () => {
            this.fireEvent('error', 'Error loading media element');
        });

        media.addEventListener('canplay', () => {
            this.fireEvent('canplay');
        });

        media.addEventListener('ended', () => {
            this.fireEvent('finish');
        });

        // Listen to and relay play and pause events to enable
        // playback control from the external media element
        media.addEventListener('play', () => {
            this.fireEvent('play');
        });

        media.addEventListener('pause', () => {
            this.fireEvent('pause');
        });

        this.media = media;
        this.peaks = peaks;
        this.onPlayEnd = null;
    }

    /**
     * Used by `slimsurfer.getDuration()`
     *
     * @return {number}
     */
    getDuration() {
        if (this.explicitDuration) {
            return this.explicitDuration;
        }
        let duration = (this.buffer || this.media).duration;
        if (duration >= Infinity) {
            // streaming audio
            duration = this.media.seekable.end(0);
        }
        return duration;
    }

    /**
     * Returns the current time in seconds relative to the audioclip's
     * duration.
     *
     * @return {number}
     */
    getCurrentTime() {
        return this.media && this.media.currentTime;
    }

    /**
     * Get the position from 0 to 1
     *
     * @return {number}
     */
    getPlayedPercents() {
        return this.getCurrentTime() / this.getDuration() || 0;
    }

    /**
     * Used by `slimsurfer.seekTo()`
     *
     * @param {number} start Position to start at in seconds
     */
    seekTo(start) {
        if (start != null) {
            this.media.currentTime = start;
        }
        this.clearPlayEnd();
    }

    /** @private */
    setPlayEnd(end) {
        this._onPlayEnd = time => {
            if (time >= end) {
                this.pause();
                this.seekTo(end);
            }
        };
        this.on('audioprocess', this._onPlayEnd);
    }

    /** @private */
    clearPlayEnd() {
        if (this._onPlayEnd) {
            this.un('audioprocess', this._onPlayEnd);
            this._onPlayEnd = null;
        }
    }

    /**
     * Compute the max and min value of the waveform when broken into
     * <length> subranges.
     *
     * @param {number} length How many subranges to break the waveform into.
     * @param {number} first First sample in the required range.
     * @param {number} last Last sample in the required range.
     * @return {number[]|number[][]} Array of 2*<length> peaks or array of
     * arrays of peaks consisting of (max, min) values for each subrange.
     */
    getPeaks(length, first, last) {
        if (this.buffer) {
            return super.getPeaks(length, first, last);
        }
        return this.peaks || [];
    }

    /**
     * This is called when slimsurfer is destroyed
     *
     */
    destroy() {
        this.unAll();

        if (
            this.params.removeMediaElementOnDestroy &&
            this.media &&
            this.media.parentNode
        ) {
            this.media.parentNode.removeChild(this.media);
        }

        this.media = null;
    }
}
