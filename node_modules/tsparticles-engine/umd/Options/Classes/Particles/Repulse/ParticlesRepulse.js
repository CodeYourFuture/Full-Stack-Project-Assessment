(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ValueWithRandom", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticlesRepulse = void 0;
    const ValueWithRandom_1 = require("../../ValueWithRandom");
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class ParticlesRepulse extends ValueWithRandom_1.ValueWithRandom {
        constructor() {
            super();
            this.enabled = false;
            this.distance = 1;
            this.duration = 1;
            this.factor = 1;
            this.speed = 1;
        }
        load(data) {
            super.load(data);
            if (!data) {
                return;
            }
            if (data.enabled !== undefined) {
                this.enabled = data.enabled;
            }
            if (data.distance !== undefined) {
                this.distance = (0, NumberUtils_1.setRangeValue)(data.distance);
            }
            if (data.duration !== undefined) {
                this.duration = (0, NumberUtils_1.setRangeValue)(data.duration);
            }
            if (data.factor !== undefined) {
                this.factor = (0, NumberUtils_1.setRangeValue)(data.factor);
            }
            if (data.speed !== undefined) {
                this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
            }
        }
    }
    exports.ParticlesRepulse = ParticlesRepulse;
});
