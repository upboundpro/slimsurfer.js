# slimsurfer.js

[![Build Status](https://travis-ci.com/upboundpro/slimsurfer.js.svg?branch=master)](https://travis-ci.com/upboundpro/slimsurfer.js)

Slim, interactive navigable audio visualization using Web Audio and Canvas based on
[wavesurfer.js](https://wavesurfer-js.org). This version does **not** handle audio streaming and playback and is designed to fast rendering of waveforms using **pre-generated peak data**!

See a [tutorial](https://wavesurfer-js.org/docs) and [examples](https://wavesurfer-js.org/examples) on [slimsurfer-js.org](https://wavesurfer-js.org).

### Installation for development
Install development dependencies:

```bash
npm install
```
Development tasks automatically rebuild certain parts of the library when files are changed (`start` – slimsurfer, `start:plugins` – plugins). Start a dev task and go to `localhost:8080/example/` to test the current build.

Start development server for core library:

```bash
npm run start
```

Start development server for plugins:

```bash
npm run start:plugins
```

Build all the files. (generated files are placed in the `dist` directory.)

```bash
npm run build
```

Running tests only:

```bash
npm run test
```

Build documentation with esdoc (generated files are placed in the `doc` directory.)
```bash
npm run doc
```

## Credits

Many thanks to the original authors
[katspaugh](https://github.com/katspaugh) and 
[contributors](https://github.com/katspaugh/wavesurfer.js/contributors)!

## License

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

This work is licensed under a
[BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause) as the original project.
