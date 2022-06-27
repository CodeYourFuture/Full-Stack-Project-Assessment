var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Engine_initialized, _Engine_loader;
import { EventDispatcher } from "./Utils/EventDispatcher";
import { Loader } from "./Core/Loader";
import { Plugins } from "./Core/Utils/Plugins";
/**
 * Engine class for creating the singleton on window.
 * It's a singleton proxy to the Loader class for initializing [[Container]] instances,
 * and for Plugins class responsible for every external feature
 * @category Engine
 */
export class Engine {
    /**
     * Engine constructor, initializes plugins, loader and the containers array
     */
    constructor() {
        /**
         * Checks if the engine instance is initialized
         */
        _Engine_initialized.set(this, void 0);
        /**
         * Contains the [[Loader]] engine instance
         * @private
         */
        _Engine_loader.set(this, void 0);
        this.domArray = [];
        this.eventDispatcher = new EventDispatcher();
        __classPrivateFieldSet(this, _Engine_initialized, false, "f");
        __classPrivateFieldSet(this, _Engine_loader, new Loader(this), "f");
        this.plugins = new Plugins(this);
    }
    /**
     * init method, used by imports
     */
    init() {
        if (!__classPrivateFieldGet(this, _Engine_initialized, "f")) {
            __classPrivateFieldSet(this, _Engine_initialized, true, "f");
        }
    }
    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param options The options array to get the item from
     * @param index If provided gets the corresponding item from the array
     * @returns A Promise with the [[Container]] object created
     */
    async loadFromArray(tagId, options, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options, index);
    }
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId The particles container element id
     * @param options The options object to initialize the [[Container]]
     * @returns A Promise with the [[Container]] object created
     */
    async load(tagId, options) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options);
    }
    /**
     * Loads the provided option to create a [[Container]] object using the element parameter as a container
     * @param id The particles container id
     * @param element The dom element used to contain the particles
     * @param options The options object to initialize the [[Container]]
     */
    async set(id, element, options) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").set(id, element, options);
    }
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param pathConfigJson the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    async loadJSON(tagId, pathConfigJson, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").loadJSON(tagId, pathConfigJson, index);
    }
    /**
     * Loads the provided option to create a [[Container]] object using the element parameter as a container
     * @param id The particles container id
     * @param element The dom element used to contain the particles
     * @param pathConfigJson the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    async setJSON(id, element, pathConfigJson, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").setJSON(id, element, pathConfigJson, index);
    }
    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback The function called after the click event is fired
     */
    setOnClickHandler(callback) {
        __classPrivateFieldGet(this, _Engine_loader, "f").setOnClickHandler(callback);
    }
    /**
     * All the [[Container]] objects loaded
     * @returns All the [[Container]] objects loaded
     */
    dom() {
        return __classPrivateFieldGet(this, _Engine_loader, "f").dom();
    }
    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index The object index
     * @returns The [[Container]] object at specified index, if present or not destroyed, otherwise undefined
     */
    domItem(index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").domItem(index);
    }
    /**
     * Reloads all existing tsParticles loaded instances
     */
    async refresh() {
        for (const instance of this.dom()) {
            await instance.refresh();
        }
    }
    /**
     * addShape adds shape to tsParticles, it will be available to all future instances created
     * @param shape the shape name
     * @param drawer the shape drawer function or class instance that draws the shape in the canvas
     * @param init Optional: the shape drawer init function, used only if the drawer parameter is a function
     * @param afterEffect Optional: the shape drawer after effect function, used only if the drawer parameter is a function
     * @param destroy Optional: the shape drawer destroy function, used only if the drawer parameter is a function
     */
    async addShape(shape, drawer, init, afterEffect, destroy) {
        let customDrawer;
        if (typeof drawer === "function") {
            customDrawer = {
                afterEffect: afterEffect,
                destroy: destroy,
                draw: drawer,
                init: init,
            };
        }
        else {
            customDrawer = drawer;
        }
        this.plugins.addShapeDrawer(shape, customDrawer);
        await this.refresh();
    }
    /**
     * addPreset adds preset to tsParticles, it will be available to all future instances created
     * @param preset the preset name
     * @param options the options to add to the preset
     * @param override if true, the preset will override any existing with the same name
     */
    async addPreset(preset, options, override = false) {
        this.plugins.addPreset(preset, options, override);
        await this.refresh();
    }
    /**
     * addPlugin adds plugin to tsParticles, if an instance needs it it will be loaded
     * @param plugin the plugin implementation of [[IPlugin]]
     */
    async addPlugin(plugin) {
        this.plugins.addPlugin(plugin);
        await this.refresh();
    }
    /**
     * addPathGenerator adds a named path generator to tsParticles, this can be called by options
     * @param name the path generator name
     * @param generator the path generator object
     */
    async addPathGenerator(name, generator) {
        this.plugins.addPathGenerator(name, generator);
        await this.refresh();
    }
    /**
     *
     * @param name
     * @param interactorInitializer
     */
    async addInteractor(name, interactorInitializer) {
        this.plugins.addInteractor(name, interactorInitializer);
        await this.refresh();
    }
    async addMover(name, moverInitializer) {
        this.plugins.addParticleMover(name, moverInitializer);
        await this.refresh();
    }
    /**
     *
     * @param name
     * @param updaterInitializer
     */
    async addParticleUpdater(name, updaterInitializer) {
        this.plugins.addParticleUpdater(name, updaterInitializer);
        await this.refresh();
    }
    /**
     * Adds a listener to the specified event
     * @param type The event to listen to
     * @param listener The listener of the specified event
     */
    addEventListener(type, listener) {
        __classPrivateFieldGet(this, _Engine_loader, "f").addEventListener(type, listener);
    }
    /**
     * Removes a listener from the specified event
     * @param type The event to stop listening to
     * @param listener The listener of the specified event
     */
    removeEventListener(type, listener) {
        __classPrivateFieldGet(this, _Engine_loader, "f").removeEventListener(type, listener);
    }
    /**
     * Dispatches an event that will be listened from listeners
     * @param type The event to dispatch
     * @param args The event parameters
     */
    dispatchEvent(type, args) {
        __classPrivateFieldGet(this, _Engine_loader, "f").dispatchEvent(type, args);
    }
}
_Engine_initialized = new WeakMap(), _Engine_loader = new WeakMap();
