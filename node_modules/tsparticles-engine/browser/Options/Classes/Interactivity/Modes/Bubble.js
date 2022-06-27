import { BubbleBase } from "./BubbleBase";
import { BubbleDiv } from "./BubbleDiv";
/**
 * @category Options
 */
export class Bubble extends BubbleBase {
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new BubbleDiv();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new BubbleDiv();
            }
            this.divs.load(data.divs);
        }
    }
}
