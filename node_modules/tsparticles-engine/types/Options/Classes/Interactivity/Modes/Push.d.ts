import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IPush } from "../../../Interfaces/Interactivity/Modes/IPush";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Push implements IPush, IOptionLoader<IPush> {
    get particles_nb(): number;
    set particles_nb(value: number);
    default: boolean;
    groups: string[];
    quantity: number;
    constructor();
    load(data?: RecursivePartial<IPush>): void;
}
