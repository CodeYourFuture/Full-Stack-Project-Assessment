(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noPolygonFound = exports.noPolygonDataLoaded = exports.visibilityChangeEvent = exports.resizeEvent = exports.touchCancelEvent = exports.mouseOutEvent = exports.mouseLeaveEvent = exports.touchMoveEvent = exports.touchStartEvent = exports.mouseMoveEvent = exports.mouseUpEvent = exports.mouseDownEvent = exports.touchEndEvent = exports.midColorValue = exports.randomColorValue = exports.generatedAttribute = void 0;
    exports.generatedAttribute = "generated";
    exports.randomColorValue = "random";
    exports.midColorValue = "mid";
    exports.touchEndEvent = "touchend";
    exports.mouseDownEvent = "mousedown";
    exports.mouseUpEvent = "mouseup";
    exports.mouseMoveEvent = "mousemove";
    exports.touchStartEvent = "touchstart";
    exports.touchMoveEvent = "touchmove";
    exports.mouseLeaveEvent = "mouseleave";
    exports.mouseOutEvent = "mouseout";
    exports.touchCancelEvent = "touchcancel";
    exports.resizeEvent = "resize";
    exports.visibilityChangeEvent = "visibilitychange";
    exports.noPolygonDataLoaded = "No polygon data loaded.";
    exports.noPolygonFound = "No polygon found, you need to specify SVG url in config.";
});
