import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor";
import { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";
export declare abstract class ParticlesInteractorBase implements IParticlesInteractor {
    protected readonly container: Container;
    protected constructor(container: Container);
    type: InteractorType;
    abstract interact(particle: Particle, delta: IDelta): Promise<void>;
    abstract isEnabled(particle: Particle): boolean;
    abstract reset(particle: Particle): void;
}
