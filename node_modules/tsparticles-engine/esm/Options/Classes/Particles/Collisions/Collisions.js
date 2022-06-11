import { CollisionsOverlap } from "./CollisionsOverlap";
import { ParticlesBounce } from "../Bounce/ParticlesBounce";
export class Collisions {
    constructor() {
        this.bounce = new ParticlesBounce();
        this.enable = false;
        this.mode = "bounce";
        this.overlap = new CollisionsOverlap();
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
