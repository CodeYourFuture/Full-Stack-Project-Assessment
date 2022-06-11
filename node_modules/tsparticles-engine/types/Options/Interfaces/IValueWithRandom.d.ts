import type { IRandom } from "./IRandom";
import type { RangeValue } from "../../Types/RangeValue";
export interface IValueWithRandom {
    random: boolean | IRandom;
    value: RangeValue;
}
