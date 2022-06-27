(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MotionReduce"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Motion = void 0;
    const MotionReduce_1 = require("./MotionReduce");
    class Motion {
        constructor() {
            this.disable = false;
            this.reduce = new MotionReduce_1.MotionReduce();
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.disable !== undefined) {
                this.disable = data.disable;
            }
            this.reduce.load(data.reduce);
        }
    }
    exports.Motion = Motion;
});
