import { setRangeValue } from "../../../../Utils/NumberUtils";
/**
 * @category Options
 */
export class MoveAngle {
    constructor() {
        this.offset = 0; //45;
        this.value = 90;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = setRangeValue(data.offset);
        }
        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
