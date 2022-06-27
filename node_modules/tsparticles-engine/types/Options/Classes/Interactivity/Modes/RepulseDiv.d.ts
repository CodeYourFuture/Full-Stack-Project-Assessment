import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRepulseDiv } from "../../../Interfaces/Interactivity/Modes/IRepulseDiv";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { RepulseBase } from "./RepulseBase";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare class RepulseDiv extends RepulseBase implements IRepulseDiv, IOptionLoader<IRepulseDiv> {
    get ids(): SingleOrMultiple<string>;
    set ids(value: SingleOrMultiple<string>);
    selectors: SingleOrMultiple<string>;
    constructor();
    load(data?: RecursivePartial<IRepulseDiv>): void;
}
