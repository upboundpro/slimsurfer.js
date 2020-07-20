import * as util from './util';
import MultiCanvas from './drawer.multicanvas';
import MediaElement from './mediaelement';

/*
 * This work is licensed under a BSD-3-Clause License.
 */

/** @external {HTMLElement} https://developer.mozilla.org/en/docs/Web/API/HTMLElement */
/** @external {OfflineAudioContext} https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext */
/** @external {File} https://developer.mozilla.org/en-US/docs/Web/API/File */
/** @external {Blob} https://developer.mozilla.org/en-US/docs/Web/API/Blob */
/** @external {CanvasRenderingContext2D} https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D */
/** @external {MediaStreamConstraints} https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints */
/** @external {AudioNode} https://developer.mozilla.org/de/docs/Web/API/AudioNode */

/**
 * @typedef {Object} WavesurferParams
 * @property {AudioContext} audioContext=null Use your own previously
 * initialized AudioContext or leave blank.
 * @property {number} audioRate=1 Speed at which to play audio. Lower number is
 * slower.
 * @property {ScriptProcessorNode} audioScriptProcessor=null Use your own previously
 * initialized ScriptProcessorNode or leave blank.
 * @property {boolean} autoCenter=true If a scrollbar is present, center the
 * waveform around the progress
 * @property {string} backend='WebAudio' `'WebAudio'|'MediaElement'` In most cases
 * you don't have to set this manually. MediaElement is a fallback for
 * unsupported browsers.
 * @property {number} barHeight=1 The height of the wave
 * @property {number} barGap=null The optional spacing between bars of the wave,
 * if not provided will be calculated in legacy format.
 * @property {boolean} closeAudioContext=false Close and nullify all audio
 * contexts when the destroy method is called.
 * @property {!string|HTMLElement} container CSS selector or HTML element where
 * the waveform should be drawn. This is the only required parameter.
 * @property {string} cursorColor='#333' The fill color of the cursor indicating
 * the playhead position.
 * @property {number} cursorWidth=1 Measured in pixels.
 * @property {boolean} fillParent=true Whether to fill the entire container or
 * draw only according to `minPxPerSec`.
 * @property {boolean} forceDecode=false Force decoding of audio using web audio
 * when zooming to get a more detailed waveform.
 * @property {number} height=128 The height of the waveform. Measured in
 * pixels.
 * @property {boolean} hideScrollbar=false Whether to hide the horizontal
 * scrollbar when one would normally be shown.
 * @property {boolean} interact=true Whether the mouse interaction will be
 * enabled at initialization. You can switch this parameter at any time later
 * on.
 * @property {boolean} loopSelection=true (Use with regions plugin) Enable
 * looping of selected regions
 * @property {number} maxCanvasWidth=4000 Maximum width of a single canvas in
 * pixels, excluding a small overlap (2 * `pixelRatio`, rounded up to the next
 * even integer). If the waveform is longer than this value, additional canvases
 * will be used to render the waveform, which is useful for very large waveforms
 * that may be too wide for browsers to draw on a single canvas.
 * @property {boolean} mediaControls=false (Use with backend `MediaElement`)
 * this enables the native controls for the media element
 * @property {string} mediaType='audio' (Use with backend `MediaElement`)
 * `'audio'|'video'`
 * @property {number} minPxPerSec=20 Minimum number of pixels per second of
 * audio.
 * @property {boolean} normalize=false If true, normalize by the maximum peak
 * instead of 1.0.
 * @property {boolean} partialRender=false Use the PeakCache to improve
 * rendering speed of large waveforms
 * @property {number} pixelRatio=window.devicePixelRatio The pixel ratio used to
 * calculate display
 * @property {PluginDefinition[]} plugins=[] An array of plugin definitions to
 * register during instantiation, they will be directly initialised unless they
 * are added with the `deferInit` property set to true.
 * @property {string} progressColor='#555' The fill color of the part of the
 * waveform behind the cursor.
 * @property {boolean} removeMediaElementOnDestroy=true Set to false to keep the
 * media element in the DOM when the player is destroyed. This is useful when
 * reusing an existing media element via the `loadMediaElement` method.
 * @property {Object} renderer=MultiCanvas Can be used to inject a custom
 * renderer.
 * @property {boolean|number} responsive=false If set to `true` resize the
 * waveform, when the window is resized. This is debounced with a `100ms`
 * timeout by default. If this parameter is a number it represents that timeout.
 * @property {boolean} scrollParent=false Whether to scroll the container with a
 * lengthy waveform. Otherwise the waveform is shrunk to the container width
 * (see fillParent).
 * @property {number} skipLength=2 Number of seconds to skip with the
 * skipForward() and skipBackward() methods.
 * @property {boolean} splitChannels=false Render with seperate waveforms for
 * the channels of the audio
 * @property {string} waveColor='#999' The fill color of the waveform after the
 * cursor.
 * @property {object} xhr={} XHR options.
 */

/**
 * @typedef {Object} PluginDefinition
 * @desc The Object used to describe a plugin
 * @example slimsurfer.addPlugin(pluginDefinition);
 * @property {string} name The name of the plugin, the plugin instance will be
 * added as a property to the slimsurfer instance under this name
 * @property {?Object} staticProps The properties that should be added to the
 * slimsurfer instance as static properties
 * @property {?boolean} deferInit Don't initialise plugin
 * automatically
 * @property {Object} params={} The plugin parameters, they are the first parameter
 * passed to the plugin class constructor function
 * @property {PluginClass} instance The plugin instance factory, is called with
 * the dependency specified in extends. Returns the plugin class.
 */

/**
 * @interface PluginClass
 *
 * @desc This is the interface which is implemented by all plugin classes. Note
 * that this only turns into an observer after being passed through
 * `slimsurfer.addPlugin`.
 *
 * @extends {Observer}
 */
class PluginClass {
    /**
     * Plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by slimsurfer to correctly instantiate the plugin.
     *
     * @param  {Object} params={} The plugin params (specific to the plugin)
     * @return {PluginDefinition} an object representing the plugin
     */
    create(params) {}
    /**
     * Construct the plugin
     *
     * @param {Object} ws The slimsurfer instance
     * @param {Object} params={} The plugin params (specific to the plugin)
     */
    constructor(ws, params) {}
    /**
     * Initialise the plugin
     *
     * Start doing something. This is called by
     * `slimsurfer.initPlugin(pluginName)`
     */
    init() {}
    /**
     * Destroy the plugin instance
     *
     * Stop doing something. This is called by
     * `slimsurfer.destroyPlugin(pluginName)`
     */
    destroy() {}
}

/**
 * SlimSurfer core library class
 *
 * @extends {Observer}
 * @example
 * const params = {
 *   container: '#waveform',
 *   waveColor: 'violet',
 *   progressColor: 'purple'
 * };
 *
 * // initialise like this
 * const slimsurfer = SlimSurfer.create(params);
 *
 * // or like this ...
 * const slimsurfer = new SlimSurfer(params);
 * slimsurfer.init();
 *
 * // load audio file
 * slimsurfer.load('example/media/demo.wav');
 */
export default class SlimSurfer extends util.Observer {
    /** @private */
    defaultParams = {
        audioRate: 1,
        autoCenter: true,
        barHeight: 1,
        barGap: null,
        container: null,
        cursorColor: '#333',
        cursorWidth: 1,
        dragSelection: true,
        fillParent: true,
        height: 128,
        hideScrollbar: false,
        interact: true,
        loopSelection: true,
        maxCanvasWidth: 4000,
        mediaContainer: null,
        mediaControls: false,
        mediaType: 'audio',
        minPxPerSec: 20,
        normalize: false,
        pixelRatio:
            window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI,
        plugins: [],
        progressColor: '#555',
        removeMediaElementOnDestroy: true,
        renderer: MultiCanvas,
        responsive: false,
        scrollParent: false,
        skipLength: 2,
        splitChannels: false,
        waveColor: '#999'
    };

    /**
     * Instantiate this class, call its `init` function and returns it
     *
     * @param {WavesurferParams} params
     * @return {Object} SlimSurfer instance
     * @example const slimsurfer = SlimSurfer.create(params);
     */
    static create(params) {
        const slimsurfer = new SlimSurfer(params);
        return slimsurfer.init();
    }

    /**
     * The library version number is available as a static property of the
     * SlimSurfer class
     *
     * @type {String}
     * @example
     * console.log('Using slimsurfer.js ' + SlimSurfer.VERSION);
     */
    static VERSION = __VERSION__;

    /**
     * Functions in the `util` property are available as a prototype property to
     * all instances
     *
     * @type {Object}
     * @example
     * const slimsurfer = SlimSurfer.create(params);
     * slimsurfer.util.style(myElement, { background: 'blue' });
     */
    util = util;

    /**
     * Functions in the `util` property are available as a static property of the
     * SlimSurfer class
     *
     * @type {Object}
     * @example
     * SlimSurfer.util.style(myElement, { background: 'blue' });
     */
    static util = util;

    /**
     * Initialise slimsurfer instance
     *
     * @param {WavesurferParams} params Instantiation options for slimsurfer
     * @example
     * const slimsurfer = new SlimSurfer(params);
     * @returns {this}
     */
    constructor(params) {
        super();
        /**
         * Extract relevant parameters (or defaults)
         * @private
         */
        this.params = util.extend({}, this.defaultParams, params);

        /** @private */
        this.container =
            'string' == typeof params.container
                ? document.querySelector(this.params.container)
                : this.params.container;

        if (!this.container) {
            throw new Error('Container element not found');
        }

        if (this.params.mediaContainer == null) {
            /** @private */
            this.mediaContainer = this.container;
        } else if (typeof this.params.mediaContainer == 'string') {
            /** @private */
            this.mediaContainer = document.querySelector(
                this.params.mediaContainer
            );
        } else {
            /** @private */
            this.mediaContainer = this.params.mediaContainer;
        }

        if (!this.mediaContainer) {
            throw new Error('Media Container element not found');
        }

        if (this.params.maxCanvasWidth <= 1) {
            throw new Error('maxCanvasWidth must be greater than 1');
        } else if (this.params.maxCanvasWidth % 2 == 1) {
            throw new Error('maxCanvasWidth must be an even number');
        }

        /**
         * @private Will hold a list of event descriptors that need to be
         * cancelled on subsequent loads of audio
         * @type {Object[]}
         */
        this.tmpEvents = [];

        /** @private */
        this.drawer = null;

        /** @private */
        this.backend = null;

        // cache constructor objects
        if (typeof this.params.renderer !== 'function') {
            throw new Error('Renderer parameter is invalid');
        }

        /**
         * @private The uninitialised Drawer class
         */
        this.Drawer = this.params.renderer;

        /**
         * @private map of plugin names that are currently initialised
         */
        this.initialisedPluginList = {};
        /** @private */
        this.isDestroyed = false;
        /** @private */
        this.isReady = false;

        // responsive debounced event listener. If this.params.responsive is not
        // set, this is never called. Use 100ms or this.params.responsive as
        // timeout for the debounce function.
        let prevWidth = 0;
        this._onResize = util.debounce(
            () => {
                // console.log('debounced resize');
                this.setHeight(this.container.offsetHeight);

                if (
                    prevWidth != this.drawer.wrapper.clientWidth &&
                    !this.params.scrollParent
                ) {
                    prevWidth = this.drawer.wrapper.clientWidth;
                    this.drawer.fireEvent('redraw');
                }
            },
            typeof this.params.responsive === 'number'
                ? this.params.responsive
                : 100
        );

        return this;
    }

    /**
     * Initialise the wave
     *
     * @example
     * var slimsurfer = new SlimSurfer(params);
     * slimsurfer.init();
     * @return {this}
     */
    init() {
        this.registerPlugins(this.params.plugins);
        this.createDrawer();
        this.createBackend();
        //this.createPeakCache();
        return this;
    }

    /**
     * Add and initialise array of plugins (if `plugin.deferInit` is falsey),
     * this function is called in the init function of slimsurfer
     *
     * @param {PluginDefinition[]} plugins An array of plugin definitions
     * @emits {SlimSurfer#plugins-registered} Called with the array of plugin definitions
     * @return {this}
     */
    registerPlugins(plugins) {
        // first instantiate all the plugins
        plugins.forEach(plugin => this.addPlugin(plugin));

        // now run the init functions
        plugins.forEach(plugin => {
            // call init function of the plugin if deferInit is falsey
            // in that case you would manually use initPlugins()
            if (!plugin.deferInit) {
                this.initPlugin(plugin.name);
            }
        });
        this.fireEvent('plugins-registered', plugins);
        return this;
    }

    /**
     * Add a plugin object to slimsurfer
     *
     * @param {PluginDefinition} plugin A plugin definition
     * @emits {SlimSurfer#plugin-added} Called with the name of the plugin that was added
     * @example slimsurfer.addPlugin(SlimSurfer.minimap());
     * @return {this}
     */
    addPlugin(plugin) {
        if (!plugin.name) {
            throw new Error('Plugin does not have a name!');
        }
        if (!plugin.instance) {
            throw new Error(
                `Plugin ${plugin.name} does not have an instance property!`
            );
        }

        // staticProps properties are applied to slimsurfer instance
        if (plugin.staticProps) {
            Object.keys(plugin.staticProps).forEach(pluginStaticProp => {
                /**
                 * Properties defined in a plugin definition's `staticProps` property are added as
                 * staticProps properties of the SlimSurfer instance
                 */
                this[pluginStaticProp] = plugin.staticProps[pluginStaticProp];
            });
        }

        const Instance = plugin.instance;

        // turn the plugin instance into an observer
        const observerPrototypeKeys = Object.getOwnPropertyNames(
            util.Observer.prototype
        );
        observerPrototypeKeys.forEach(key => {
            Instance.prototype[key] = util.Observer.prototype[key];
        });

        /**
         * Instantiated plugin classes are added as a property of the slimsurfer
         * instance
         * @type {Object}
         */
        this[plugin.name] = new Instance(plugin.params || {}, this);
        this.fireEvent('plugin-added', plugin.name);
        return this;
    }

    /**
     * Initialise a plugin
     *
     * @param {string} name A plugin name
     * @emits SlimSurfer#plugin-initialised
     * @example slimsurfer.initPlugin('minimap');
     * @return {this}
     */
    initPlugin(name) {
        if (!this[name]) {
            throw new Error(`Plugin ${name} has not been added yet!`);
        }
        if (this.initialisedPluginList[name]) {
            // destroy any already initialised plugins
            this.destroyPlugin(name);
        }
        this[name].init();
        this.initialisedPluginList[name] = true;
        this.fireEvent('plugin-initialised', name);
        return this;
    }

    /**
     * Destroy a plugin
     *
     * @param {string} name A plugin name
     * @emits SlimSurfer#plugin-destroyed
     * @example slimsurfer.destroyPlugin('minimap');
     * @returns {this}
     */
    destroyPlugin(name) {
        if (!this[name]) {
            throw new Error(
                `Plugin ${name} has not been added yet and cannot be destroyed!`
            );
        }
        if (!this.initialisedPluginList[name]) {
            throw new Error(
                `Plugin ${name} is not active and cannot be destroyed!`
            );
        }
        if (typeof this[name].destroy !== 'function') {
            throw new Error(`Plugin ${name} does not have a destroy function!`);
        }

        this[name].destroy();
        delete this.initialisedPluginList[name];
        this.fireEvent('plugin-destroyed', name);
        return this;
    }

    /**
     * Destroy all initialised plugins. Convenience function to use when
     * slimsurfer is removed
     *
     * @private
     */
    destroyAllPlugins() {
        Object.keys(this.initialisedPluginList).forEach(name =>
            this.destroyPlugin(name)
        );
    }

    /**
     * Create the drawer and draw the waveform
     *
     * @private
     * @emits SlimSurfer#drawer-created
     */
    createDrawer() {
        this.drawer = new this.Drawer(this.container, this.params);
        this.drawer.init();
        this.fireEvent('drawer-created', this.drawer);

        window.addEventListener('resize', this._onResize, true);
        window.addEventListener('orientationchange', this._onResize, true);

        this.drawer.on('redraw', () => {
            this.drawBuffer();
            this.drawer.progress(this.backend.getPlayedPercents());
        });

        // ADDED interaction event on click
        this.drawer.on('click', (e, progress) => {
            setTimeout(() => this.fireEvent('interaction', e, progress), 0);
        });

        // Relay the scroll event from the drawer
        this.drawer.on('scroll', e => {
            if (this.params.partialRender) {
                this.drawBuffer();
            }
            this.fireEvent('scroll', e);
        });
    }

    /**
     * Create the backend
     *
     * @private
     * @emits SlimSurfer#backend-created
     */
    createBackend() {
        if (this.backend) {
            this.backend.destroy();
        }

        this.backend = new MediaElement(this.params);
        this.backend.init();
        this.fireEvent('backend-created', this.backend);
    }

    /**
     * Get the duration of the audio clip
     *
     * @example const duration = slimsurfer.getDuration();
     * @return {number} Duration in seconds
     */
    getDuration() {
        return this.backend.getDuration();
    }

    /**
     * Get the current playback position
     *
     * @example const currentTime = slimsurfer.getCurrentTime();
     * @return {number} Playback position in seconds
     */
    getCurrentTime() {
        return this.backend.getCurrentTime();
    }

    /**
     * Set the current play time in seconds.
     *
     * @param {number} seconds A positive number in seconds. E.g. 10 means 10
     * seconds, 60 means 1 minute
     */
    setCurrentTime(seconds) {
        if (seconds >= this.getDuration()) {
            this.seekTo(1);
        } else {
            this.seekTo(seconds / this.getDuration());
        }
    }

    /**
     * Seeks to a position and centers the view
     *
     * @param {number} progress Between 0 (=beginning) and 1 (=end)
     * @example
     * // seek and go to the middle of the audio
     * slimsurfer.seekTo(0.5);
     */
    seekAndCenter(progress) {
        this.seekTo(progress);
        this.drawer.recenter(progress);
    }

    /**
     * Seeks to a position
     *
     * @param {number} progress Between 0 (=beginning) and 1 (=end)
     * @emits SlimSurfer#interaction
     * @emits SlimSurfer#seek
     * @example
     * // seek to the middle of the audio
     * slimsurfer.seekTo(0.5);
     */
    seekTo(progress) {
        // return an error if progress is not a number between 0 and 1
        if (
            typeof progress !== 'number' ||
            !isFinite(progress) ||
            progress < 0 ||
            progress > 1
        ) {
            return console.error('');
            /*'Error calling slimsurfer.seekTo, parameter must be a number between 0 and 1!'*/
        }

        // avoid small scrolls while paused seeking
        const oldScrollParent = this.params.scrollParent;
        this.params.scrollParent = false;
        this.backend.seekTo(progress * this.getDuration());
        this.drawer.progress(progress);

        this.params.scrollParent = oldScrollParent;
        this.fireEvent('seek', progress);
    }

    /**
     * Get the current ready status.
     *
     * @example const isReady = slimsurfer.isReady();
     * @return {boolean}
     */
    isReady() {
        return this.isReady;
    }

    /**
     * Toggles `scrollParent` and redraws
     *
     * @example slimsurfer.toggleScroll();
     */
    toggleScroll() {
        this.params.scrollParent = !this.params.scrollParent;
        this.drawBuffer();
    }

    /**
     * Toggle mouse interaction
     *
     * @example slimsurfer.toggleInteraction();
     */
    toggleInteraction() {
        this.params.interact = !this.params.interact;
    }

    /**
     * Get the fill color of the waveform after the cursor.
     *
     * @return {string} A CSS color string.
     */
    getWaveColor() {
        return this.params.waveColor;
    }

    /**
     * Set the fill color of the waveform after the cursor.
     *
     * @param {string} color A CSS color string.
     * @example slimsurfer.setWaveColor('#ddd');
     */
    setWaveColor(color) {
        this.params.waveColor = color;
        this.drawBuffer();
    }

    /**
     * Get the fill color of the waveform behind the cursor.
     *
     * @return {string} A CSS color string.
     */
    getProgressColor() {
        return this.params.progressColor;
    }

    /**
     * Set the fill color of the waveform behind the cursor.
     *
     * @param {string} color A CSS color string.
     * @example slimsurfer.setProgressColor('#400');
     */
    setProgressColor(color) {
        this.params.progressColor = color;
        this.drawBuffer();
    }

    /**
     * Get the fill color of the cursor indicating the playhead
     * position.
     *
     * @return {string} A CSS color string.
     */
    getCursorColor() {
        return this.params.cursorColor;
    }

    /**
     * Set the fill color of the cursor indicating the playhead
     * position.
     *
     * @param {string} color A CSS color string.
     * @example slimsurfer.setCursorColor('#222');
     */
    setCursorColor(color) {
        this.params.cursorColor = color;
        this.drawer.updateCursor();
    }

    /**
     * Get the height of the waveform.
     *
     * @return {number} Height measured in pixels.
     */
    getHeight() {
        return this.params.height;
    }

    /**
     * Set the height of the waveform.
     *
     * @param {number} height Height measured in pixels.
     * @example slimsurfer.setHeight(200);
     */
    setHeight(height) {
        this.params.height = height;
        this.drawer.setHeight(height * this.params.pixelRatio);
        this.drawBuffer();
    }

    /**
     * Get the correct peaks for current wave viewport and render wave
     *
     * @private
     * @emits SlimSurfer#redraw
     */
    drawBuffer() {
        const nominalWidth = Math.round(
            this.getDuration() *
                this.params.minPxPerSec *
                this.params.pixelRatio
        );
        const parentWidth = this.drawer.getWidth();
        let width = nominalWidth;
        let start = this.drawer.getScrollX();
        let end = Math.max(start + parentWidth, width);
        // Fill container
        if (
            this.params.fillParent &&
            (!this.params.scrollParent || nominalWidth < parentWidth)
        ) {
            width = parentWidth;
            start = 0;
            end = width;
        }

        let peaks;
        peaks = this.backend.getPeaks(width, start, end);
        this.drawer.drawPeaks(peaks, width, start, end);
        this.fireEvent('redraw', peaks, width);
    }

    /**
     * Horizontally zooms the waveform in and out. It also changes the parameter
     * `minPxPerSec` and enables the `scrollParent` option. Calling the function
     * with a falsey parameter will reset the zoom state.
     *
     * @param {?number} pxPerSec Number of horizontal pixels per second of
     * audio, if none is set the waveform returns to unzoomed state
     * @emits SlimSurfer#zoom
     * @example slimsurfer.zoom(20);
     */
    zoom(pxPerSec) {
        if (!pxPerSec) {
            this.params.minPxPerSec = this.defaultParams.minPxPerSec;
            this.params.scrollParent = false;
        } else {
            this.params.minPxPerSec = pxPerSec;
            this.params.scrollParent = true;
        }

        this.drawBuffer();
        this.drawer.progress(this.backend.getPlayedPercents());

        this.drawer.recenter(this.getCurrentTime() / this.getDuration());
        this.fireEvent('zoom', pxPerSec);
    }

    /**
     * Loads audio and re-renders the waveform.
     *
     * @param {?number[]|number[][]} peaks Wavesurfer does not have to decode
     * the audio to render the waveform if this is specified
     * @param {?number} duration The duration of the audio. This is used to
     * render the peaks data in the correct size for the audio duration (as
     * befits the current minPxPerSec and zoom value) without having to decode
     * the audio.
     */
    load(peaks, duration) {
        this.empty();
        return this.loadMediaElement(peaks, duration);
    }

    /**
     * Either create a media element, or load an existing media element.
     *
     * @private
     * @param {string|HTMLMediaElement} urlOrElt Either a path to a media file, or an
     * existing HTML5 Audio/Video Element
     * @param {number[]|number[][]} peaks Array of peaks. Required to bypass web audio
     * dependency
     * @param {?boolean} preload Set to true if the preload attribute of the
     * audio element should be enabled
     * @param {?number} duration
     */
    loadMediaElement(peaks, duration) {
        // If no pre-decoded peaks provided or pre-decoded peaks are
        // provided with forceDecode flag, attempt to download the
        // audio file and decode it with Web Audio.
        if (peaks) {
            this.backend.setPeaks(peaks, duration);
            this.drawBuffer();
            this.fireEvent('ready');
            this.isReady = true;
        }
    }

    /**
     * @private
     */
    clearTmpEvents() {
        this.tmpEvents.forEach(e => e.un());
    }

    /**
     * Display empty waveform.
     */
    empty() {
        this.isReady = false;
        this.clearTmpEvents();
        this.drawer.progress(0);
        this.drawer.setWidth(0);
        this.drawer.drawPeaks({ length: this.drawer.getWidth() }, 0);
    }

    /**
     * Remove events, elements and disconnect WebAudio nodes.
     *
     * @emits SlimSurfer#destroy
     */
    destroy() {
        this.destroyAllPlugins();
        this.fireEvent('destroy');
        this.clearTmpEvents();
        this.unAll();
        window.removeEventListener('resize', this._onResize, true);
        window.removeEventListener('orientationchange', this._onResize, true);
        this.backend.destroy();
        this.drawer.destroy();
        this.isDestroyed = true;
        this.isReady = false;
    }
}
