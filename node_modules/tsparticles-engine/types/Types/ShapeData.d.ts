import type { IShapeValues } from "../Core/Interfaces/IShapeValues";
import type { SingleOrMultiple } from "./SingleOrMultiple";
export declare type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>;
};
