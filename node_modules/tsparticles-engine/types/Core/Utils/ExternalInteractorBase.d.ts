import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor";
import { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";
export declare abstract class ExternalInteractorBase implements IExternalInteractor {
    protected readonly container: Container;
    protected constructor(container: Container);
    type: InteractorType;
    abstract interact(delta: IDelta): Promise<void>;
    abstract isEnabled(): boolean;
    abstract reset(particle: Particle): void;
}
