import type { ILinksTriangle } from "../../../Interfaces/Particles/Links/ILinksTriangle";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class LinksTriangle implements ILinksTriangle, IOptionLoader<ILinksTriangle> {
    color?: OptionsColor;
    enable: boolean;
    frequency: number;
    opacity?: number;
    constructor();
    load(data?: RecursivePartial<ILinksTriangle>): void;
}
