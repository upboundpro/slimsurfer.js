'use strict';

// Create an instance
var slimsurfer;

// Init & load
document.addEventListener('DOMContentLoaded', function() {
    var playButton = document.querySelector('#playBtn'),
        toggleMuteButton = document.querySelector('#toggleMuteBtn'),
        setMuteOnButton = document.querySelector('#setMuteOnBtn'),
        setMuteOffButton = document.querySelector('#setMuteOffBtn');

    // Init slimsurfer
    slimsurfer = SlimSurfer.create({
        container: '#waveform',
        waveColor: 'black',
        interact: false,
        cursorWidth: 0
    });

    slimsurfer.load('../media/demo.wav');

    slimsurfer.on('ready', function() {
        playButton.onclick = function() {
            slimsurfer.playPause();
        };

        toggleMuteButton.onclick = function() {
            slimsurfer.toggleMute();
        };

        setMuteOnButton.onclick = function() {
            slimsurfer.setMute(true);
        };

        setMuteOffButton.onclick = function() {
            slimsurfer.setMute(false);
        };
    });
});
