(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MoveAngle", "./MoveAttract", "./MoveGravity", "./Path/MovePath", "./MoveTrail", "./OutModes", "./Spin", "../../../../Utils/Utils", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Move = void 0;
    const MoveAngle_1 = require("./MoveAngle");
    const MoveAttract_1 = require("./MoveAttract");
    const MoveGravity_1 = require("./MoveGravity");
    const MovePath_1 = require("./Path/MovePath");
    const MoveTrail_1 = require("./MoveTrail");
    const OutModes_1 = require("./OutModes");
    const Spin_1 = require("./Spin");
    const Utils_1 = require("../../../../Utils/Utils");
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class Move {
        constructor() {
            this.angle = new MoveAngle_1.MoveAngle();
            this.attract = new MoveAttract_1.MoveAttract();
            this.center = {
                x: 50,
                y: 50,
                radius: 0,
            };
            this.decay = 0;
            this.distance = {};
            this.direction = "none";
            this.drift = 0;
            this.enable = false;
            this.gravity = new MoveGravity_1.MoveGravity();
            this.path = new MovePath_1.MovePath();
            this.outModes = new OutModes_1.OutModes();
            this.random = false;
            this.size = false;
            this.speed = 2;
            this.spin = new Spin_1.Spin();
            this.straight = false;
            this.trail = new MoveTrail_1.MoveTrail();
            this.vibrate = false;
            this.warp = false;
        }
        get collisions() {
            return false;
        }
        set collisions(value) {
        }
        get bounce() {
            return this.collisions;
        }
        set bounce(value) {
            this.collisions = value;
        }
        get out_mode() {
            return this.outMode;
        }
        set out_mode(value) {
            this.outMode = value;
        }
        get outMode() {
            return this.outModes.default;
        }
        set outMode(value) {
            this.outModes.default = value;
        }
        get noise() {
            return this.path;
        }
        set noise(value) {
            this.path = value;
        }
        load(data) {
            var _a, _b, _c;
            if (!data) {
                return;
            }
            if (data.angle !== undefined) {
                if (typeof data.angle === "number") {
                    this.angle.value = data.angle;
                }
                else {
                    this.angle.load(data.angle);
                }
            }
            this.attract.load(data.attract);
            this.center = (0, Utils_1.deepExtend)(this.center, data.center);
            if (data.decay !== undefined) {
                this.decay = data.decay;
            }
            if (data.direction !== undefined) {
                this.direction = data.direction;
            }
            if (data.distance !== undefined) {
                this.distance =
                    typeof data.distance === "number"
                        ? {
                            horizontal: data.distance,
                            vertical: data.distance,
                        }
                        : (0, Utils_1.deepExtend)({}, data.distance);
            }
            if (data.drift !== undefined) {
                this.drift = (0, NumberUtils_1.setRangeValue)(data.drift);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.gravity.load(data.gravity);
            const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;
            if (data.outModes !== undefined || outMode !== undefined) {
                if (typeof data.outModes === "string" || (data.outModes === undefined && outMode !== undefined)) {
                    this.outModes.load({
                        default: (_b = data.outModes) !== null && _b !== void 0 ? _b : outMode,
                    });
                }
                else {
                    this.outModes.load(data.outModes);
                }
            }
            this.path.load((_c = data.path) !== null && _c !== void 0 ? _c : data.noise);
            if (data.random !== undefined) {
                this.random = data.random;
            }
            if (data.size !== undefined) {
                this.size = data.size;
            }
            if (data.speed !== undefined) {
                this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
            }
            this.spin.load(data.spin);
            if (data.straight !== undefined) {
                this.straight = data.straight;
            }
            this.trail.load(data.trail);
            if (data.vibrate !== undefined) {
                this.vibrate = data.vibrate;
            }
            if (data.warp !== undefined) {
                this.warp = data.warp;
            }
        }
    }
    exports.Move = Move;
});
