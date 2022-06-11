import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IWobble } from "../../../Interfaces/Particles/Wobble/IWobble";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Wobble implements IWobble, IOptionLoader<IWobble> {
    distance: RangeValue;
    enable: boolean;
    speed: RangeValue;
    constructor();
    load(data?: RecursivePartial<IWobble>): void;
}
