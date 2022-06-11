import type { DivMode } from "../../../../Enums/Modes/DivMode";
import type { DivType } from "../../../../Enums/Types/DivType";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export interface IDivEvent {
    enable: boolean;
    mode: SingleOrMultiple<DivMode | keyof typeof DivMode | string>;
    el: SingleOrMultiple<string>;
    elementId: SingleOrMultiple<string>;
    ids: SingleOrMultiple<string>;
    selectors: SingleOrMultiple<string>;
    type: DivType;
}
