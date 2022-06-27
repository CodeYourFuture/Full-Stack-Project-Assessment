import { AnimationOptions } from "../../AnimationOptions";
import { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { StartValueType } from "../../../../Enums/Types/StartValueType";
export declare class SizeAnimation extends AnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    get size_min(): number | undefined;
    set size_min(value: number | undefined);
    destroy: DestroyType | keyof typeof DestroyType;
    minimumValue?: number;
    startValue: StartValueType | keyof typeof StartValueType;
    constructor();
    load(data?: RecursivePartial<ISizeAnimation>): void;
}
