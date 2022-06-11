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
var _Container_engine;
/**
 * [[include:Container.md]]
 * @packageDocumentation
 */
import { animate, cancelAnimation, loadContainerOptions } from "../Utils/Utils";
import { Canvas } from "./Canvas";
import { EventListeners } from "./Utils/EventListeners";
import { FrameManager } from "./Utils/FrameManager";
import { Particles } from "./Particles";
import { Retina } from "./Retina";
import { getRangeValue } from "../Utils/NumberUtils";
/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 * [[include:Container.md]]
 * @category Core
 */
export class Container {
    /**
     * This is the core class, create an instance to have a new working particles manager
     * @constructor
     * @param engine the engine used by container
     * @param id the id to identify this instance
     * @param sourceOptions the options to load
     */
    constructor(engine, id, sourceOptions) {
        this.id = id;
        _Container_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Container_engine, engine, "f");
        this.fpsLimit = 120;
        this.duration = 0;
        this.lifeTime = 0;
        this.firstStart = true;
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.zLayers = 100;
        this.pageHidden = false;
        this._sourceOptions = sourceOptions;
        this._initialSourceOptions = sourceOptions;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(__classPrivateFieldGet(this, _Container_engine, "f"), this);
        this.drawer = new FrameManager(this);
        this.pathGenerator = {
            generate: (p) => {
                const v = p.velocity.copy();
                v.angle += (v.length * Math.PI) / 180;
                return v;
            },
            init: () => {
                // nothing required
            },
            update: () => {
                // nothing required
            },
        };
        this.interactivity = {
            mouse: {
                clicking: false,
                inside: false,
            },
        };
        this.plugins = new Map();
        this.drawers = new Map();
        this.density = 1;
        /* tsParticles variables with default values */
        this._options = loadContainerOptions(__classPrivateFieldGet(this, _Container_engine, "f"));
        this.actualOptions = loadContainerOptions(__classPrivateFieldGet(this, _Container_engine, "f"));
        /* ---------- tsParticles - start ------------ */
        this.eventListeners = new EventListeners(this);
        if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
            this.intersectionObserver = new IntersectionObserver((entries) => this.intersectionManager(entries));
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerBuilt" /* containerBuilt */, { container: this });
    }
    /**
     * The options used by the container, it's a full [[Options]] object
     */
    get options() {
        return this._options;
    }
    get sourceOptions() {
        return this._sourceOptions;
    }
    /**
     * Starts animations and resume from pause
     * @param force
     */
    play(force) {
        const needsUpdate = this.paused || force;
        if (this.firstStart && !this.actualOptions.autoPlay) {
            this.firstStart = false;
            return;
        }
        if (this.paused) {
            this.paused = false;
        }
        if (needsUpdate) {
            for (const [, plugin] of this.plugins) {
                if (plugin.play) {
                    plugin.play();
                }
            }
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerPlay" /* containerPlay */, { container: this });
        this.draw(needsUpdate || false);
    }
    /**
     * Pauses animations
     */
    pause() {
        if (this.drawAnimationFrame !== undefined) {
            cancelAnimation()(this.drawAnimationFrame);
            delete this.drawAnimationFrame;
        }
        if (this.paused) {
            return;
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.pause) {
                plugin.pause();
            }
        }
        if (!this.pageHidden) {
            this.paused = true;
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerPaused" /* containerPaused */, { container: this });
    }
    /**
     * Draws a frame
     */
    draw(force) {
        let refreshTime = force;
        this.drawAnimationFrame = animate()(async (timestamp) => {
            if (refreshTime) {
                this.lastFrameTime = undefined;
                refreshTime = false;
            }
            await this.drawer.nextFrame(timestamp);
        });
    }
    /**
     * Gets the animation status
     * @returns `true` is playing, `false` is paused
     */
    getAnimationStatus() {
        return !this.paused && !this.pageHidden;
    }
    /**
     * Customise path generation
     * @deprecated Use the new setPath
     * @param noiseOrGenerator the [[IMovePathGenerator]] object or a function that generates a [[Vector]] object from [[Particle]]
     * @param init the [[IMovePathGenerator]] init function, if the first parameter is a generator function
     * @param update the [[IMovePathGenerator]] update function, if the first parameter is a generator function
     */
    setNoise(noiseOrGenerator, init, update) {
        this.setPath(noiseOrGenerator, init, update);
    }
    /**
     * Customise path generation
     * @param pathOrGenerator the [[IMovePathGenerator]] object or a function that generates a [[Vector]] object from [[Particle]]
     * @param init the [[IMovePathGenerator]] init function, if the first parameter is a generator function
     * @param update the [[IMovePathGenerator]] update function, if the first parameter is a generator function
     */
    setPath(pathOrGenerator, init, update) {
        var _a, _b, _c;
        if (!pathOrGenerator) {
            return;
        }
        if (typeof pathOrGenerator === "function") {
            this.pathGenerator.generate = pathOrGenerator;
            if (init) {
                this.pathGenerator.init = init;
            }
            if (update) {
                this.pathGenerator.update = update;
            }
        }
        else {
            const oldGenerator = this.pathGenerator;
            this.pathGenerator = pathOrGenerator;
            (_a = this.pathGenerator).generate || (_a.generate = oldGenerator.generate);
            (_b = this.pathGenerator).init || (_b.init = oldGenerator.init);
            (_c = this.pathGenerator).update || (_c.update = oldGenerator.update);
        }
    }
    /**
     * Destroys the current container, invalidating it
     */
    destroy() {
        this.stop();
        this.canvas.destroy();
        for (const [, drawer] of this.drawers) {
            if (drawer.destroy) {
                drawer.destroy(this);
            }
        }
        for (const key of this.drawers.keys()) {
            this.drawers.delete(key);
        }
        this.destroyed = true;
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerDestroyed" /* containerDestroyed */, { container: this });
    }
    /**
     * @deprecated this method is deprecated, please use the exportImage method
     * @param callback The callback to handle the image
     */
    exportImg(callback) {
        this.exportImage(callback);
    }
    /**
     * Exports the current canvas image, `background` property of `options` won't be rendered because it's css related
     * @param callback The callback to handle the image
     * @param type The exported image type
     * @param quality The exported image quality
     */
    exportImage(callback, type, quality) {
        var _a;
        return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
    }
    /**
     * Exports the current configuration using `options` property
     * @returns a JSON string created from `options` property
     */
    exportConfiguration() {
        return JSON.stringify(this.actualOptions, undefined, 2);
    }
    /**
     * Restarts the container, just a [[stop]]/[[start]] alias
     */
    refresh() {
        /* restart */
        this.stop();
        return this.start();
    }
    reset() {
        this._options = loadContainerOptions(__classPrivateFieldGet(this, _Container_engine, "f"));
        return this.refresh();
    }
    /**
     * Stops the container, opposite to `start`. Clears some resources and stops events.
     */
    stop() {
        if (!this.started) {
            return;
        }
        this.firstStart = true;
        this.started = false;
        this.eventListeners.removeListeners();
        this.pause();
        this.particles.clear();
        this.canvas.clear();
        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
            this.intersectionObserver.unobserve(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.stop) {
                plugin.stop();
            }
        }
        for (const key of this.plugins.keys()) {
            this.plugins.delete(key);
        }
        this.particles.linksColors = new Map();
        delete this.particles.grabLineColor;
        delete this.particles.linksColor;
        this._sourceOptions = this._options;
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStopped" /* containerStopped */, { container: this });
    }
    /**
     * Loads the given theme, overriding the options
     * @param name the theme name, if `undefined` resets the default options or the default theme
     */
    async loadTheme(name) {
        this.currentTheme = name;
        await this.refresh();
    }
    /**
     * Starts the container, initializes what are needed to create animations and event handling
     */
    async start() {
        if (this.started) {
            return;
        }
        await this.init();
        this.started = true;
        this.eventListeners.addListeners();
        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
            this.intersectionObserver.observe(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.startAsync !== undefined) {
                await plugin.startAsync();
            }
            else if (plugin.start !== undefined) {
                plugin.start();
            }
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStarted" /* containerStarted */, { container: this });
        this.play();
    }
    addClickHandler(callback) {
        const el = this.interactivity.element;
        if (!el) {
            return;
        }
        const clickOrTouchHandler = (e, pos, radius) => {
            if (this.destroyed) {
                return;
            }
            const pxRatio = this.retina.pixelRatio, posRetina = {
                x: pos.x * pxRatio,
                y: pos.y * pxRatio,
            }, particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
            callback(e, particles);
        };
        const clickHandler = (e) => {
            if (this.destroyed) {
                return;
            }
            const mouseEvent = e, pos = {
                x: mouseEvent.offsetX || mouseEvent.clientX,
                y: mouseEvent.offsetY || mouseEvent.clientY,
            };
            clickOrTouchHandler(e, pos, 1);
        };
        const touchStartHandler = () => {
            if (this.destroyed) {
                return;
            }
            touched = true;
            touchMoved = false;
        };
        const touchMoveHandler = () => {
            if (this.destroyed) {
                return;
            }
            touchMoved = true;
        };
        const touchEndHandler = (e) => {
            var _a, _b, _c;
            if (this.destroyed) {
                return;
            }
            if (touched && !touchMoved) {
                const touchEvent = e;
                let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
                if (!lastTouch) {
                    lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
                    if (!lastTouch) {
                        return;
                    }
                }
                const canvasRect = (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect(), pos = {
                    x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
                    y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0),
                };
                clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
            }
            touched = false;
            touchMoved = false;
        };
        const touchCancelHandler = () => {
            if (this.destroyed) {
                return;
            }
            touched = false;
            touchMoved = false;
        };
        let touched = false;
        let touchMoved = false;
        el.addEventListener("click", clickHandler);
        el.addEventListener("touchstart", touchStartHandler);
        el.addEventListener("touchmove", touchMoveHandler);
        el.addEventListener("touchend", touchEndHandler);
        el.addEventListener("touchcancel", touchCancelHandler);
    }
    handleClickMode(mode) {
        this.particles.handleClickMode(mode);
        for (const [, plugin] of this.plugins) {
            if (plugin.handleClickMode) {
                plugin.handleClickMode(mode);
            }
        }
    }
    updateActualOptions() {
        this.actualOptions.responsive = [];
        const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
        this.actualOptions.setTheme(this.currentTheme);
        if (this.responsiveMaxWidth != newMaxWidth) {
            this.responsiveMaxWidth = newMaxWidth;
            return true;
        }
        return false;
    }
    async init() {
        const shapes = __classPrivateFieldGet(this, _Container_engine, "f").plugins.getSupportedShapes();
        for (const type of shapes) {
            const drawer = __classPrivateFieldGet(this, _Container_engine, "f").plugins.getShapeDrawer(type);
            if (drawer) {
                this.drawers.set(type, drawer);
            }
        }
        /* options settings */
        this._options = loadContainerOptions(__classPrivateFieldGet(this, _Container_engine, "f"), this._initialSourceOptions, this.sourceOptions);
        this.actualOptions = loadContainerOptions(__classPrivateFieldGet(this, _Container_engine, "f"), this._options);
        /* init canvas + particles */
        this.retina.init();
        this.canvas.init();
        this.updateActualOptions();
        this.canvas.initBackground();
        this.canvas.resize();
        this.zLayers = this.actualOptions.zLayers;
        this.duration = getRangeValue(this.actualOptions.duration);
        this.lifeTime = 0;
        this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
        const availablePlugins = __classPrivateFieldGet(this, _Container_engine, "f").plugins.getAvailablePlugins(this);
        for (const [id, plugin] of availablePlugins) {
            this.plugins.set(id, plugin);
        }
        for (const [, drawer] of this.drawers) {
            if (drawer.init) {
                await drawer.init(this);
            }
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.init) {
                plugin.init(this.actualOptions);
            }
            else if (plugin.initAsync !== undefined) {
                await plugin.initAsync(this.actualOptions);
            }
        }
        const pathOptions = this.actualOptions.particles.move.path;
        if (pathOptions.generator) {
            this.setPath(__classPrivateFieldGet(this, _Container_engine, "f").plugins.getPathGenerator(pathOptions.generator));
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerInit" /* containerInit */, { container: this });
        this.particles.init();
        this.particles.setDensity();
        for (const [, plugin] of this.plugins) {
            if (plugin.particlesSetup !== undefined) {
                plugin.particlesSetup();
            }
        }
        __classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("particlesSetup" /* particlesSetup */, { container: this });
    }
    intersectionManager(entries) {
        if (!this.actualOptions.pauseOnOutsideViewport) {
            return;
        }
        for (const entry of entries) {
            if (entry.target !== this.interactivity.element) {
                continue;
            }
            if (entry.isIntersecting) {
                this.play();
            }
            else {
                this.pause();
            }
        }
    }
}
_Container_engine = new WeakMap();
