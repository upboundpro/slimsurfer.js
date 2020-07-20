/* eslint-env jasmine */
import SlimSurfer from '../src/slimsurfer.js';

import TestHelpers from './test-helpers.js';

/** @test {SlimSurfer} */
describe('SlimSurfer/plugin API:', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    let waveformDiv;
    let dummyPlugin;
    let slimsurfer;

    // clean up after each test
    afterEach(done => {
        if (slimsurfer !== undefined) {
            slimsurfer.destroy();
            waveformDiv.parentNode.removeChild(waveformDiv);
        }
        done();
    });

    // utility function to generate a mock plugin object
    function mockPlugin(name, deferInit = false) {
        class MockPlugin {
            constructor(params, ws) {
                this.ws = ws;
                // using the instance factory unfortunately makes it
                // difficult to use the spyOn function, so we use this
                // instead
                this.isInitialised = false;
            }
            init() {
                this.isInitialised = true;
            }
            destroy() {}
        }
        return {
            name,
            deferInit,
            staticProps: {
                [`${name}Static`]: 'static property value'
            },
            instance: MockPlugin
        };
    }

    // utility function to generate slimsurfer instances for testing
    function __createWaveform(options = {}) {
        waveformDiv = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(waveformDiv);

        slimsurfer = SlimSurfer.create(
            Object.assign(
                {
                    container: waveformDiv
                },
                options
            )
        );
        slimsurfer.load(TestHelpers.EXAMPLE_FILE_PATH);
    }

    // plugin methods
    /** @test {SlimSurfer#addPlugin} */
    it('addPlugin adds staticProps and correctly builds and instantiates plugin class', () => {
        dummyPlugin = mockPlugin('dummy');
        __createWaveform();
        slimsurfer.addPlugin(dummyPlugin);

        expect(slimsurfer.dummyStatic).toEqual(
            dummyPlugin.staticProps.dummyStatic
        );
        expect(slimsurfer.dummy.ws).toEqual(slimsurfer);
        expect(typeof Object.getPrototypeOf(slimsurfer.dummy).on).toEqual(
            'function'
        );

        dummyPlugin = {};
        expect(function() {
            slimsurfer.addPlugin(dummyPlugin);
        }).toThrow(new Error('Plugin does not have a name!'));

        dummyPlugin.name = 'foo';
        expect(function() {
            slimsurfer.addPlugin(dummyPlugin);
        }).toThrow(new Error('Plugin foo does not have an instance property!'));
    });

    /** @test {SlimSurfer#initPlugin} */
    it('initPlugin calls init function of the plugin and adds its name to the initialisedPluginList', () => {
        dummyPlugin = mockPlugin('dummy');
        __createWaveform();
        slimsurfer.addPlugin(dummyPlugin);
        spyOn(slimsurfer.dummy, 'init');
        slimsurfer.initPlugin('dummy');

        expect(slimsurfer.dummy.init).toHaveBeenCalled();
        expect(slimsurfer.initialisedPluginList.dummy).toBeTrue();

        expect(function() {
            slimsurfer.initPlugin('foo');
        }).toThrow(new Error('Plugin foo has not been added yet!'));
    });

    /** @test {SlimSurfer#destroyPlugin} */
    it('destroyPlugin calls plugin destroy function and removes the plugin name from the initialisedPluginList', () => {
        dummyPlugin = mockPlugin('dummy');
        __createWaveform();
        slimsurfer.addPlugin(dummyPlugin);
        slimsurfer.initPlugin('dummy');
        spyOn(slimsurfer.dummy, 'destroy');
        slimsurfer.destroyPlugin('dummy');

        expect(slimsurfer.dummy.destroy).toHaveBeenCalled();
        expect(slimsurfer.initialisedPluginList.dummy).toBeUndefined();

        expect(function() {
            slimsurfer.destroyPlugin('foo');
        }).toThrow(
            new Error(
                'Plugin foo has not been added yet and cannot be destroyed!'
            )
        );
    });

    // auto-adding and initialising of plugins (registerPlugins)
    /** @test {SlimSurfer#registerPlugins} */
    it('registerPlugin adds a plugin but does not call plugin init function if the plugin property deferInit is truethy', () => {
        dummyPlugin = mockPlugin('dummy', true);
        __createWaveform({
            plugins: [dummyPlugin]
        });
        expect(slimsurfer.dummyStatic).toEqual(
            dummyPlugin.staticProps.dummyStatic
        );
        expect(slimsurfer.dummy.ws).toEqual(slimsurfer);
        expect(slimsurfer.dummy.isInitialised).toBeFalse();
    });

    /** @test {SlimSurfer#registerPlugins} */
    it('registerPlugin adds a plugin ands calls plugin init function if the plugin property deferInit is falsey', () => {
        dummyPlugin = mockPlugin('dummy');
        __createWaveform({
            plugins: [dummyPlugin]
        });
        expect(slimsurfer.dummyStatic).toEqual(
            dummyPlugin.staticProps.dummyStatic
        );
        expect(slimsurfer.dummy.ws).toEqual(slimsurfer);
        expect(slimsurfer.dummy.isInitialised).toBeTrue();
    });
});
