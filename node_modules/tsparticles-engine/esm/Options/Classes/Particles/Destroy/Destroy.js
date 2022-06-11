import { Split } from "./Split";
export class Destroy {
    constructor() {
        this.mode = "none";
        this.split = new Split();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.split.load(data.split);
    }
}
