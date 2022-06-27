import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IParticlesOptions } from "./Particles/IParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export interface IManualParticle {
    position?: ICoordinates;
    options?: RecursivePartial<IParticlesOptions>;
}
