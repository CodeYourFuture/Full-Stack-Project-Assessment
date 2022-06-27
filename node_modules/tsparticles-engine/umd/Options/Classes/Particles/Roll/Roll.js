(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../OptionsColor", "./RollLight", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Roll = void 0;
    const OptionsColor_1 = require("../../OptionsColor");
    const RollLight_1 = require("./RollLight");
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class Roll {
        constructor() {
            this.darken = new RollLight_1.RollLight();
            this.enable = false;
            this.enlighten = new RollLight_1.RollLight();
            this.mode = "vertical";
            this.speed = 25;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.backColor !== undefined) {
                this.backColor = OptionsColor_1.OptionsColor.create(this.backColor, data.backColor);
            }
            this.darken.load(data.darken);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.enlighten.load(data.enlighten);
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            if (data.speed !== undefined) {
                this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
            }
        }
    }
    exports.Roll = Roll;
});
