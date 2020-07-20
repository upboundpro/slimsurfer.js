/* eslint-env jasmine */

import TestHelpers from './test-helpers.js';
import SlimSurfer from '../src/slimsurfer.js';

/** @test {SlimSurfer} */
describe('SlimSurfer/playback:', function() {
    var slimsurfer;
    var element;
    var manualDestroy = false;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    beforeEach(function(done) {
        var wave = TestHelpers.createWaveform();
        slimsurfer = wave[0];
        element = wave[1];
        slimsurfer.load(TestHelpers.EXAMPLE_FILE_PATH);

        slimsurfer.on('ready', done);
    });

    afterEach(function() {
        if (!manualDestroy) {
            slimsurfer.destroy();
            TestHelpers.removeElement(element);
        }
    });

    /**
     * @test {SlimSurfer#isReady}
     */
    it('should be ready', function() {
        slimsurfer.play();
        expect(slimsurfer.isReady).toBeFalse();
    });

    /**
     * @test {SlimSurfer#VERSION}
     */
    it('should have version number', function() {
        let version = require('../package.json').version;
        expect(SlimSurfer.VERSION).toEqual(version);
    });

    /**
     * @test {SlimSurfer#play}
     * @test {SlimSurfer#isPlaying}
     */
    it('should play', function() {
        slimsurfer.play();

        expect(slimsurfer.isPlaying()).toBeTrue();
    });

    /**
     * @test {SlimSurfer#play}
     * @test {SlimSurfer#isPlaying}
     * @test {SlimSurfer#pause}
     */
    it('should pause', function() {
        slimsurfer.play();
        expect(slimsurfer.isPlaying()).toBeTrue();

        slimsurfer.pause();
        expect(slimsurfer.isPlaying()).toBeFalse();
    });

    /**
     * @test {SlimSurfer#playPause}
     * @test {SlimSurfer#isPlaying}
     */
    it('should play or pause', function() {
        slimsurfer.playPause();
        expect(slimsurfer.isPlaying()).toBeTrue();

        slimsurfer.playPause();
        expect(slimsurfer.isPlaying()).toBeFalse();
    });

    /** @test {SlimSurfer#getDuration}  */
    it('should get duration', function() {
        let duration = parseInt(slimsurfer.getDuration(), 10);
        expect(duration).toEqual(TestHelpers.EXAMPLE_FILE_DURATION);
    });

    /** @test {SlimSurfer#getCurrentTime}  */
    it('should get currentTime', function() {
        // initally zero
        let time = slimsurfer.getCurrentTime();
        expect(time).toEqual(0);

        // seek to 50%
        slimsurfer.seekTo(0.5);
        time = parseInt(slimsurfer.getCurrentTime(), 10);
        expect(time).toEqual(10);
    });

    /** @test {SlimSurfer#setCurrentTime}  */
    it('should set currentTime', function() {
        // initally zero
        let time = slimsurfer.getCurrentTime();
        expect(time).toEqual(0);

        // set to 10 seconds
        slimsurfer.setCurrentTime(10);
        time = slimsurfer.getCurrentTime();
        expect(time).toEqual(10);

        // set to something higher than duration
        slimsurfer.setCurrentTime(1000);
        time = slimsurfer.getCurrentTime();
        // sets it to end of track
        time = parseInt(slimsurfer.getCurrentTime(), 10);
        expect(time).toEqual(TestHelpers.EXAMPLE_FILE_DURATION);
    });

    /** @test {SlimSurfer#skipBackward}  */
    it('should skip backward', function() {
        // seek to 50%
        slimsurfer.seekTo(0.5);

        // skip 4 seconds backward
        slimsurfer.skipBackward(4);
        let time = slimsurfer.getCurrentTime();
        let expectedTime = 6.886938775510204;
        expect(time).toEqual(expectedTime);

        // skip backward with params.skipLength (default: 2 seconds)
        slimsurfer.skipBackward();
        time = slimsurfer.getCurrentTime();
        expect(time).toEqual(expectedTime - 2);
    });

    /** @test {SlimSurfer#skipForward}  */
    it('should skip forward', function() {
        // skip 4 seconds forward
        slimsurfer.skipForward(4);
        let time = slimsurfer.getCurrentTime();
        let expectedTime = 3.9999999999999996;
        expect(time).toEqual(expectedTime);

        // skip forward with params.skipLength (default: 2 seconds)
        slimsurfer.skipForward();
        time = slimsurfer.getCurrentTime();
        expect(time).toEqual(expectedTime + 2);
    });

    /** @test {SlimSurfer#getPlaybackRate}  */
    it('should get playback rate', function() {
        let rate = slimsurfer.getPlaybackRate();
        expect(rate).toEqual(1);
    });

    /** @test {SlimSurfer#setPlaybackRate}  */
    it('should set playback rate', function() {
        let rate = 0.5;
        slimsurfer.setPlaybackRate(rate);

        expect(slimsurfer.getPlaybackRate()).toEqual(rate);
    });

    /** @test {SlimSurfer#getVolume}  */
    it('should get volume', function() {
        let volume = slimsurfer.getVolume();
        expect(volume).toEqual(1);
    });

    /** @test {SlimSurfer#setVolume}  */
    it('should set volume', function(done) {
        let targetVolume = 0.5;

        slimsurfer.once('volume', function(result) {
            expect(result).toEqual(targetVolume);

            done();
        });

        slimsurfer.setVolume(targetVolume);
    });

    /** @test {SlimSurfer#toggleMute}  */
    it('should toggle mute', function() {
        slimsurfer.toggleMute();
        expect(slimsurfer.isMuted).toBeTrue();

        slimsurfer.toggleMute();
        expect(slimsurfer.isMuted).toBeFalse();
    });

    /** @test {SlimSurfer#setMute}  */
    it('should set mute', function() {
        slimsurfer.setMute(true);
        expect(slimsurfer.isMuted).toBeTrue();

        slimsurfer.setMute(false);
        expect(slimsurfer.isMuted).toBeFalse();
    });

    /** @test {SlimSurfer#getMute}  */
    it('should get mute', function() {
        slimsurfer.setMute(true);
        expect(slimsurfer.getMute()).toBeTrue();

        slimsurfer.setMute(false);
        expect(slimsurfer.getMute()).toBeFalse();
    });

    /** @test {SlimSurfer#zoom}  */
    it('should set zoom parameters', function() {
        slimsurfer.zoom(20);
        expect(slimsurfer.params.minPxPerSec).toEqual(20);
        expect(slimsurfer.params.scrollParent).toBe(true);
    });

    /** @test {SlimSurfer#zoom}  */
    it('should set unzoom parameters', function() {
        slimsurfer.zoom(false);
        expect(slimsurfer.params.minPxPerSec).toEqual(
            slimsurfer.defaultParams.minPxPerSec
        );
        expect(slimsurfer.params.scrollParent).toBe(false);
    });

    /** @test {SlimSurfer#getWaveColor} */
    it('should allow getting waveColor', function() {
        var waveColor = slimsurfer.getWaveColor();
        expect(waveColor).toEqual('#90F09B');
    });

    /** @test {SlimSurfer#setWaveColor} */
    it('should allow setting waveColor', function() {
        let color = 'blue';
        slimsurfer.setWaveColor(color);
        var waveColor = slimsurfer.getWaveColor();

        expect(waveColor).toEqual(color);
    });

    /** @test {SlimSurfer#getProgressColor} */
    it('should allow getting progressColor', function() {
        var progressColor = slimsurfer.getProgressColor();
        expect(progressColor).toEqual('purple');
    });

    /** @test {SlimSurfer#setProgressColor} */
    it('should allow setting progressColor', function() {
        slimsurfer.setProgressColor('green');
        var progressColor = slimsurfer.getProgressColor();

        expect(progressColor).toEqual('green');
    });

    /** @test {SlimSurfer#getCursorColor} */
    it('should allow getting cursorColor', function() {
        var cursorColor = slimsurfer.getCursorColor();
        expect(cursorColor).toEqual('white');
    });

    /** @test {SlimSurfer#setCursorColor} */
    it('should allow setting cursorColor', function() {
        slimsurfer.setCursorColor('black');
        var cursorColor = slimsurfer.getCursorColor();

        expect(cursorColor).toEqual('black');
    });

    /** @test {SlimSurfer#getHeight} */
    it('should allow getting height', function() {
        var height = slimsurfer.getHeight();
        expect(height).toEqual(128);
    });

    /** @test {SlimSurfer#setHeight} */
    it('should allow setting height', function() {
        slimsurfer.setHeight(150);
        var height = slimsurfer.getHeight();

        expect(height).toEqual(150);
    });

    /** @test {SlimSurfer#exportPCM} */
    it('should return PCM data formatted using JSON.stringify', function() {
        var pcmData = slimsurfer.exportPCM();
        expect(pcmData).toBeNonEmptyString();
    });

    /** @test {SlimSurfer#getFilters} */
    it('should return the list of current set filters as an array', function() {
        var list = slimsurfer.getFilters();

        expect(list).toEqual([]);
    });

    /** @test {SlimSurfer#exportImage} */
    it('should export image data', function() {
        var imgData = slimsurfer.exportImage();
        expect(imgData).toBeNonEmptyString();
    });

    /** @test {SlimSurfer#destroy} */
    it('should destroy', function(done) {
        manualDestroy = true;

        slimsurfer.once('destroy', function() {
            TestHelpers.removeElement(element);
            done();
        });
        slimsurfer.destroy();
    });
});

/** @test {SlimSurfer} */
describe('SlimSurfer/errors:', function() {
    var element;

    beforeEach(function() {
        element = TestHelpers.createElement('test');
    });

    afterEach(function() {
        TestHelpers.removeElement(element);
    });

    /**
     * @test {SlimSurfer}
     */
    it('should throw when container element not found', function() {
        expect(function() {
            TestHelpers.createWaveform({
                container: '#foo'
            });
        }).toThrow(new Error('Container element not found'));
    });

    /**
     * @test {SlimSurfer}
     */
    it('should throw when media container element not found', function() {
        expect(function() {
            TestHelpers.createWaveform({
                container: '#test',
                mediaContainer: '#foo'
            });
        }).toThrow(new Error('Media Container element not found'));
    });

    /**
     * @test {SlimSurfer}
     */
    it('should throw for invalid maxCanvasWidth param', function() {
        expect(function() {
            TestHelpers.createWaveform({
                container: '#test',
                maxCanvasWidth: 0.5
            });
        }).toThrow(new Error('maxCanvasWidth must be greater than 1'));

        expect(function() {
            TestHelpers.createWaveform({
                container: '#test',
                maxCanvasWidth: 3
            });
        }).toThrow(new Error('maxCanvasWidth must be an even number'));
    });

    /**
     * @test {SlimSurfer}
     */
    it('should throw for invalid renderer', function() {
        expect(function() {
            TestHelpers.createWaveform({
                container: '#test',
                renderer: 'foo'
            });
        }).toThrow(new Error('Renderer parameter is invalid'));
    });
});
