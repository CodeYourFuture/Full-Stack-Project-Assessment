import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ITiltAnimation } from "../../../Interfaces/Particles/Tilt/ITiltAnimation";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class TiltAnimation implements ITiltAnimation, IOptionLoader<ITiltAnimation> {
    enable: boolean;
    speed: RangeValue;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<ITiltAnimation>): void;
}
