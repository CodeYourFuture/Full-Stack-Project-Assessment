(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnimationOptions = void 0;
    const NumberUtils_1 = require("../../Utils/NumberUtils");
    class AnimationOptions {
        constructor() {
            this.count = 0;
            this.enable = false;
            this.speed = 1;
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
    exports.AnimationOptions = AnimationOptions;
});
