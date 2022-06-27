(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../AnimationOptions", "../../OptionsColor", "./OrbitRotation", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Orbit = void 0;
    const AnimationOptions_1 = require("../../AnimationOptions");
    const OptionsColor_1 = require("../../OptionsColor");
    const OrbitRotation_1 = require("./OrbitRotation");
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class Orbit {
        constructor() {
            this.animation = new AnimationOptions_1.AnimationOptions();
            this.enable = false;
            this.opacity = 1;
            this.rotation = new OrbitRotation_1.OrbitRotation();
            this.width = 1;
        }
        load(data) {
            if (!data) {
                return;
            }
            this.animation.load(data.animation);
            this.rotation.load(data.rotation);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.opacity !== undefined) {
                this.opacity = (0, NumberUtils_1.setRangeValue)(data.opacity);
            }
            if (data.width !== undefined) {
                this.width = (0, NumberUtils_1.setRangeValue)(data.width);
            }
            if (data.radius !== undefined) {
                this.radius = (0, NumberUtils_1.setRangeValue)(data.radius);
            }
            if (data.color !== undefined) {
                this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            }
        }
    }
    exports.Orbit = Orbit;
});
