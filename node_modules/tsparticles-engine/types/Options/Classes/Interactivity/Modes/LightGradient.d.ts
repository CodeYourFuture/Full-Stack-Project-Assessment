import type { ILightGradient } from "../../../Interfaces/Interactivity/Modes/ILightGradient";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class LightGradient implements ILightGradient, IOptionLoader<ILightGradient> {
    start: OptionsColor;
    stop: OptionsColor;
    constructor();
    load(data?: RecursivePartial<ILightGradient>): void;
}
