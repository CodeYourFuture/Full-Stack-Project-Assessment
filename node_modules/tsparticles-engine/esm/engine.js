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
export class Engine {
    constructor() {
        _Engine_initialized.set(this, void 0);
        _Engine_loader.set(this, void 0);
        this.domArray = [];
        this.eventDispatcher = new EventDispatcher();
        __classPrivateFieldSet(this, _Engine_initialized, false, "f");
        __classPrivateFieldSet(this, _Engine_loader, new Loader(this), "f");
        this.plugins = new Plugins(this);
    }
    init() {
        if (!__classPrivateFieldGet(this, _Engine_initialized, "f")) {
            __classPrivateFieldSet(this, _Engine_initialized, true, "f");
        }
    }
    async loadFromArray(tagId, options, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options, index);
    }
    async load(tagId, options) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options);
    }
    async set(id, element, options) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").set(id, element, options);
    }
    async loadJSON(tagId, pathConfigJson, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").loadJSON(tagId, pathConfigJson, index);
    }
    async setJSON(id, element, pathConfigJson, index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").setJSON(id, element, pathConfigJson, index);
    }
    setOnClickHandler(callback) {
        __classPrivateFieldGet(this, _Engine_loader, "f").setOnClickHandler(callback);
    }
    dom() {
        return __classPrivateFieldGet(this, _Engine_loader, "f").dom();
    }
    domItem(index) {
        return __classPrivateFieldGet(this, _Engine_loader, "f").domItem(index);
    }
    async refresh() {
        for (const instance of this.dom()) {
            await instance.refresh();
        }
    }
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
    async addPreset(preset, options, override = false) {
        this.plugins.addPreset(preset, options, override);
        await this.refresh();
    }
    async addPlugin(plugin) {
        this.plugins.addPlugin(plugin);
        await this.refresh();
    }
    async addPathGenerator(name, generator) {
        this.plugins.addPathGenerator(name, generator);
        await this.refresh();
    }
    async addInteractor(name, interactorInitializer) {
        this.plugins.addInteractor(name, interactorInitializer);
        await this.refresh();
    }
    async addMover(name, moverInitializer) {
        this.plugins.addParticleMover(name, moverInitializer);
        await this.refresh();
    }
    async addParticleUpdater(name, updaterInitializer) {
        this.plugins.addParticleUpdater(name, updaterInitializer);
        await this.refresh();
    }
    addEventListener(type, listener) {
        __classPrivateFieldGet(this, _Engine_loader, "f").addEventListener(type, listener);
    }
    removeEventListener(type, listener) {
        __classPrivateFieldGet(this, _Engine_loader, "f").removeEventListener(type, listener);
    }
    dispatchEvent(type, args) {
        __classPrivateFieldGet(this, _Engine_loader, "f").dispatchEvent(type, args);
    }
}
_Engine_initialized = new WeakMap(), _Engine_loader = new WeakMap();
