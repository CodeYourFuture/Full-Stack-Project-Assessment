(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Core/Utils/Vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.calcExactPositionOrRandomFromSizeRanged = exports.calcExactPositionOrRandomFromSize = exports.calcPositionOrRandomFromSizeRanged = exports.calcPositionOrRandomFromSize = exports.calcPositionFromSize = exports.calcEasing = exports.collisionVelocity = exports.getParticleBaseVelocity = exports.getParticleDirectionAngle = exports.getDistance = exports.getDistances = exports.getValue = exports.setRangeValue = exports.getRangeMax = exports.getRangeMin = exports.getRangeValue = exports.randomInRange = exports.mix = exports.clamp = void 0;
    const Vector_1 = require("../Core/Utils/Vector");
    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    exports.clamp = clamp;
    function mix(comp1, comp2, weight1, weight2) {
        return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }
    exports.mix = mix;
    function randomInRange(r) {
        const max = getRangeMax(r);
        let min = getRangeMin(r);
        if (max === min) {
            min = 0;
        }
        return Math.random() * (max - min) + min;
    }
    exports.randomInRange = randomInRange;
    function getRangeValue(value) {
        return typeof value === "number" ? value : randomInRange(value);
    }
    exports.getRangeValue = getRangeValue;
    function getRangeMin(value) {
        return typeof value === "number" ? value : value.min;
    }
    exports.getRangeMin = getRangeMin;
    function getRangeMax(value) {
        return typeof value === "number" ? value : value.max;
    }
    exports.getRangeMax = getRangeMax;
    function setRangeValue(source, value) {
        if (source === value || (value === undefined && typeof source === "number")) {
            return source;
        }
        const min = getRangeMin(source), max = getRangeMax(source);
        return value !== undefined
            ? {
                min: Math.min(min, value),
                max: Math.max(max, value),
            }
            : setRangeValue(min, max);
    }
    exports.setRangeValue = setRangeValue;
    function getValue(options) {
        const random = options.random, { enable, minimumValue } = typeof random === "boolean"
            ? {
                enable: random,
                minimumValue: 0,
            }
            : random;
        return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
    }
    exports.getValue = getValue;
    function getDistances(pointA, pointB) {
        const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
        return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
    }
    exports.getDistances = getDistances;
    function getDistance(pointA, pointB) {
        return getDistances(pointA, pointB).distance;
    }
    exports.getDistance = getDistance;
    function getParticleDirectionAngle(direction, position, center) {
        if (typeof direction === "number") {
            return (direction * Math.PI) / 180;
        }
        else {
            switch (direction) {
                case "top":
                    return -Math.PI / 2;
                case "top-right":
                    return -Math.PI / 4;
                case "right":
                    return 0;
                case "bottom-right":
                    return Math.PI / 4;
                case "bottom":
                    return Math.PI / 2;
                case "bottom-left":
                    return (3 * Math.PI) / 4;
                case "left":
                    return Math.PI;
                case "top-left":
                    return (-3 * Math.PI) / 4;
                case "inside":
                    return Math.atan2(center.y - position.y, center.x - position.x);
                case "outside":
                    return Math.atan2(position.y - center.y, position.x - center.x);
                case "none":
                default:
                    return Math.random() * Math.PI * 2;
            }
        }
    }
    exports.getParticleDirectionAngle = getParticleDirectionAngle;
    function getParticleBaseVelocity(direction) {
        const baseVelocity = Vector_1.Vector.origin;
        baseVelocity.length = 1;
        baseVelocity.angle = direction;
        return baseVelocity;
    }
    exports.getParticleBaseVelocity = getParticleBaseVelocity;
    function collisionVelocity(v1, v2, m1, m2) {
        return Vector_1.Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
    }
    exports.collisionVelocity = collisionVelocity;
    function calcEasing(value, type) {
        switch (type) {
            case "ease-out-quad":
                return 1 - (1 - value) ** 2;
            case "ease-out-cubic":
                return 1 - (1 - value) ** 3;
            case "ease-out-quart":
                return 1 - (1 - value) ** 4;
            case "ease-out-quint":
                return 1 - (1 - value) ** 5;
            case "ease-out-expo":
                return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
            case "ease-out-sine":
                return Math.sin((value * Math.PI) / 2);
            case "ease-out-back": {
                const c1 = 1.70158, c3 = c1 + 1;
                return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
            }
            case "ease-out-circ":
                return Math.sqrt(1 - Math.pow(value - 1, 2));
            default:
                return value;
        }
    }
    exports.calcEasing = calcEasing;
    function calcPositionFromSize(data) {
        var _a, _b;
        return ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined && ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined
            ? {
                x: (data.position.x * data.size.width) / 100,
                y: (data.position.y * data.size.height) / 100,
            }
            : undefined;
    }
    exports.calcPositionFromSize = calcPositionFromSize;
    function calcPositionOrRandomFromSize(data) {
        var _a, _b, _c, _d;
        return {
            x: (((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * 100) * data.size.width) / 100,
            y: (((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * 100) * data.size.height) / 100,
        };
    }
    exports.calcPositionOrRandomFromSize = calcPositionOrRandomFromSize;
    function calcPositionOrRandomFromSizeRanged(data) {
        var _a, _b;
        const position = {
            x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
            y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined,
        };
        return calcPositionOrRandomFromSize({ size: data.size, position });
    }
    exports.calcPositionOrRandomFromSizeRanged = calcPositionOrRandomFromSizeRanged;
    function calcExactPositionOrRandomFromSize(data) {
        var _a, _b, _c, _d;
        return {
            x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * data.size.width,
            y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * data.size.height,
        };
    }
    exports.calcExactPositionOrRandomFromSize = calcExactPositionOrRandomFromSize;
    function calcExactPositionOrRandomFromSizeRanged(data) {
        var _a, _b;
        const position = {
            x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
            y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined,
        };
        return calcExactPositionOrRandomFromSize({ size: data.size, position });
    }
    exports.calcExactPositionOrRandomFromSizeRanged = calcExactPositionOrRandomFromSizeRanged;
});
