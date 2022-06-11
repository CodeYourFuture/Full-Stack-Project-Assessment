import { Circle } from "./Circle";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IDimension } from "../Interfaces/IDimension";
import { Range } from "./Range";
export declare class CircleWarp extends Circle {
    private readonly canvasSize;
    constructor(x: number, y: number, radius: number, canvasSize: IDimension);
    contains(point: ICoordinates): boolean;
    intersects(range: Range): boolean;
}
