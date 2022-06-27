"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destroy = void 0;
const Split_1 = require("./Split");
class Destroy {
    constructor() {
        this.mode = "none";
        this.split = new Split_1.Split();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.split.load(data.split);
    }
}
exports.Destroy = Destroy;
