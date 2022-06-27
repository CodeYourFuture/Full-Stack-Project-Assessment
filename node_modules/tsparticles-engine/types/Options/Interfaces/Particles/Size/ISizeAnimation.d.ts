import type { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IAnimation } from "../../IAnimation";
import type { StartValueType } from "../../../../Enums/Types/StartValueType";
export interface ISizeAnimation extends IAnimation {
    size_min?: number;
    minimumValue?: number;
    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;
}
