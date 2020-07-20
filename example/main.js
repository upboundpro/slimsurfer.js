'use strict';

// Create an instance
var slimsurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    var options = {
        container: document.querySelector('#waveform'),
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    // Init
    slimsurfer = SlimSurfer.create(options);
    // Load audio from URL
    slimsurfer.load('example/media/demo.wav');

    // Regions
    if (slimsurfer.enableDragSelection) {
        slimsurfer.enableDragSelection({
            color: 'rgba(0, 255, 0, 0.1)'
        });
    }
});

// Play at once when ready
// Won't work on iOS until you touch the page
slimsurfer.on('ready', function() {
    //slimsurfer.play();
});

// Report errors
slimsurfer.on('error', function(err) {
    console.error(err);
});

// Do something when the clip is over
slimsurfer.on('finish', function() {
    console.log('Finished playing');
});

/* Progress bar */
document.addEventListener('DOMContentLoaded', function() {
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
});

// Drag'n'drop
document.addEventListener('DOMContentLoaded', function() {
    var toggleActive = function(e, toggle) {
        e.stopPropagation();
        e.preventDefault();
        toggle
            ? e.target.classList.add('slimsurfer-dragover')
            : e.target.classList.remove('slimsurfer-dragover');
    };

    var handlers = {
        // Drop event
        drop: function(e) {
            toggleActive(e, false);

            // Load the file into slimsurfer
            if (e.dataTransfer.files.length) {
                slimsurfer.loadBlob(e.dataTransfer.files[0]);
            } else {
                slimsurfer.fireEvent('error', 'Not a file');
            }
        },

        // Drag-over event
        dragover: function(e) {
            toggleActive(e, true);
        },

        // Drag-leave event
        dragleave: function(e) {
            toggleActive(e, false);
        }
    };

    var dropTarget = document.querySelector('#drop');
    Object.keys(handlers).forEach(function(event) {
        dropTarget.addEventListener(event, handlers[event]);
    });
});
