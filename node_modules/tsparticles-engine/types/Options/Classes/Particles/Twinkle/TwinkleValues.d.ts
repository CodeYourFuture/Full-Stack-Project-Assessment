import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ITwinkleValues } from "../../../Interfaces/Particles/Twinkle/ITwinkleValues";
import { OptionsColor } from "../../OptionsColor";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class TwinkleValues implements ITwinkleValues, IOptionLoader<ITwinkleValues> {
    color?: OptionsColor;
    enable: boolean;
    frequency: number;
    opacity: RangeValue;
    constructor();
    load(data?: RecursivePartial<ITwinkleValues>): void;
}
