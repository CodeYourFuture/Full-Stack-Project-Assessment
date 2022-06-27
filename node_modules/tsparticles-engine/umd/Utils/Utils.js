(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NumberUtils", "../Options/Classes/Options", "../Options/Classes/Particles/ParticlesOptions", "../Core/Utils/Vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadParticlesOptions = exports.loadContainerOptions = exports.rectBounce = exports.circleBounce = exports.circleBounceDataFromParticle = exports.divMode = exports.singleDivModeExecute = exports.divModeExecute = exports.isDivModeEnabled = exports.deepExtend = exports.calculateBounds = exports.areBoundsInside = exports.isPointInside = exports.itemFromArray = exports.arrayRandomIndex = exports.loadFont = exports.isInArray = exports.cancelAnimation = exports.animate = exports.isSsr = void 0;
    const NumberUtils_1 = require("./NumberUtils");
    const Options_1 = require("../Options/Classes/Options");
    const ParticlesOptions_1 = require("../Options/Classes/Particles/ParticlesOptions");
    const Vector_1 = require("../Core/Utils/Vector");
    function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
        const res = { bounced: false };
        if (pOtherSide.min < rectOtherSide.min ||
            pOtherSide.min > rectOtherSide.max ||
            pOtherSide.max < rectOtherSide.min ||
            pOtherSide.max > rectOtherSide.max) {
            return res;
        }
        if ((pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0) ||
            (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0)) {
            res.velocity = velocity * -factor;
            res.bounced = true;
        }
        return res;
    }
    function checkSelector(element, selectors) {
        if (!(selectors instanceof Array)) {
            return element.matches(selectors);
        }
        for (const selector of selectors) {
            if (element.matches(selector)) {
                return true;
            }
        }
        return false;
    }
    function isSsr() {
        return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
    }
    exports.isSsr = isSsr;
    function animate() {
        return isSsr()
            ? (callback) => setTimeout(callback)
            : (callback) => (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.setTimeout)(callback);
    }
    exports.animate = animate;
    function cancelAnimation() {
        return isSsr()
            ? (handle) => clearTimeout(handle)
            : (handle) => (window.cancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                window.clearTimeout)(handle);
    }
    exports.cancelAnimation = cancelAnimation;
    function isInArray(value, array) {
        return value === array || (array instanceof Array && array.indexOf(value) > -1);
    }
    exports.isInArray = isInArray;
    async function loadFont(font, weight) {
        try {
            await document.fonts.load(`${weight !== null && weight !== void 0 ? weight : "400"} 36px '${font !== null && font !== void 0 ? font : "Verdana"}'`);
        }
        catch (_a) {
        }
    }
    exports.loadFont = loadFont;
    function arrayRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
    exports.arrayRandomIndex = arrayRandomIndex;
    function itemFromArray(array, index, useIndex = true) {
        const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
        return array[fixedIndex];
    }
    exports.itemFromArray = itemFromArray;
    function isPointInside(point, size, offset, radius, direction) {
        return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, offset, direction);
    }
    exports.isPointInside = isPointInside;
    function areBoundsInside(bounds, size, offset, direction) {
        let inside = true;
        if (!direction || direction === "bottom") {
            inside = bounds.top < size.height + offset.x;
        }
        if (inside && (!direction || direction === "left")) {
            inside = bounds.right > offset.x;
        }
        if (inside && (!direction || direction === "right")) {
            inside = bounds.left < size.width + offset.y;
        }
        if (inside && (!direction || direction === "top")) {
            inside = bounds.bottom > offset.y;
        }
        return inside;
    }
    exports.areBoundsInside = areBoundsInside;
    function calculateBounds(point, radius) {
        return {
            bottom: point.y + radius,
            left: point.x - radius,
            right: point.x + radius,
            top: point.y - radius,
        };
    }
    exports.calculateBounds = calculateBounds;
    function deepExtend(destination, ...sources) {
        for (const source of sources) {
            if (source === undefined || source === null) {
                continue;
            }
            if (typeof source !== "object") {
                destination = source;
                continue;
            }
            const sourceIsArray = Array.isArray(source);
            if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
                destination = [];
            }
            else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
                destination = {};
            }
            for (const key in source) {
                if (key === "__proto__") {
                    continue;
                }
                const sourceDict = source, value = sourceDict[key], isObject = typeof value === "object", destDict = destination;
                destDict[key] =
                    isObject && Array.isArray(value)
                        ? value.map((v) => deepExtend(destDict[key], v))
                        : deepExtend(destDict[key], value);
            }
        }
        return destination;
    }
    exports.deepExtend = deepExtend;
    function isDivModeEnabled(mode, divs) {
        return divs instanceof Array ? !!divs.find((t) => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
    }
    exports.isDivModeEnabled = isDivModeEnabled;
    function divModeExecute(mode, divs, callback) {
        if (divs instanceof Array) {
            for (const div of divs) {
                const divMode = div.mode, divEnabled = div.enable;
                if (divEnabled && isInArray(mode, divMode)) {
                    singleDivModeExecute(div, callback);
                }
            }
        }
        else {
            const divMode = divs.mode, divEnabled = divs.enable;
            if (divEnabled && isInArray(mode, divMode)) {
                singleDivModeExecute(divs, callback);
            }
        }
    }
    exports.divModeExecute = divModeExecute;
    function singleDivModeExecute(div, callback) {
        const selectors = div.selectors;
        if (selectors instanceof Array) {
            for (const selector of selectors) {
                callback(selector, div);
            }
        }
        else {
            callback(selectors, div);
        }
    }
    exports.singleDivModeExecute = singleDivModeExecute;
    function divMode(divs, element) {
        if (!element || !divs) {
            return;
        }
        if (divs instanceof Array) {
            return divs.find((d) => checkSelector(element, d.selectors));
        }
        else if (checkSelector(element, divs.selectors)) {
            return divs;
        }
    }
    exports.divMode = divMode;
    function circleBounceDataFromParticle(p) {
        return {
            position: p.getPosition(),
            radius: p.getRadius(),
            mass: p.getMass(),
            velocity: p.velocity,
            factor: Vector_1.Vector.create((0, NumberUtils_1.getValue)(p.options.bounce.horizontal), (0, NumberUtils_1.getValue)(p.options.bounce.vertical)),
        };
    }
    exports.circleBounceDataFromParticle = circleBounceDataFromParticle;
    function circleBounce(p1, p2) {
        const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = (0, NumberUtils_1.getDistances)(pos2, pos1);
        if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
            return;
        }
        const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = (0, NumberUtils_1.collisionVelocity)(u1, u2, m1, m2), v2 = (0, NumberUtils_1.collisionVelocity)(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
        p1.velocity.x = vFinal1.x * p1.factor.x;
        p1.velocity.y = vFinal1.y * p1.factor.y;
        p2.velocity.x = vFinal2.x * p2.factor.x;
        p2.velocity.y = vFinal2.y * p2.factor.y;
    }
    exports.circleBounce = circleBounce;
    function rectBounce(particle, divBounds) {
        const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size);
        const resH = rectSideBounce({
            min: bounds.left,
            max: bounds.right,
        }, {
            min: bounds.top,
            max: bounds.bottom,
        }, {
            min: divBounds.left,
            max: divBounds.right,
        }, {
            min: divBounds.top,
            max: divBounds.bottom,
        }, particle.velocity.x, (0, NumberUtils_1.getValue)(particle.options.bounce.horizontal));
        if (resH.bounced) {
            if (resH.velocity !== undefined) {
                particle.velocity.x = resH.velocity;
            }
            if (resH.position !== undefined) {
                particle.position.x = resH.position;
            }
        }
        const resV = rectSideBounce({
            min: bounds.top,
            max: bounds.bottom,
        }, {
            min: bounds.left,
            max: bounds.right,
        }, {
            min: divBounds.top,
            max: divBounds.bottom,
        }, {
            min: divBounds.left,
            max: divBounds.right,
        }, particle.velocity.y, (0, NumberUtils_1.getValue)(particle.options.bounce.vertical));
        if (resV.bounced) {
            if (resV.velocity !== undefined) {
                particle.velocity.y = resV.velocity;
            }
            if (resV.position !== undefined) {
                particle.position.y = resV.position;
            }
        }
    }
    exports.rectBounce = rectBounce;
    function loadOptions(options, ...sourceOptionsArr) {
        for (const sourceOptions of sourceOptionsArr) {
            options.load(sourceOptions);
        }
    }
    function loadContainerOptions(engine, ...sourceOptionsArr) {
        const options = new Options_1.Options(engine);
        loadOptions(options, ...sourceOptionsArr);
        return options;
    }
    exports.loadContainerOptions = loadContainerOptions;
    function loadParticlesOptions(...sourceOptionsArr) {
        const options = new ParticlesOptions_1.ParticlesOptions();
        loadOptions(options, ...sourceOptionsArr);
        return options;
    }
    exports.loadParticlesOptions = loadParticlesOptions;
});
