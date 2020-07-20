'use strict';

// Create an instance
var slimsurfer;

// Init & load
document.addEventListener('DOMContentLoaded', function() {
    var options = {
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        loaderColor: 'purple',
        cursorColor: 'navy',
        selectionColor: '#d0e9c6',
        loopSelection: false,
        plugins: [
            SlimSurfer.elan.create({
                url: 'transcripts/001z.xml',
                container: '#annotations',
                tiers: {
                    Text: true,
                    Comments: true
                }
            }),
            SlimSurfer.regions.create()
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

    slimsurfer.elan.on('ready', function(data) {
        slimsurfer.load('transcripts/' + data.media.url);
    });

    slimsurfer.elan.on('select', function(start, end) {
        slimsurfer.backend.play(start, end);
    });

    slimsurfer.elan.on('ready', function() {
        var classList = slimsurfer.elan.container.querySelector('table')
            .classList;
        ['table', 'table-striped', 'table-hover'].forEach(function(cl) {
            classList.add(cl);
        });
    });

    var prevAnnotation, prevRow, region;
    var onProgress = function(time) {
        var annotation = slimsurfer.elan.getRenderedAnnotation(time);

        if (prevAnnotation != annotation) {
            prevAnnotation = annotation;

            region && region.remove();
            region = null;

            if (annotation) {
                // Highlight annotation table row
                var row = slimsurfer.elan.getAnnotationNode(annotation);
                prevRow && prevRow.classList.remove('success');
                prevRow = row;
                row.classList.add('success');
                var before = row.previousSibling;
                if (before) {
                    slimsurfer.elan.container.scrollTop = before.offsetTop;
                }

                // Region
                region = slimsurfer.addRegion({
                    start: annotation.start,
                    end: annotation.end,
                    resize: false,
                    color: 'rgba(223, 240, 216, 0.7)'
                });
            }
        }
    };

    slimsurfer.on('audioprocess', onProgress);
});
