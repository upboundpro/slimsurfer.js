// Create an instance
var slimsurfer;

window.onload = function() {
    slimsurfer = SlimSurfer.create({
        container: document.querySelector('#waveform'),
        splitChannels: true
    });

    // Load audio from URL
    slimsurfer.load('stereo.mp3');

    // Play/pause on button press
    document
        .querySelector('[data-action="play"]')
        .addEventListener('click', slimsurfer.playPause.bind(slimsurfer));

    // Drag'n'drop
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
};
