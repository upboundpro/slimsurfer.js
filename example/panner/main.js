'use strict';

// Create an instance
var slimsurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init
    slimsurfer = SlimSurfer.create({
        container: document.querySelector('#waveform'),
        minPxPerSec: 30,
        scrollParent: true,
        waveColor: '#A8DBA8',
        progressColor: '#3B8686'
    });

    // Load audio from URL
    slimsurfer.load('media.wav');

    // Panner
    (function() {
        // Add panner
        slimsurfer.panner = slimsurfer.backend.ac.createPanner();
        slimsurfer.backend.setFilter(slimsurfer.panner);

        // Bind panner slider
        // @see http://stackoverflow.com/a/14412601/352796
        var onChange = function() {
            var xDeg = parseInt(slider.value);
            var x = Math.sin(xDeg * (Math.PI / 180));
            slimsurfer.panner.setPosition(x, 0, 0);
        };
        var slider = document.querySelector('[data-action="pan"]');
        slider.addEventListener('input', onChange);
        slider.addEventListener('change', onChange);
        onChange();
    })();

    // Log errors
    slimsurfer.on('error', function(msg) {
        console.log(msg);
    });

    // Bind play/pause button
    document
        .querySelector('[data-action="play"]')
        .addEventListener('click', slimsurfer.playPause.bind(slimsurfer));

    // Progress bar
    (function() {
        var progressDiv = document.querySelector('#progress-bar');
        var progressBar = progressDiv.querySelector('.progress-bar');

        var showProgress = function(percent) {
            progressDiv.style.display = 'block';
            progressBar.style.width = percent + '%';
        };

        var hideProgress = function() {
            progressDiv.style.display = 'none';
        };

        slimsurfer.on('loading', showProgress);
        slimsurfer.on('ready', hideProgress);
        slimsurfer.on('destroy', hideProgress);
        slimsurfer.on('error', hideProgress);
    })();
});
