import { setRangeValue } from "../../../../Utils/NumberUtils";
/**
 * @category Options
 */
export class TiltAnimation {
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
            this.speed = setRangeValue(data.speed);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
