import type { ILinks } from "../../../Interfaces/Particles/Links/ILinks";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { LinksShadow } from "./LinksShadow";
import { LinksTriangle } from "./LinksTriangle";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Links implements ILinks, IOptionLoader<ILinks> {
    blink: boolean;
    color: OptionsColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    frequency: number;
    id?: string;
    opacity: number;
    shadow: LinksShadow;
    triangles: LinksTriangle;
    width: number;
    warp: boolean;
    constructor();
    load(data?: RecursivePartial<ILinks>): void;
}
