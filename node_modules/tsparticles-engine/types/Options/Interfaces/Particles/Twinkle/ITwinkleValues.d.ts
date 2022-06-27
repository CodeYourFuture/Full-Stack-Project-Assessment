import type { IColor } from "../../../../Core/Interfaces/Colors";
import type { RangeValue } from "../../../../Types/RangeValue";
export interface ITwinkleValues {
    color?: string | IColor;
    enable: boolean;
    frequency: number;
    opacity: RangeValue;
}
