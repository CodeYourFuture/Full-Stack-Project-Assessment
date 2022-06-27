"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiltAnimation = void 0;
const NumberUtils_1 = require("../../../../Utils/NumberUtils");
class TiltAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.TiltAnimation = TiltAnimation;
