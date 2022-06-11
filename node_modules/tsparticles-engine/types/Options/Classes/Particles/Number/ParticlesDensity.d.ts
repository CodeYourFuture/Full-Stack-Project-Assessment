import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesDensity } from "../../../Interfaces/Particles/Number/IParticlesDensity";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ParticlesDensity implements IParticlesDensity, IOptionLoader<IParticlesDensity> {
    get value_area(): number;
    set value_area(value: number);
    area: number;
    enable: boolean;
    factor: number;
    constructor();
    load(data?: RecursivePartial<IParticlesDensity>): void;
}
