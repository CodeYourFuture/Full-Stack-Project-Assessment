(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RepulseBase", "./RepulseDiv"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Repulse = void 0;
    const RepulseBase_1 = require("./RepulseBase");
    const RepulseDiv_1 = require("./RepulseDiv");
    class Repulse extends RepulseBase_1.RepulseBase {
        load(data) {
            super.load(data);
            if (!data) {
                return;
            }
            if (data.divs instanceof Array) {
                this.divs = data.divs.map((s) => {
                    const tmp = new RepulseDiv_1.RepulseDiv();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.divs instanceof Array || !this.divs) {
                    this.divs = new RepulseDiv_1.RepulseDiv();
                }
                this.divs.load(data.divs);
            }
        }
    }
    exports.Repulse = Repulse;
});
