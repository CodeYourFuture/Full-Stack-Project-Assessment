var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventDispatcher_listeners;
export class EventDispatcher {
    constructor() {
        _EventDispatcher_listeners.set(this, void 0);
        __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
    }
    addEventListener(type, listener) {
        var _a;
        this.removeEventListener(type, listener);
        if (!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) {
            __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").set(type, []);
        }
        (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.push(listener);
    }
    removeEventListener(type, listener) {
        const arr = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
        if (!arr) {
            return;
        }
        const length = arr.length, idx = arr.indexOf(listener);
        if (idx < 0) {
            return;
        }
        if (length === 1) {
            __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
        }
        else {
            arr.splice(idx, 1);
        }
    }
    removeAllEventListeners(type) {
        if (!type) {
            __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
        }
        else {
            __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
        }
    }
    dispatchEvent(type, args) {
        var _a;
        (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => handler(args));
    }
    hasEventListener(type) {
        return !!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
    }
}
_EventDispatcher_listeners = new WeakMap();
