import { EasingType } from "../../../../Enums/Types/EasingType";
import type { IAttract } from "../../../Interfaces/Interactivity/Modes/IAttract";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Attract implements IAttract, IOptionLoader<IAttract> {
    distance: number;
    duration: number;
    easing: EasingType;
    factor: number;
    maxSpeed: number;
    speed: number;
    constructor();
    load(data?: RecursivePartial<IAttract>): void;
}
