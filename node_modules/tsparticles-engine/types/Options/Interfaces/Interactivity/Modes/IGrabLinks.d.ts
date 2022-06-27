import type { IColor } from "../../../../Core/Interfaces/Colors";
export interface IGrabLinks {
    blink: boolean;
    color?: IColor | string;
    consent: boolean;
    opacity: number;
}
