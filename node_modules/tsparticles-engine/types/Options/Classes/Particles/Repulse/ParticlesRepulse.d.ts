import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesRepulse } from "../../../Interfaces/Particles/Repulse/IParticlesRepulse";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../ValueWithRandom";
export declare class ParticlesRepulse extends ValueWithRandom implements IParticlesRepulse, IOptionLoader<IParticlesRepulse> {
    enabled: boolean;
    distance: RangeValue;
    duration: RangeValue;
    factor: RangeValue;
    speed: RangeValue;
    constructor();
    load(data?: RecursivePartial<IParticlesRepulse>): void;
}
