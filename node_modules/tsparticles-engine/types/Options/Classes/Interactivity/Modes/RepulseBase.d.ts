import { EasingType } from "../../../../Enums/Types/EasingType";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRepulseBase } from "../../../Interfaces/Interactivity/Modes/IRepulseBase";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare abstract class RepulseBase implements IRepulseBase, IOptionLoader<IRepulseBase> {
    distance: number;
    duration: number;
    easing: EasingType;
    factor: number;
    maxSpeed: number;
    speed: number;
    constructor();
    load(data?: RecursivePartial<IRepulseBase>): void;
}
