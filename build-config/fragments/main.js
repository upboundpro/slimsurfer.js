/* eslint-env node */

const path = require('path');
const banner = require('./banner');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
    entry: {
        slimsurfer: path.join(rootDir, 'src', 'slimsurfer.js')
    },
    output: {
        path: path.join(rootDir, 'dist'),
        filename: '[name].js',
        library: 'SlimSurfer'
    },
    plugins: [banner.libBanner]
};
