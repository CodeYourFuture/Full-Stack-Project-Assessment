import type { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";
export interface IInteractor {
    type: InteractorType;
    reset(particle: Particle): void;
}
