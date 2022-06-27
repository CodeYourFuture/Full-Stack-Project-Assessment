import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRollLight } from "../../../Interfaces/Particles/Roll/IRollLight";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class RollLight implements IRollLight, IOptionLoader<IRollLight> {
    enable: boolean;
    value: RangeValue;
    constructor();
    load(data?: RecursivePartial<IRollLight>): void;
}
