import type { DestroyMode } from "../../../../Enums/Modes/DestroyMode";
import type { ISplit } from "./ISplit";
export interface IDestroy {
    mode: DestroyMode;
    split: ISplit;
}
