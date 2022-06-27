(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Constants", "../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventListeners = void 0;
    const Constants_1 = require("./Constants");
    const Utils_1 = require("../../Utils/Utils");
    function manageListener(element, event, handler, add, options) {
        if (add) {
            let addOptions = { passive: true };
            if (typeof options === "boolean") {
                addOptions.capture = options;
            }
            else if (options !== undefined) {
                addOptions = options;
            }
            element.addEventListener(event, handler, addOptions);
        }
        else {
            const removeOptions = options;
            element.removeEventListener(event, handler, removeOptions);
        }
    }
    class EventListeners {
        constructor(container) {
            this.container = container;
            this.canPush = true;
            this.mouseMoveHandler = (e) => this.mouseTouchMove(e);
            this.touchStartHandler = (e) => this.mouseTouchMove(e);
            this.touchMoveHandler = (e) => this.mouseTouchMove(e);
            this.touchEndHandler = () => this.mouseTouchFinish();
            this.mouseLeaveHandler = () => this.mouseTouchFinish();
            this.touchCancelHandler = () => this.mouseTouchFinish();
            this.touchEndClickHandler = (e) => this.mouseTouchClick(e);
            this.mouseUpHandler = (e) => this.mouseTouchClick(e);
            this.mouseDownHandler = () => this.mouseDown();
            this.visibilityChangeHandler = () => this.handleVisibilityChange();
            this.themeChangeHandler = (e) => this.handleThemeChange(e);
            this.oldThemeChangeHandler = (e) => this.handleThemeChange(e);
            this.resizeHandler = () => this.handleWindowResize();
        }
        addListeners() {
            this.manageListeners(true);
        }
        removeListeners() {
            this.manageListeners(false);
        }
        manageListeners(add) {
            var _a;
            const container = this.container, options = container.actualOptions, detectType = options.interactivity.detectsOn;
            let mouseLeaveTmpEvent = Constants_1.mouseLeaveEvent;
            if (detectType === "window") {
                container.interactivity.element = window;
                mouseLeaveTmpEvent = Constants_1.mouseOutEvent;
            }
            else if (detectType === "parent" && container.canvas.element) {
                const canvasEl = container.canvas.element;
                container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
            }
            else {
                container.interactivity.element = container.canvas.element;
            }
            const mediaMatch = !(0, Utils_1.isSsr)() && typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)");
            if (mediaMatch) {
                if (mediaMatch.addEventListener !== undefined) {
                    manageListener(mediaMatch, "change", this.themeChangeHandler, add);
                }
                else if (mediaMatch.addListener !== undefined) {
                    if (add) {
                        mediaMatch.addListener(this.oldThemeChangeHandler);
                    }
                    else {
                        mediaMatch.removeListener(this.oldThemeChangeHandler);
                    }
                }
            }
            const interactivityEl = container.interactivity.element;
            if (!interactivityEl) {
                return;
            }
            const html = interactivityEl;
            if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
                manageListener(interactivityEl, Constants_1.mouseMoveEvent, this.mouseMoveHandler, add);
                manageListener(interactivityEl, Constants_1.touchStartEvent, this.touchStartHandler, add);
                manageListener(interactivityEl, Constants_1.touchMoveEvent, this.touchMoveHandler, add);
                if (!options.interactivity.events.onClick.enable) {
                    manageListener(interactivityEl, Constants_1.touchEndEvent, this.touchEndHandler, add);
                }
                else {
                    manageListener(interactivityEl, Constants_1.touchEndEvent, this.touchEndClickHandler, add);
                    manageListener(interactivityEl, Constants_1.mouseUpEvent, this.mouseUpHandler, add);
                    manageListener(interactivityEl, Constants_1.mouseDownEvent, this.mouseDownHandler, add);
                }
                manageListener(interactivityEl, mouseLeaveTmpEvent, this.mouseLeaveHandler, add);
                manageListener(interactivityEl, Constants_1.touchCancelEvent, this.touchCancelHandler, add);
            }
            if (container.canvas.element) {
                container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
            }
            if (options.interactivity.events.resize) {
                if (typeof ResizeObserver !== "undefined") {
                    if (this.resizeObserver && !add) {
                        if (container.canvas.element) {
                            this.resizeObserver.unobserve(container.canvas.element);
                        }
                        this.resizeObserver.disconnect();
                        delete this.resizeObserver;
                    }
                    else if (!this.resizeObserver && add && container.canvas.element) {
                        this.resizeObserver = new ResizeObserver((entries) => {
                            const entry = entries.find((e) => e.target === container.canvas.element);
                            if (!entry) {
                                return;
                            }
                            this.handleWindowResize();
                        });
                        this.resizeObserver.observe(container.canvas.element);
                    }
                }
                else {
                    manageListener(window, Constants_1.resizeEvent, this.resizeHandler, add);
                }
            }
            if (document) {
                manageListener(document, Constants_1.visibilityChangeEvent, this.visibilityChangeHandler, add, false);
            }
        }
        handleWindowResize() {
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout);
                delete this.resizeTimeout;
            }
            this.resizeTimeout = setTimeout(async () => { var _a; return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize(); }, 500);
        }
        handleVisibilityChange() {
            const container = this.container, options = container.actualOptions;
            this.mouseTouchFinish();
            if (!options.pauseOnBlur) {
                return;
            }
            if (document === null || document === void 0 ? void 0 : document.hidden) {
                container.pageHidden = true;
                container.pause();
            }
            else {
                container.pageHidden = false;
                if (container.getAnimationStatus()) {
                    container.play(true);
                }
                else {
                    container.draw(true);
                }
            }
        }
        mouseDown() {
            const interactivity = this.container.interactivity;
            if (interactivity) {
                const mouse = interactivity.mouse;
                mouse.clicking = true;
                mouse.downPosition = mouse.position;
            }
        }
        mouseTouchMove(e) {
            var _a, _b, _c, _d, _e, _f, _g;
            const container = this.container, options = container.actualOptions;
            if (!((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element)) {
                return;
            }
            container.interactivity.mouse.inside = true;
            let pos;
            const canvas = container.canvas.element;
            if (e.type.startsWith("mouse")) {
                this.canPush = true;
                const mouseEvent = e;
                if (container.interactivity.element === window) {
                    if (canvas) {
                        const clientRect = canvas.getBoundingClientRect();
                        pos = {
                            x: mouseEvent.clientX - clientRect.left,
                            y: mouseEvent.clientY - clientRect.top,
                        };
                    }
                }
                else if (options.interactivity.detectsOn === "parent") {
                    const source = mouseEvent.target;
                    const target = mouseEvent.currentTarget;
                    const canvasEl = container.canvas.element;
                    if (source && target && canvasEl) {
                        const sourceRect = source.getBoundingClientRect();
                        const targetRect = target.getBoundingClientRect();
                        const canvasRect = canvasEl.getBoundingClientRect();
                        pos = {
                            x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
                            y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top),
                        };
                    }
                    else {
                        pos = {
                            x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
                            y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY,
                        };
                    }
                }
                else {
                    if (mouseEvent.target === container.canvas.element) {
                        pos = {
                            x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
                            y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY,
                        };
                    }
                }
            }
            else {
                this.canPush = e.type !== "touchmove";
                const touchEvent = e;
                const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
                const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
                pos = {
                    x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
                    y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0),
                };
            }
            const pxRatio = container.retina.pixelRatio;
            if (pos) {
                pos.x *= pxRatio;
                pos.y *= pxRatio;
            }
            container.interactivity.mouse.position = pos;
            container.interactivity.status = Constants_1.mouseMoveEvent;
        }
        mouseTouchFinish() {
            const interactivity = this.container.interactivity;
            if (!interactivity) {
                return;
            }
            const mouse = interactivity.mouse;
            delete mouse.position;
            delete mouse.clickPosition;
            delete mouse.downPosition;
            interactivity.status = Constants_1.mouseLeaveEvent;
            mouse.inside = false;
            mouse.clicking = false;
        }
        mouseTouchClick(e) {
            const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse;
            mouse.inside = true;
            let handled = false;
            const mousePosition = mouse.position;
            if (!mousePosition || !options.interactivity.events.onClick.enable) {
                return;
            }
            for (const [, plugin] of container.plugins) {
                if (!plugin.clickPositionValid) {
                    continue;
                }
                handled = plugin.clickPositionValid(mousePosition);
                if (handled) {
                    break;
                }
            }
            if (!handled) {
                this.doMouseTouchClick(e);
            }
            mouse.clicking = false;
        }
        doMouseTouchClick(e) {
            const container = this.container, options = container.actualOptions;
            if (this.canPush) {
                const mousePos = container.interactivity.mouse.position;
                if (!mousePos) {
                    return;
                }
                container.interactivity.mouse.clickPosition = {
                    x: mousePos.x,
                    y: mousePos.y,
                };
                container.interactivity.mouse.clickTime = new Date().getTime();
                const onClick = options.interactivity.events.onClick;
                if (onClick.mode instanceof Array) {
                    for (const mode of onClick.mode) {
                        this.handleClickMode(mode);
                    }
                }
                else {
                    this.handleClickMode(onClick.mode);
                }
            }
            if (e.type === "touchend") {
                setTimeout(() => this.mouseTouchFinish(), 500);
            }
        }
        handleThemeChange(e) {
            const mediaEvent = e, themeName = mediaEvent.matches
                ? this.container.options.defaultDarkTheme
                : this.container.options.defaultLightTheme, theme = this.container.options.themes.find((theme) => theme.name === themeName);
            if (theme && theme.default.auto) {
                this.container.loadTheme(themeName);
            }
        }
        handleClickMode(mode) {
            this.container.handleClickMode(mode);
        }
    }
    exports.EventListeners = EventListeners;
});
