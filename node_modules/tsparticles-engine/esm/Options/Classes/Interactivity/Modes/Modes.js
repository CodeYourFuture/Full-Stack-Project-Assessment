import { Attract } from "./Attract";
import { Bounce } from "./Bounce";
import { Bubble } from "./Bubble";
import { Connect } from "./Connect";
import { Grab } from "./Grab";
import { Light } from "./Light";
import { Push } from "./Push";
import { Remove } from "./Remove";
import { Repulse } from "./Repulse";
import { Slow } from "./Slow";
import { Trail } from "./Trail";
export class Modes {
    constructor() {
        this.attract = new Attract();
        this.bounce = new Bounce();
        this.bubble = new Bubble();
        this.connect = new Connect();
        this.grab = new Grab();
        this.light = new Light();
        this.push = new Push();
        this.remove = new Remove();
        this.repulse = new Repulse();
        this.slow = new Slow();
        this.trail = new Trail();
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
