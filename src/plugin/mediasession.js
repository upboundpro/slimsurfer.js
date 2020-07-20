/*global MediaMetadata*/

/**
 * @typedef {Object} MediaSessionPluginParams
 * @property {MediaMetadata} metadata A MediaMetadata object: a representation
 * of the metadata associated with a MediaSession that can be used by user agents
 * to provide a customized user interface.
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('mediasession')`
 */

/**
 * Visualise MediaSession information for a slimsurfer instance.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import MediaSessionPlugin from 'slimsurfer.mediasession.js';
 *
 * // commonjs
 * var MediaSessionPlugin = require('slimsurfer.mediasession.js');
 *
 * // if you are using <script> tags
 * var MediaSessionPlugin = window.SlimSurfer.mediasession;
 *
 * // ... initialising slimsurfer with the plugin
 * var slimsurfer = SlimSurfer.create({
 *   // slimsurfer options ...
 *   plugins: [
 *     MediaSessionPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
export default class MediaSessionPlugin {
    /**
     * MediaSession plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by slimsurfer to correctly instantiate the plugin.
     *
     * @param  {MediaSessionPluginParams} params parameters use to initialise the plugin
     * @return {PluginDefinition} an object representing the plugin
     */
    static create(params) {
        return {
            name: 'mediasession',
            deferInit: params && params.deferInit ? params.deferInit : false,
            params: params,
            instance: MediaSessionPlugin
        };
    }

    constructor(params, ws) {
        this.params = params;
        this.slimsurfer = ws;

        if ('mediaSession' in navigator) {
            // update metadata
            this.metadata = this.params.metadata;
            this.update();

            // update metadata when playback starts
            this.slimsurfer.on('play', () => {
                this.update();
            });

            // set playback action handlers
            navigator.mediaSession.setActionHandler('play', () => {
                this.slimsurfer.play();
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                this.slimsurfer.playPause();
            });
            navigator.mediaSession.setActionHandler('seekbackward', () => {
                this.slimsurfer.skipBackward();
            });
            navigator.mediaSession.setActionHandler('seekforward', () => {
                this.slimsurfer.skipForward();
            });
        }
    }

    init() {}

    destroy() {}

    update() {
        if (typeof MediaMetadata === typeof Function) {
            // set metadata
            navigator.mediaSession.metadata = new MediaMetadata(this.metadata);
        }
    }
}
