"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwinkleValues = void 0;
const OptionsColor_1 = require("../../OptionsColor");
const NumberUtils_1 = require("../../../../Utils/NumberUtils");
class TwinkleValues {
    constructor() {
        this.enable = false;
        this.frequency = 0.05;
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = (0, NumberUtils_1.setRangeValue)(data.opacity);
        }
    }
}
exports.TwinkleValues = TwinkleValues;
