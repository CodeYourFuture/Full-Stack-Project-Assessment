import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IMoveAttract } from "../../../Interfaces/Particles/Move/IMoveAttract";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class MoveAttract implements IMoveAttract, IOptionLoader<IMoveAttract> {
    get rotateX(): number;
    set rotateX(value: number);
    get rotateY(): number;
    set rotateY(value: number);
    distance: RangeValue;
    enable: boolean;
    rotate: ICoordinates;
    constructor();
    load(data?: RecursivePartial<IMoveAttract>): void;
}
