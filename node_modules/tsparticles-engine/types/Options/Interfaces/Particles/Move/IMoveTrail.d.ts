import type { IColor } from "../../../../Core/Interfaces/Colors";
export interface IMoveTrail {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
