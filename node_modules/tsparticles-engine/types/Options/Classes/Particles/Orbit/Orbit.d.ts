import { AnimationOptions } from "../../AnimationOptions";
import type { IAnimatable } from "../../../Interfaces/IAnimatable";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IOrbit } from "../../../Interfaces/Particles/Orbit/IOrbit";
import { OptionsColor } from "../../OptionsColor";
import { OrbitRotation } from "./OrbitRotation";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Orbit implements IOrbit, IOptionLoader<IOrbit>, IAnimatable<AnimationOptions> {
    animation: AnimationOptions;
    enable: boolean;
    opacity: RangeValue;
    width: RangeValue;
    color?: OptionsColor;
    radius?: RangeValue;
    rotation: OrbitRotation;
    constructor();
    load(data?: RecursivePartial<IOrbit>): void;
}
