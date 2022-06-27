(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../OptionsColor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinksShadow = void 0;
    const OptionsColor_1 = require("../../OptionsColor");
    class LinksShadow {
        constructor() {
            this.blur = 5;
            this.color = new OptionsColor_1.OptionsColor();
            this.color.value = "#000";
            this.enable = false;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.blur !== undefined) {
                this.blur = data.blur;
            }
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
    exports.LinksShadow = LinksShadow;
});
