(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RollLight = void 0;
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class RollLight {
        constructor() {
            this.enable = false;
            this.value = 0;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.value !== undefined) {
                this.value = (0, NumberUtils_1.setRangeValue)(data.value);
            }
        }
    }
    exports.RollLight = RollLight;
});
