import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IValueWithRandom } from "../Interfaces/IValueWithRandom";
import { Random } from "./Random";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export declare abstract class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    random: Random;
    value: RangeValue;
    protected constructor();
    load(data?: RecursivePartial<IValueWithRandom>): void;
}
