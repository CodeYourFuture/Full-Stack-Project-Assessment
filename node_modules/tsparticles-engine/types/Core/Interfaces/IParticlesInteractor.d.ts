import type { IDelta } from "./IDelta";
import type { IInteractor } from "./IInteractor";
import type { Particle } from "../Particle";
export interface IParticlesInteractor extends IInteractor {
    isEnabled(particle: Particle): boolean;
    interact(particle: Particle, delta: IDelta): Promise<void>;
}
