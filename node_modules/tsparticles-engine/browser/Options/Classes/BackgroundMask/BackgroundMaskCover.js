import { OptionsColor } from "../OptionsColor";
/**
 * @category Options
 */
export class BackgroundMaskCover {
    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#fff";
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
