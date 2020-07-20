'use strict';

// Create an instance
var slimsurfer = {};

// Init & load
document.addEventListener('DOMContentLoaded', function() {
    // Init slimsurfer
    slimsurfer = SlimSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        loaderColor: 'purple',
        cursorColor: 'navy'
    });
    slimsurfer.load('../../example/media/demo.wav');

    // Time stretcher
    slimsurfer.on('ready', function() {
        var st = new window.soundtouch.SoundTouch(
            slimsurfer.backend.ac.sampleRate
        );
        var buffer = slimsurfer.backend.buffer;
        var channels = buffer.numberOfChannels;
        var l = buffer.getChannelData(0);
        var r = channels > 1 ? buffer.getChannelData(1) : l;
        var length = buffer.length;
        var seekingPos = null;
        var seekingDiff = 0;

        var source = {
            extract: function(target, numFrames, position) {
                if (seekingPos != null) {
                    seekingDiff = seekingPos - position;
                    seekingPos = null;
                }

                position += seekingDiff;

                for (var i = 0; i < numFrames; i++) {
                    target[i * 2] = l[i + position];
                    target[i * 2 + 1] = r[i + position];
                }

                return Math.min(numFrames, length - position);
            }
        };

        var soundtouchNode;

        slimsurfer.on('play', function() {
            seekingPos = ~~(slimsurfer.backend.getPlayedPercents() * length);
            st.tempo = slimsurfer.getPlaybackRate();

            if (st.tempo === 1) {
                slimsurfer.backend.disconnectFilters();
            } else {
                if (!soundtouchNode) {
                    var filter = new window.soundtouch.SimpleFilter(source, st);
                    soundtouchNode = window.soundtouch.getWebAudioNode(
                        slimsurfer.backend.ac,
                        filter
                    );
                }
                slimsurfer.backend.setFilter(soundtouchNode);
            }
        });

        slimsurfer.on('pause', function() {
            soundtouchNode && soundtouchNode.disconnect();
        });

        slimsurfer.on('seek', function() {
            seekingPos = ~~(slimsurfer.backend.getPlayedPercents() * length);
        });
    });
});
