import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber";
import { ParticlesDensity } from "./ParticlesDensity";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ParticlesNumber implements IParticlesNumber, IOptionLoader<IParticlesNumber> {
    get max(): number;
    set max(value: number);
    density: ParticlesDensity;
    limit: number;
    value: number;
    constructor();
    load(data?: RecursivePartial<IParticlesNumber>): void;
}
