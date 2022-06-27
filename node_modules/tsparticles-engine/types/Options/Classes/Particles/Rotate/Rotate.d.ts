import { RotateDirection, RotateDirectionAlt } from "../../../../Enums/Directions/RotateDirection";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRotate } from "../../../Interfaces/Particles/Rotate/IRotate";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { RotateAnimation } from "./RotateAnimation";
import { ValueWithRandom } from "../../ValueWithRandom";
export declare class Rotate extends ValueWithRandom implements IRotate, IOptionLoader<IRotate> {
    animation: RotateAnimation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    path: boolean;
    constructor();
    load(data?: RecursivePartial<IRotate>): void;
}
