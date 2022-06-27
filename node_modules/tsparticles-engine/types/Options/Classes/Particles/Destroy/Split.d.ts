import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { IParticlesOptions } from "../../../Interfaces/Particles/IParticlesOptions";
import type { ISplit } from "../../../Interfaces/Particles/Destroy/ISplit";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
import { SplitFactor } from "./SplitFactor";
import { SplitRate } from "./SplitRate";
export declare class Split implements ISplit, IOptionLoader<ISplit> {
    count: number;
    factor: SplitFactor;
    rate: SplitRate;
    particles?: RecursivePartial<IParticlesOptions>;
    sizeOffset: boolean;
    constructor();
    load(data?: RecursivePartial<ISplit>): void;
}
