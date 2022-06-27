import type { ICoordinates, IRangedCoordinates } from "./ICoordinates";
import type { IDimension } from "./IDimension";
export interface IPositionFromSizeParams {
    size: IDimension;
    position?: Partial<ICoordinates>;
}
export interface IRangedPositionFromSizeParams {
    size: IDimension;
    position?: Partial<IRangedCoordinates>;
}
