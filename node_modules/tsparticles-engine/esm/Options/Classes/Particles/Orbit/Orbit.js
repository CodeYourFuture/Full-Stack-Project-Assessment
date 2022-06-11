import { AnimationOptions } from "../../AnimationOptions";
import { OptionsColor } from "../../OptionsColor";
import { OrbitRotation } from "./OrbitRotation";
import { setRangeValue } from "../../../../Utils/NumberUtils";
export class Orbit {
    constructor() {
        this.animation = new AnimationOptions();
        this.enable = false;
        this.opacity = 1;
        this.rotation = new OrbitRotation();
        this.width = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        this.animation.load(data.animation);
        this.rotation.load(data.rotation);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.opacity !== undefined) {
            this.opacity = setRangeValue(data.opacity);
        }
        if (data.width !== undefined) {
            this.width = setRangeValue(data.width);
        }
        if (data.radius !== undefined) {
            this.radius = setRangeValue(data.radius);
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
    }
}
