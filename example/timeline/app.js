'use strict';

var slimsurfer;

// Init & load
document.addEventListener('DOMContentLoaded', function() {
    var options = {
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        loaderColor: 'purple',
        cursorColor: 'navy',
        plugins: [
            SlimSurfer.timeline.create({
                container: '#wave-timeline'
            })
        ]
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    if (location.search.match('normalize')) {
        options.normalize = true;
    }

    // Init slimsurfer
    slimsurfer = SlimSurfer.create(options);

    /* Progress bar */
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

    slimsurfer.load('../media/demo.wav');
});
