// Create a SlimSurfer instance
var slimsurfer;

// Init on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    slimsurfer = SlimSurfer.create({
        container: '#waveform',
        waveColor: '#428bca',
        progressColor: '#31708f',
        height: 120,
        barWidth: 3
    });
});

// Bind controls
document.addEventListener('DOMContentLoaded', function() {
    var playPause = document.querySelector('#playPause');
    playPause.addEventListener('click', function() {
        slimsurfer.playPause();
    });

    // Toggle play/pause text
    slimsurfer.on('play', function() {
        document.querySelector('#play').style.display = 'none';
        document.querySelector('#pause').style.display = '';
    });
    slimsurfer.on('pause', function() {
        document.querySelector('#play').style.display = '';
        document.querySelector('#pause').style.display = 'none';
    });

    // The playlist links
    var links = document.querySelectorAll('#playlist a');
    var currentTrack = 0;

    // Load a track by index and highlight the corresponding link
    var setCurrentSong = function(index) {
        links[currentTrack].classList.remove('active');
        currentTrack = index;
        links[currentTrack].classList.add('active');
        slimsurfer.load(links[currentTrack].href);
    };

    // Load the track on click
    Array.prototype.forEach.call(links, function(link, index) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            setCurrentSong(index);
        });
    });

    // Play on audio load
    slimsurfer.on('ready', function() {
        slimsurfer.play();
    });

    // Go to the next track on finish
    slimsurfer.on('finish', function() {
        setCurrentSong((currentTrack + 1) % links.length);
    });

    // Load the first track
    setCurrentSong(currentTrack);
});
