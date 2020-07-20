'use strict';

// Create an instance
var slimsurfer;

// Init & load
document.addEventListener('DOMContentLoaded', function() {
    var micBtn = document.querySelector('#micBtn');

    // Init slimsurfer
    slimsurfer = SlimSurfer.create({
        container: '#waveform',
        waveColor: 'black',
        interact: false,
        cursorWidth: 0,
        plugins: [SlimSurfer.microphone.create()]
    });

    slimsurfer.microphone.on('deviceReady', function() {
        console.info('Device ready!');
    });
    slimsurfer.microphone.on('deviceError', function(code) {
        console.warn('Device error: ' + code);
    });

    // start/stop mic on button click
    micBtn.onclick = function() {
        if (slimsurfer.microphone.active) {
            slimsurfer.microphone.stop();
        } else {
            slimsurfer.microphone.start();
        }
    };
});
