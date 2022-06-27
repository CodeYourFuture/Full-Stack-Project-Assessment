import type { ILife } from "../../../Interfaces/Particles/Life/ILife";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { LifeDelay } from "./LifeDelay";
import { LifeDuration } from "./LifeDuration";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Life implements ILife, IOptionLoader<ILife> {
    count: number;
    delay: LifeDelay;
    duration: LifeDuration;
    constructor();
    load(data?: RecursivePartial<ILife>): void;
}
