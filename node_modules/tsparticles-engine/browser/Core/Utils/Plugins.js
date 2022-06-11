var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Plugins_engine;
/**
 * @category Utils
 */
export class Plugins {
    /**
     * The constructor of the plugin manager
     * @param engine the parent engine
     */
    constructor(engine) {
        /**
         * The engine used for registering plugins
         * @private
         */
        _Plugins_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Plugins_engine, engine, "f");
        this.plugins = [];
        this.interactorsInitializers = new Map();
        this.moversInitializers = new Map();
        this.updatersInitializers = new Map();
        this.interactors = new Map();
        this.movers = new Map();
        this.updaters = new Map();
        this.presets = new Map();
        this.drawers = new Map();
        this.pathGenerators = new Map();
    }
    /**
     * Searches if the specified plugin exists and returns it
     * @param plugin the plugin name
     * @returns the plugin if found, or undefined
     */
    getPlugin(plugin) {
        return this.plugins.find((t) => t.id === plugin);
    }
    /**
     * Adds a plugin to the plugin system, if the plugin already exists, is not added
     * @param plugin the plugin to add
     */
    addPlugin(plugin) {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }
    /**
     * Gets all the available plugins, for the specified container
     * @param container the container used to check which are the valid plugins
     * @returns a map containing all enabled plugins, with the id as a key
     */
    getAvailablePlugins(container) {
        const res = new Map();
        for (const plugin of this.plugins) {
            if (!plugin.needsPlugin(container.actualOptions)) {
                continue;
            }
            res.set(plugin.id, plugin.getPlugin(container));
        }
        return res;
    }
    /**
     * Load the given options for all the plugins
     * @param options the actual options to set
     * @param sourceOptions the source options to read
     */
    loadOptions(options, sourceOptions) {
        for (const plugin of this.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }
    /**
     * Searches the preset with the given name
     * @param preset the preset name to search
     * @returns the preset if found, or undefined
     */
    getPreset(preset) {
        return this.presets.get(preset);
    }
    /**
     * Adds a preset to the existing collection
     * @param presetKey the preset name
     * @param options the options to load with the preset name
     * @param override if true, overwrites the existing preset
     */
    addPreset(presetKey, options, override = false) {
        if (override || !this.getPreset(presetKey)) {
            this.presets.set(presetKey, options);
        }
    }
    /**
     * Searches the given shape drawer type with the given type name
     * @param type the shape drawer type name
     * @returns the shape drawer if found, or undefined
     */
    getShapeDrawer(type) {
        return this.drawers.get(type);
    }
    /**
     * Adds a shape drawer (additional particle shape) to the current collection
     * @param type the shape drawer type (particle shape name)
     * @param drawer the shape drawer
     */
    addShapeDrawer(type, drawer) {
        if (!this.getShapeDrawer(type)) {
            this.drawers.set(type, drawer);
        }
    }
    /**
     * This method returns all the supported shapes with this Plugins instance
     * @returns all the supported shapes type name
     */
    getSupportedShapes() {
        return this.drawers.keys();
    }
    /**
     * Searches the path generator with the given type name
     * @param type the path generator type to search
     * @returns the path generator if found, or undefined
     */
    getPathGenerator(type) {
        return this.pathGenerators.get(type);
    }
    /**
     * Adds a path generator to the current collection
     * @param type the type used as a key in the collection
     * @param pathGenerator the path generator to add
     */
    addPathGenerator(type, pathGenerator) {
        if (!this.getPathGenerator(type)) {
            this.pathGenerators.set(type, pathGenerator);
        }
    }
    /**
     * Returns all the container interaction managers
     * @param container the container used to check which interaction managers are compatible
     * @param force if true reloads the interaction managers collection for the given container
     * @returns the array of interaction managers for the given container
     */
    getInteractors(container, force = false) {
        let res = this.interactors.get(container);
        if (!res || force) {
            res = [...this.interactorsInitializers.values()].map((t) => t(container));
            this.interactors.set(container, res);
        }
        return res;
    }
    /**
     * Adds an interaction manager to the current collection
     * @param name the interaction manager name
     * @param initInteractor the interaction manager initializer
     */
    addInteractor(name, initInteractor) {
        this.interactorsInitializers.set(name, initInteractor);
    }
    /**
     * Returns all the container particle updaters
     * @param container the container used to check which particle updaters are enabled
     * @param force if true reloads the updater collection for the given container
     * @returns the array of updaters for the given container
     */
    getUpdaters(container, force = false) {
        let res = this.updaters.get(container);
        if (!res || force) {
            res = [...this.updatersInitializers.values()].map((t) => t(container));
            this.updaters.set(container, res);
        }
        return res;
    }
    /**
     * Adds a particle updater to the collection
     * @param name the particle updater name used as a key
     * @param initUpdater the particle updater initializer
     */
    addParticleUpdater(name, initUpdater) {
        this.updatersInitializers.set(name, initUpdater);
    }
    getMovers(container, force = false) {
        let res = this.movers.get(container);
        if (!res || force) {
            res = [...this.moversInitializers.values()].map((t) => t(container));
            this.movers.set(container, res);
        }
        return res;
    }
    addParticleMover(name, initMover) {
        this.moversInitializers.set(name, initMover);
    }
}
_Plugins_engine = new WeakMap();
