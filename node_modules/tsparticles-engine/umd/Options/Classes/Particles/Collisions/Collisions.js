(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./CollisionsOverlap", "../Bounce/ParticlesBounce"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collisions = void 0;
    const CollisionsOverlap_1 = require("./CollisionsOverlap");
    const ParticlesBounce_1 = require("../Bounce/ParticlesBounce");
    class Collisions {
        constructor() {
            this.bounce = new ParticlesBounce_1.ParticlesBounce();
            this.enable = false;
            this.mode = "bounce";
            this.overlap = new CollisionsOverlap_1.CollisionsOverlap();
        }
        load(data) {
            if (!data) {
                return;
            }
            this.bounce.load(data.bounce);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            this.overlap.load(data.overlap);
        }
    }
    exports.Collisions = Collisions;
});
