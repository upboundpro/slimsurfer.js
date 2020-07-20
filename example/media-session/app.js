'use strict';

// Create an instance
var slimsurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init
    slimsurfer = SlimSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: 'black',
        backend: 'MediaElement',
        plugins: [
            SlimSurfer.mediasession.create({
                metadata: {
                    title: 'Wavesurfer.js Example',
                    artist: 'The Wavesurfer.js Project',
                    album: 'Media Session Plugin',
                    artwork: [
                        {
                            src: 'https://dummyimage.com/96x96',
                            sizes: '96x96',
                            type: 'image/png'
                        },
                        {
                            src: 'https://dummyimage.com/128x128',
                            sizes: '128x128',
                            type: 'image/png'
                        },
                        {
                            src: 'https://dummyimage.com/192x192',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'https://dummyimage.com/256x256',
                            sizes: '256x256',
                            type: 'image/png'
                        },
                        {
                            src: 'https://dummyimage.com/384x384',
                            sizes: '384x384',
                            type: 'image/png'
                        },
                        {
                            src: 'https://dummyimage.com/512x512',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                }
            })
        ]
    });

    // controls
    document
        .querySelector('[data-action="play"]')
        .addEventListener('click', slimsurfer.playPause.bind(slimsurfer));

    // load audio from existing media element
    var mediaElt = document.querySelector('audio');
    slimsurfer.load(mediaElt);
});
