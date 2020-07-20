'use strict';

// Create an instance
var slimsurfer = {};

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    slimsurfer = SlimSurfer.create({
        container: document.querySelector('#waveform'),
        plugins: [SlimSurfer.cursor.create()]
    });

    // Load audio from URL
    slimsurfer.load('../media/demo.wav');

    // Play button
    var button = document.querySelector('[data-action="play"]');

    button.addEventListener('click', slimsurfer.playPause.bind(slimsurfer));
});
