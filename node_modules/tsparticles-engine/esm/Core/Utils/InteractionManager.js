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
var _InteractionManager_engine;
export class InteractionManager {
    constructor(engine, container) {
        this.container = container;
        _InteractionManager_engine.set(this, void 0);
        __classPrivateFieldSet(this, _InteractionManager_engine, engine, "f");
        this.externalInteractors = [];
        this.particleInteractors = [];
        this.init();
    }
    init() {
        const interactors = __classPrivateFieldGet(this, _InteractionManager_engine, "f").plugins.getInteractors(this.container, true);
        this.externalInteractors = [];
        this.particleInteractors = [];
        for (const interactor of interactors) {
            switch (interactor.type) {
                case 0:
                    this.externalInteractors.push(interactor);
                    break;
                case 1:
                    this.particleInteractors.push(interactor);
                    break;
            }
        }
    }
    async externalInteract(delta) {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                await interactor.interact(delta);
            }
        }
    }
    async particlesInteract(particle, delta) {
        for (const interactor of this.externalInteractors) {
            interactor.reset(particle);
        }
        for (const interactor of this.particleInteractors) {
            if (interactor.isEnabled(particle)) {
                await interactor.interact(particle, delta);
            }
        }
    }
    handleClickMode(mode) {
        for (const interactor of this.externalInteractors) {
            if (interactor.handleClickMode) {
                interactor.handleClickMode(mode);
            }
        }
    }
}
_InteractionManager_engine = new WeakMap();
