import type { IMovePath } from "../../../../Interfaces/Particles/Move/Path/IMovePath";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";
import { MovePathDelay } from "./MovePathDelay";
import { PathOptions } from "../../../../../Types/PathOptions";
import { RecursivePartial } from "../../../../../Types/RecursivePartial";
export declare class MovePath implements IMovePath, IOptionLoader<IMovePath> {
    clamp: boolean;
    delay: MovePathDelay;
    enable: boolean;
    options: PathOptions;
    generator?: string;
    constructor();
    load(data?: RecursivePartial<IMovePath>): void;
}
