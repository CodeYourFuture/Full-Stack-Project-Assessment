import type { IAnimatable } from "../../IAnimatable";
import type { IAnimation } from "../../IAnimation";
import type { IColor } from "../../../../Core/Interfaces/Colors";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RangeValue } from "../../../../Types/RangeValue";
export interface IOrbit extends IAnimatable<IAnimation> {
    color?: string | IColor;
    enable: boolean;
    radius?: RangeValue;
    rotation: IValueWithRandom;
    opacity: RangeValue;
    width: RangeValue;
}
