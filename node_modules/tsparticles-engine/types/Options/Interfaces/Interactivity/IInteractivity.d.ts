import type { IEvents } from "./Events/IEvents";
import type { IModes } from "./Modes/IModes";
import type { InteractivityDetect } from "../../../Enums/InteractivityDetect";
export interface IInteractivity {
    detect_on: InteractivityDetect | keyof typeof InteractivityDetect;
    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;
    events: IEvents;
    modes: IModes;
}
