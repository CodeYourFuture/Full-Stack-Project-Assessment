import type { ILinksShadow } from "../../../Interfaces/Particles/Links/ILinksShadow";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class LinksShadow implements ILinksShadow, IOptionLoader<ILinksShadow> {
    blur: number;
    color: OptionsColor;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<ILinksShadow>): void;
}
