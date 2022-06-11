import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRoll } from "../../../Interfaces/Particles/Roll/IRoll";
import { OptionsColor } from "../../OptionsColor";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { RollLight } from "./RollLight";
import { RollMode } from "../../../../Enums/Modes/RollMode";
export declare class Roll implements IRoll, IOptionLoader<IRoll> {
    backColor?: OptionsColor;
    darken: RollLight;
    enable: boolean;
    enlighten: RollLight;
    mode: RollMode | keyof typeof RollMode;
    speed: RangeValue;
    constructor();
    load(data?: RecursivePartial<IRoll>): void;
}
