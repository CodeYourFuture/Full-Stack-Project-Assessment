import { AnimationOptions } from "../../AnimationOptions";
import { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IOpacityAnimation } from "../../../Interfaces/Particles/Opacity/IOpacityAnimation";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { StartValueType } from "../../../../Enums/Types/StartValueType";
export declare class OpacityAnimation extends AnimationOptions implements IOpacityAnimation, IOptionLoader<IOpacityAnimation> {
    get opacity_min(): number | undefined;
    set opacity_min(value: number | undefined);
    minimumValue?: number;
    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;
    constructor();
    load(data?: RecursivePartial<IOpacityAnimation>): void;
}
