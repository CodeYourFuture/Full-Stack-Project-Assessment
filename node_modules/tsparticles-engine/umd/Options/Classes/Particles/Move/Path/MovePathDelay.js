(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../ValueWithRandom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MovePathDelay = void 0;
    const ValueWithRandom_1 = require("../../../ValueWithRandom");
    class MovePathDelay extends ValueWithRandom_1.ValueWithRandom {
        constructor() {
            super();
        }
    }
    exports.MovePathDelay = MovePathDelay;
});
