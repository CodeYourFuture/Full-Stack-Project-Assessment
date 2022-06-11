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
    exports.MotionReduce = void 0;
    class MotionReduce {
        constructor() {
            this.factor = 4;
            this.value = true;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.factor !== undefined) {
                this.factor = data.factor;
            }
            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
    exports.MotionReduce = MotionReduce;
});
