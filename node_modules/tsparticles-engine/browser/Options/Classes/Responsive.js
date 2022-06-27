import { deepExtend } from "../../Utils/Utils";
export class Responsive {
    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = "canvas" /* canvas */;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }
        if (data.mode !== undefined) {
            // not enforcing an error here as this should largely be an opt-in setting
            if (data.mode === "screen" /* screen */) {
                this.mode = "screen" /* screen */;
            }
            else {
                this.mode = "canvas" /* canvas */;
            }
        }
        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options);
        }
    }
}
