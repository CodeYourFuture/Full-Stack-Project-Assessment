import type { TiltDirection, TiltDirectionAlt } from "../../../../Enums/Directions/TiltDirection";
import type { ITiltAnimation } from "./ITiltAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";
export interface ITilt extends IValueWithRandom {
    animation: ITiltAnimation;
    direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt;
    enable: boolean;
}
