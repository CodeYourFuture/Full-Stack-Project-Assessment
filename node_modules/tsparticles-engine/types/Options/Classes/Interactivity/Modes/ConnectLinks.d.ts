import type { IConnectLinks } from "../../../Interfaces/Interactivity/Modes/IConnectLinks";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ConnectLinks implements IConnectLinks, IOptionLoader<IConnectLinks> {
    opacity: number;
    constructor();
    load(data?: RecursivePartial<IConnectLinks>): void;
}
