"use strict";
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
var _Options_instances, _Options_engine, _Options_findDefaultTheme;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const Utils_1 = require("../../Utils/Utils");
const Background_1 = require("./Background/Background");
const BackgroundMask_1 = require("./BackgroundMask/BackgroundMask");
const FullScreen_1 = require("./FullScreen/FullScreen");
const Interactivity_1 = require("./Interactivity/Interactivity");
const ManualParticle_1 = require("./ManualParticle");
const Motion_1 = require("./Motion/Motion");
const Responsive_1 = require("./Responsive");
const Theme_1 = require("./Theme/Theme");
class Options {
    constructor(engine) {
        _Options_instances.add(this);
        _Options_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Options_engine, engine, "f");
        this.autoPlay = true;
        this.background = new Background_1.Background();
        this.backgroundMask = new BackgroundMask_1.BackgroundMask();
        this.fullScreen = new FullScreen_1.FullScreen();
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new Interactivity_1.Interactivity();
        this.manualParticles = [];
        this.motion = new Motion_1.Motion();
        this.particles = (0, Utils_1.loadParticlesOptions)();
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.style = {};
        this.themes = [];
        this.zLayers = 100;
    }
    get fps_limit() {
        return this.fpsLimit;
    }
    set fps_limit(value) {
        this.fpsLimit = value;
    }
    get retina_detect() {
        return this.detectRetina;
    }
    set retina_detect(value) {
        this.detectRetina = value;
    }
    get backgroundMode() {
        return this.fullScreen;
    }
    set backgroundMode(value) {
        this.fullScreen.load(value);
    }
    load(data) {
        var _a, _b, _c, _d, _e;
        if (!data) {
            return;
        }
        if (data.preset !== undefined) {
            if (data.preset instanceof Array) {
                for (const preset of data.preset) {
                    this.importPreset(preset);
                }
            }
            else {
                this.importPreset(data.preset);
            }
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;
        if (fpsLimit !== undefined) {
            this.fpsLimit = fpsLimit;
        }
        if (data.pauseOnBlur !== undefined) {
            this.pauseOnBlur = data.pauseOnBlur;
        }
        if (data.pauseOnOutsideViewport !== undefined) {
            this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
        }
        if (data.zLayers !== undefined) {
            this.zLayers = data.zLayers;
        }
        this.background.load(data.background);
        const fullScreen = (_c = data.fullScreen) !== null && _c !== void 0 ? _c : data.backgroundMode;
        if (typeof fullScreen === "boolean") {
            this.fullScreen.enable = fullScreen;
        }
        else {
            this.fullScreen.load(fullScreen);
        }
        this.backgroundMask.load(data.backgroundMask);
        this.interactivity.load(data.interactivity);
        if (data.manualParticles !== undefined) {
            this.manualParticles = data.manualParticles.map((t) => {
                const tmp = new ManualParticle_1.ManualParticle();
                tmp.load(t);
                return tmp;
            });
        }
        this.motion.load(data.motion);
        this.particles.load(data.particles);
        this.style = (0, Utils_1.deepExtend)(this.style, data.style);
        __classPrivateFieldGet(this, _Options_engine, "f").plugins.loadOptions(this, data);
        if (data.responsive !== undefined) {
            for (const responsive of data.responsive) {
                const optResponsive = new Responsive_1.Responsive();
                optResponsive.load(responsive);
                this.responsive.push(optResponsive);
            }
        }
        this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const optTheme = new Theme_1.Theme();
                optTheme.load(theme);
                this.themes.push(optTheme);
            }
        }
        this.defaultDarkTheme = (_d = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "dark")) === null || _d === void 0 ? void 0 : _d.name;
        this.defaultLightTheme = (_e = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "light")) === null || _e === void 0 ? void 0 : _e.name;
    }
    setTheme(name) {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);
            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        }
        else {
            const mediaMatch = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch && mediaMatch.matches, defaultTheme = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, clientDarkMode ? "dark" : "light");
            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }
    setResponsive(width, pxRatio, defaultOptions) {
        this.load(defaultOptions);
        const responsiveOptions = this.responsive.find((t) => t.mode === "screen" && screen
            ? t.maxWidth * pxRatio > screen.availWidth
            : t.maxWidth * pxRatio > width);
        this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
        return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
    }
    importPreset(preset) {
        this.load(__classPrivateFieldGet(this, _Options_engine, "f").plugins.getPreset(preset));
    }
}
exports.Options = Options;
_Options_engine = new WeakMap(), _Options_instances = new WeakSet(), _Options_findDefaultTheme = function _Options_findDefaultTheme(mode) {
    var _a;
    return ((_a = this.themes.find((theme) => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find((theme) => theme.default.value && theme.default.mode === "any"));
};
