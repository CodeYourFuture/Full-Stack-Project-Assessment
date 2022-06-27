import type { IParticlesDensity } from "./IParticlesDensity";
export interface IParticlesNumber {
    max: number;
    density: IParticlesDensity;
    limit: number;
    value: number;
}
