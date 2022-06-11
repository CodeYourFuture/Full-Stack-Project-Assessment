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
import { deepExtend, loadParticlesOptions } from "../../Utils/Utils";
import { Background } from "./Background/Background";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import { FullScreen } from "./FullScreen/FullScreen";
import { Interactivity } from "./Interactivity/Interactivity";
import { ManualParticle } from "./ManualParticle";
import { Motion } from "./Motion/Motion";
import { Responsive } from "./Responsive";
import { Theme } from "./Theme/Theme";
/**
 * [[include:Options.md]]
 * @category Options
 */
export class Options {
    constructor(engine) {
        _Options_instances.add(this);
        _Options_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Options_engine, engine, "f");
        this.autoPlay = true;
        this.background = new Background();
        this.backgroundMask = new BackgroundMask();
        this.fullScreen = new FullScreen();
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new Interactivity();
        this.manualParticles = [];
        this.motion = new Motion();
        this.particles = loadParticlesOptions();
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.style = {};
        this.themes = [];
        this.zLayers = 100;
    }
    /**
     * @deprecated this property is obsolete, please use the new fpsLimit
     */
    get fps_limit() {
        return this.fpsLimit;
    }
    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     * @param value
     */
    set fps_limit(value) {
        this.fpsLimit = value;
    }
    /**
     * @deprecated this property is obsolete, please use the new retinaDetect
     */
    get retina_detect() {
        return this.detectRetina;
    }
    /**
     * @deprecated this property is obsolete, please use the new retinaDetect
     * @param value
     */
    set retina_detect(value) {
        this.detectRetina = value;
    }
    /**
     * @deprecated this property is obsolete, please use the new fullScreen
     */
    get backgroundMode() {
        return this.fullScreen;
    }
    /**
     * @deprecated this property is obsolete, please use the new fullScreen
     * @param value
     */
    set backgroundMode(value) {
        this.fullScreen.load(value);
    }
    /**
     * This methods loads the source object in the current instance
     * @param data the source data to load into the instance
     */
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
                const tmp = new ManualParticle();
                tmp.load(t);
                return tmp;
            });
        }
        this.motion.load(data.motion);
        this.particles.load(data.particles);
        this.style = deepExtend(this.style, data.style);
        __classPrivateFieldGet(this, _Options_engine, "f").plugins.loadOptions(this, data);
        if (data.responsive !== undefined) {
            for (const responsive of data.responsive) {
                const optResponsive = new Responsive();
                optResponsive.load(responsive);
                this.responsive.push(optResponsive);
            }
        }
        this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const optTheme = new Theme();
                optTheme.load(theme);
                this.themes.push(optTheme);
            }
        }
        this.defaultDarkTheme = (_d = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "dark" /* dark */)) === null || _d === void 0 ? void 0 : _d.name;
        this.defaultLightTheme = (_e = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "light" /* light */)) === null || _e === void 0 ? void 0 : _e.name;
    }
    setTheme(name) {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);
            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        }
        else {
            const mediaMatch = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch && mediaMatch.matches, defaultTheme = __classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, clientDarkMode ? "dark" /* dark */ : "light" /* light */);
            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }
    setResponsive(width, pxRatio, defaultOptions) {
        this.load(defaultOptions);
        const responsiveOptions = this.responsive.find((t) => t.mode === "screen" /* screen */ && screen
            ? t.maxWidth * pxRatio > screen.availWidth
            : t.maxWidth * pxRatio > width);
        this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
        return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
    }
    importPreset(preset) {
        this.load(__classPrivateFieldGet(this, _Options_engine, "f").plugins.getPreset(preset));
    }
}
_Options_engine = new WeakMap(), _Options_instances = new WeakSet(), _Options_findDefaultTheme = function _Options_findDefaultTheme(mode) {
    var _a;
    return ((_a = this.themes.find((theme) => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find((theme) => theme.default.value && theme.default.mode === "any" /* any */));
};
