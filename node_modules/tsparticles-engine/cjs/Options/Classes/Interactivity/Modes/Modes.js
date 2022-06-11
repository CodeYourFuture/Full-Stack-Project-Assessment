"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modes = void 0;
const Attract_1 = require("./Attract");
const Bounce_1 = require("./Bounce");
const Bubble_1 = require("./Bubble");
const Connect_1 = require("./Connect");
const Grab_1 = require("./Grab");
const Light_1 = require("./Light");
const Push_1 = require("./Push");
const Remove_1 = require("./Remove");
const Repulse_1 = require("./Repulse");
const Slow_1 = require("./Slow");
const Trail_1 = require("./Trail");
class Modes {
    constructor() {
        this.attract = new Attract_1.Attract();
        this.bounce = new Bounce_1.Bounce();
        this.bubble = new Bubble_1.Bubble();
        this.connect = new Connect_1.Connect();
        this.grab = new Grab_1.Grab();
        this.light = new Light_1.Light();
        this.push = new Push_1.Push();
        this.remove = new Remove_1.Remove();
        this.repulse = new Repulse_1.Repulse();
        this.slow = new Slow_1.Slow();
        this.trail = new Trail_1.Trail();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.attract.load(data.attract);
        this.bubble.load(data.bubble);
        this.connect.load(data.connect);
        this.grab.load(data.grab);
        this.light.load(data.light);
        this.push.load(data.push);
        this.remove.load(data.remove);
        this.repulse.load(data.repulse);
        this.slow.load(data.slow);
        this.trail.load(data.trail);
    }
}
exports.Modes = Modes;
