import { DivMode } from "../../../../Enums/Modes/DivMode";
import { DivType } from "../../../../Enums/Types/DivType";
import type { IDivEvent } from "../../../Interfaces/Interactivity/Events/IDivEvent";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare class DivEvent implements IDivEvent, IOptionLoader<IDivEvent> {
    get elementId(): SingleOrMultiple<string>;
    set elementId(value: SingleOrMultiple<string>);
    get el(): SingleOrMultiple<string>;
    set el(value: SingleOrMultiple<string>);
    get ids(): SingleOrMultiple<string>;
    set ids(value: SingleOrMultiple<string>);
    selectors: SingleOrMultiple<string>;
    enable: boolean;
    mode: SingleOrMultiple<DivMode | keyof typeof DivMode | string>;
    type: DivType;
    constructor();
    load(data?: RecursivePartial<IDivEvent>): void;
}
