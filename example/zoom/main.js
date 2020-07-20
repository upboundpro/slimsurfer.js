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
                        start: 0,
                        end: 5,
                        color: 'hsla(400, 100%, 30%, 0.1)'
                    },
                    {
                        start: 10,
                        end: 100,
                        color: 'hsla(200, 50%, 70%, 0.1)'
                    }
                ]
            }),
            SlimSurfer.timeline.create({
                container: '#timeline'
            })
        ]
    });

    // Load audio from URL
    slimsurfer.load('../media/demo.wav');

    // Zoom slider
    var slider = document.querySelector('[data-action="zoom"]');

    slider.value = slimsurfer.params.minPxPerSec;
    slider.min = slimsurfer.params.minPxPerSec;

    slider.addEventListener('input', function() {
        slimsurfer.zoom(Number(this.value));
    });

    // Play button
    var button = document.querySelector('[data-action="play"]');

    button.addEventListener('click', slimsurfer.playPause.bind(slimsurfer));
});
