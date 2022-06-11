import { ClickMode } from "../../Enums/Modes/ClickMode";
import type { Container } from "../Container";
import type { Engine } from "../../engine";
import { IDelta } from "../Interfaces/IDelta";
import type { Particle } from "../Particle";
export declare class InteractionManager {
    #private;
    private readonly container;
    private externalInteractors;
    private particleInteractors;
    constructor(engine: Engine, container: Container);
    init(): void;
    externalInteract(delta: IDelta): Promise<void>;
    particlesInteract(particle: Particle, delta: IDelta): Promise<void>;
    handleClickMode(mode: ClickMode | string): void;
}
