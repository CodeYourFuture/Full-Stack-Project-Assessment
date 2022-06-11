import { IColor } from "../../../Core/Interfaces/Colors";
import { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
export interface IShadow {
    blur: number;
    color: string | IColor;
    enable: boolean;
    offset: ICoordinates;
}
