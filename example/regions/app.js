'use strict';

// Create an instance
var slimsurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init
    slimsurfer = SlimSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        backend: 'MediaElement',
        plugins: [
            SlimSurfer.regions.create({
                regions: [
                    {
                        start: 1,
                        end: 3,
                        color: 'hsla(400, 100%, 30%, 0.5)'
                    },
                    {
                        start: 5,
                        end: 7,
                        color: 'hsla(200, 50%, 70%, 0.4)'
                    }
                ],
                dragSelection: {
                    slop: 5
                }
            })
        ]
    });

    // Load audio from URL
    slimsurfer.load('../media/demo.wav');

    // this is already being done in /examples/trivia.js
    // document.querySelector(
    //     '[data-action="play"]'
    // ).addEventListener('click', slimsurfer.playPause.bind(slimsurfer));
});
