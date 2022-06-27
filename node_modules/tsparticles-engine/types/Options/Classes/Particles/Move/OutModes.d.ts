import { OutMode, OutModeAlt } from "../../../../Enums/Modes/OutMode";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IOutModes } from "../../../Interfaces/Particles/Move/IOutModes";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class OutModes implements IOutModes, IOptionLoader<IOutModes> {
    bottom?: OutMode | keyof typeof OutMode | OutModeAlt;
    default: OutMode | keyof typeof OutMode | OutModeAlt;
    left?: OutMode | keyof typeof OutMode | OutModeAlt;
    right?: OutMode | keyof typeof OutMode | OutModeAlt;
    top?: OutMode | keyof typeof OutMode | OutModeAlt;
    constructor();
    load(data?: RecursivePartial<IOutModes>): void;
}
