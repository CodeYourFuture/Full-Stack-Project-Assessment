import type { CustomEventArgs } from "../Types/CustomEventArgs";
import type { CustomEventListener } from "../Types/CustomEventListener";
export declare class EventDispatcher {
    #private;
    constructor();
    addEventListener(type: string, listener: CustomEventListener): void;
    removeEventListener(type: string, listener: CustomEventListener): void;
    removeAllEventListeners(type?: string): void;
    dispatchEvent(type: string, args: CustomEventArgs): void;
    hasEventListener(type: string): boolean;
}
