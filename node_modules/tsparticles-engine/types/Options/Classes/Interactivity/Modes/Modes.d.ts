import { Attract } from "./Attract";
import { Bounce } from "./Bounce";
import { Bubble } from "./Bubble";
import { Connect } from "./Connect";
import { Grab } from "./Grab";
import type { IModes } from "../../../Interfaces/Interactivity/Modes/IModes";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { Light } from "./Light";
import { Push } from "./Push";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { Remove } from "./Remove";
import { Repulse } from "./Repulse";
import { Slow } from "./Slow";
import { Trail } from "./Trail";
export declare class Modes implements IModes, IOptionLoader<IModes> {
    attract: Attract;
    bounce: Bounce;
    bubble: Bubble;
    connect: Connect;
    grab: Grab;
    light: Light;
    push: Push;
    remove: Remove;
    repulse: Repulse;
    slow: Slow;
    trail: Trail;
    constructor();
    load(data?: RecursivePartial<IModes>): void;
}
