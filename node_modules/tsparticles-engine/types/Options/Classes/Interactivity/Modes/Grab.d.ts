import { GrabLinks } from "./GrabLinks";
import type { IGrab } from "../../../Interfaces/Interactivity/Modes/IGrab";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Grab implements IGrab, IOptionLoader<IGrab> {
    get line_linked(): GrabLinks;
    set line_linked(value: GrabLinks);
    get lineLinked(): GrabLinks;
    set lineLinked(value: GrabLinks);
    distance: number;
    links: GrabLinks;
    constructor();
    load(data?: RecursivePartial<IGrab>): void;
}
