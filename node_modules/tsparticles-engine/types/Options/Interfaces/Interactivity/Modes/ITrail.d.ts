import type { IParticlesOptions } from "../../Particles/IParticlesOptions";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export interface ITrail {
    delay: number;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    quantity: number;
}
