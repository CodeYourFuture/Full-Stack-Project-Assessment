import { CollisionMode } from "../../../../Enums/Modes/CollisionMode";
import { CollisionsOverlap } from "./CollisionsOverlap";
import type { ICollisions } from "../../../Interfaces/Particles/Collisions/ICollisions";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ParticlesBounce } from "../Bounce/ParticlesBounce";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    bounce: ParticlesBounce;
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap: CollisionsOverlap;
    constructor();
    load(data?: RecursivePartial<ICollisions>): void;
}
