import type { IMotion } from "../../Interfaces/Motion/IMotion";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { MotionReduce } from "./MotionReduce";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Motion implements IMotion, IOptionLoader<IMotion> {
    disable: boolean;
    reduce: MotionReduce;
    constructor();
    load(data?: RecursivePartial<IMotion>): void;
}
