import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ITwinkle } from "../../../Interfaces/Particles/Twinkle/ITwinkle";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { TwinkleValues } from "./TwinkleValues";
export declare class Twinkle implements ITwinkle, IOptionLoader<ITwinkle> {
    lines: TwinkleValues;
    particles: TwinkleValues;
    constructor();
    load(data?: RecursivePartial<ITwinkle>): void;
}
