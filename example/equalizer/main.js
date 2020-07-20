'use strict';

// Create an instance
var slimsurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init
    slimsurfer = SlimSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686'
    });

    // Load audio from URL
    slimsurfer.load('../media/demo.wav');

    // Equalizer
    slimsurfer.on('ready', function() {
        var EQ = [
            {
                f: 32,
                type: 'lowshelf'
            },
            {
                f: 64,
                type: 'peaking'
            },
            {
                f: 125,
                type: 'peaking'
            },
            {
                f: 250,
                type: 'peaking'
            },
            {
                f: 500,
                type: 'peaking'
            },
            {
                f: 1000,
                type: 'peaking'
            },
            {
                f: 2000,
                type: 'peaking'
            },
            {
                f: 4000,
                type: 'peaking'
            },
            {
                f: 8000,
                type: 'peaking'
            },
            {
                f: 16000,
                type: 'highshelf'
            }
        ];

        // Create filters
        var filters = EQ.map(function(band) {
            var filter = slimsurfer.backend.ac.createBiquadFilter();
            filter.type = band.type;
            filter.gain.value = 0;
            filter.Q.value = 1;
            filter.frequency.value = band.f;
            return filter;
        });

        // Connect filters to slimsurfer
        slimsurfer.backend.setFilters(filters);

        // Bind filters to vertical range sliders
        var container = document.querySelector('#equalizer');
        filters.forEach(function(filter) {
            var input = document.createElement('input');
            slimsurfer.util.extend(input, {
                type: 'range',
                min: -40,
                max: 40,
                value: 0,
                title: filter.frequency.value
            });
            input.style.display = 'inline-block';
            input.setAttribute('orient', 'vertical');
            slimsurfer.util.style(input, {
                webkitAppearance: 'slider-vertical',
                width: '50px',
                height: '150px'
            });
            container.appendChild(input);

            var onChange = function(e) {
                filter.gain.value = ~~e.target.value;
            };

            input.addEventListener('input', onChange);
            input.addEventListener('change', onChange);
        });

        // For debugging
        slimsurfer.filters = filters;
    });

    // Log errors
    slimsurfer.on('error', function(msg) {
        // console.log(msg);
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
