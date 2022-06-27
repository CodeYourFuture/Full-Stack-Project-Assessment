(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./AnimatableColor", "../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GradientColorOpacityAnimation = exports.GradientAngleAnimation = exports.AnimatableGradientColor = exports.GradientColorOpacity = exports.GradientAngle = exports.AnimatableGradient = void 0;
    const AnimatableColor_1 = require("./AnimatableColor");
    const NumberUtils_1 = require("../../Utils/NumberUtils");
    class AnimatableGradient {
        constructor() {
            this.angle = new GradientAngle();
            this.colors = [];
            this.type = "random";
        }
        load(data) {
            if (!data) {
                return;
            }
            this.angle.load(data.angle);
            if (data.colors !== undefined) {
                this.colors = data.colors.map((s) => {
                    const tmp = new AnimatableGradientColor();
                    tmp.load(s);
                    return tmp;
                });
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
    exports.AnimatableGradient = AnimatableGradient;
    class GradientAngle {
        constructor() {
            this.value = 0;
            this.animation = new GradientAngleAnimation();
            this.direction = "clockwise";
        }
        load(data) {
            if (!data) {
                return;
            }
            this.animation.load(data.animation);
            if (data.value !== undefined) {
                this.value = data.value;
            }
            if (data.direction !== undefined) {
                this.direction = data.direction;
            }
        }
    }
    exports.GradientAngle = GradientAngle;
    class GradientColorOpacity {
        constructor() {
            this.value = 0;
            this.animation = new GradientColorOpacityAnimation();
        }
        load(data) {
            if (!data) {
                return;
            }
            this.animation.load(data.animation);
            if (data.value !== undefined) {
                this.value = (0, NumberUtils_1.setRangeValue)(data.value);
            }
        }
    }
    exports.GradientColorOpacity = GradientColorOpacity;
    class AnimatableGradientColor {
        constructor() {
            this.stop = 0;
            this.value = new AnimatableColor_1.AnimatableColor();
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.stop !== undefined) {
                this.stop = data.stop;
            }
            this.value = AnimatableColor_1.AnimatableColor.create(this.value, data.value);
            if (data.opacity !== undefined) {
                this.opacity = new GradientColorOpacity();
                if (typeof data.opacity === "number") {
                    this.opacity.value = data.opacity;
                }
                else {
                    this.opacity.load(data.opacity);
                }
            }
        }
    }
    exports.AnimatableGradientColor = AnimatableGradientColor;
    class GradientAngleAnimation {
        constructor() {
            this.count = 0;
            this.enable = false;
            this.speed = 0;
            this.sync = false;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.count !== undefined) {
                this.count = (0, NumberUtils_1.setRangeValue)(data.count);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.speed !== undefined) {
                this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
            }
            if (data.sync !== undefined) {
                this.sync = data.sync;
            }
        }
    }
    exports.GradientAngleAnimation = GradientAngleAnimation;
    class GradientColorOpacityAnimation {
        constructor() {
            this.count = 0;
            this.enable = false;
            this.speed = 0;
            this.sync = false;
            this.startValue = "random";
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.count !== undefined) {
                this.count = (0, NumberUtils_1.setRangeValue)(data.count);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.speed !== undefined) {
                this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
            }
            if (data.sync !== undefined) {
                this.sync = data.sync;
            }
            if (data.startValue !== undefined) {
                this.startValue = data.startValue;
            }
        }
    }
    exports.GradientColorOpacityAnimation = GradientColorOpacityAnimation;
});
