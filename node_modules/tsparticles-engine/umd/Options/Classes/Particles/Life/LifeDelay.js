(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ValueWithRandom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LifeDelay = void 0;
    const ValueWithRandom_1 = require("../../ValueWithRandom");
    class LifeDelay extends ValueWithRandom_1.ValueWithRandom {
        constructor() {
            super();
            this.sync = false;
        }
        load(data) {
            if (!data) {
                return;
            }
            super.load(data);
            if (data.sync !== undefined) {
                this.sync = data.sync;
            }
        }
    }
    exports.LifeDelay = LifeDelay;
});
