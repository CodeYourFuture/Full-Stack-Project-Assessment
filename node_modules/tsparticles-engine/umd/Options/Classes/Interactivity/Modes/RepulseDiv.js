(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RepulseBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RepulseDiv = void 0;
    const RepulseBase_1 = require("./RepulseBase");
    class RepulseDiv extends RepulseBase_1.RepulseBase {
        constructor() {
            super();
            this.selectors = [];
        }
        get ids() {
            if (this.selectors instanceof Array) {
                return this.selectors.map((t) => t.replace("#", ""));
            }
            else {
                return this.selectors.replace("#", "");
            }
        }
        set ids(value) {
            if (value instanceof Array) {
                this.selectors = value.map(() => `#${value}`);
            }
            else {
                this.selectors = `#${value}`;
            }
        }
        load(data) {
            super.load(data);
            if (!data) {
                return;
            }
            if (data.ids !== undefined) {
                this.ids = data.ids;
            }
            if (data.selectors !== undefined) {
                this.selectors = data.selectors;
            }
        }
    }
    exports.RepulseDiv = RepulseDiv;
});
