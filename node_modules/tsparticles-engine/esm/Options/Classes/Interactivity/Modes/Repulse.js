import { RepulseBase } from "./RepulseBase";
import { RepulseDiv } from "./RepulseDiv";
export class Repulse extends RepulseBase {
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new RepulseDiv();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new RepulseDiv();
            }
            this.divs.load(data.divs);
        }
    }
}
