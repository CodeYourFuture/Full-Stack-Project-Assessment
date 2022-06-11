import { TiltDirection, TiltDirectionAlt } from "../../../../Enums/Directions/TiltDirection";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ITilt } from "../../../Interfaces/Particles/Tilt/ITilt";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { TiltAnimation } from "./TiltAnimation";
import { ValueWithRandom } from "../../ValueWithRandom";
export declare class Tilt extends ValueWithRandom implements ITilt, IOptionLoader<ITilt> {
    animation: TiltAnimation;
    direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<ITilt>): void;
}
