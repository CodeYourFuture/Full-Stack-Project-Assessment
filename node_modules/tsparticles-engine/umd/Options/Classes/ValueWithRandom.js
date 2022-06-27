(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Random", "../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueWithRandom = void 0;
    const Random_1 = require("./Random");
    const NumberUtils_1 = require("../../Utils/NumberUtils");
    class ValueWithRandom {
        constructor() {
            this.random = new Random_1.Random();
            this.value = 0;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (typeof data.random === "boolean") {
                this.random.enable = data.random;
            }
            else {
                this.random.load(data.random);
            }
            if (data.value !== undefined) {
                this.value = (0, NumberUtils_1.setRangeValue)(data.value, this.random.enable ? this.random.minimumValue : undefined);
            }
        }
    }
    exports.ValueWithRandom = ValueWithRandom;
});
