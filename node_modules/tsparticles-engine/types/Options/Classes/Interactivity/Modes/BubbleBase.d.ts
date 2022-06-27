import type { IBubbleBase } from "../../../Interfaces/Interactivity/Modes/IBubbleBase";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare abstract class BubbleBase implements IBubbleBase, IOptionLoader<IBubbleBase> {
    distance: number;
    duration: number;
    mix: boolean;
    opacity?: number;
    size?: number;
    color?: SingleOrMultiple<OptionsColor>;
    constructor();
    load(data?: RecursivePartial<IBubbleBase>): void;
}
