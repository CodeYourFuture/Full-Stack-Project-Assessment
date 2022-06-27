(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./BubbleBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BubbleDiv = void 0;
    const BubbleBase_1 = require("./BubbleBase");
    class BubbleDiv extends BubbleBase_1.BubbleBase {
        constructor() {
            super();
            this.selectors = [];
        }
        get ids() {
            return this.selectors instanceof Array
                ? this.selectors.map((t) => t.replace("#", ""))
                : this.selectors.replace("#", "");
        }
        set ids(value) {
            this.selectors = value instanceof Array ? value.map((t) => `#${t}`) : `#${value}`;
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
    exports.BubbleDiv = BubbleDiv;
});
