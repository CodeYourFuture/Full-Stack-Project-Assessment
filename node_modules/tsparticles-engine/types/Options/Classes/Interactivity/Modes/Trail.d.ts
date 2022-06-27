import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesOptions } from "../../../Interfaces/Particles/IParticlesOptions";
import type { ITrail } from "../../../Interfaces/Interactivity/Modes/ITrail";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Trail implements ITrail, IOptionLoader<ITrail> {
    delay: number;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    quantity: number;
    constructor();
    load(data?: RecursivePartial<ITrail>): void;
}
