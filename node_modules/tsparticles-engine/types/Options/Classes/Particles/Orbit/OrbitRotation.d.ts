import type { IValueWithRandom } from "../../../Interfaces/IValueWithRandom";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../ValueWithRandom";
export declare class OrbitRotation extends ValueWithRandom {
    constructor();
    load(data?: RecursivePartial<IValueWithRandom>): void;
}
