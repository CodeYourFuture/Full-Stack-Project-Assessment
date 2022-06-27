import type { IMoveTrail } from "../../../Interfaces/Particles/Move/IMoveTrail";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class MoveTrail implements IMoveTrail, IOptionLoader<IMoveTrail> {
    enable: boolean;
    length: number;
    fillColor: OptionsColor;
    constructor();
    load(data?: RecursivePartial<IMoveTrail>): void;
}
