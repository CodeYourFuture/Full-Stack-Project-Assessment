import type { IAnimation } from "../Interfaces/IAnimation";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export declare class AnimationOptions implements IAnimation, IOptionLoader<IAnimation> {
    count: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<IAnimation>): void;
}
