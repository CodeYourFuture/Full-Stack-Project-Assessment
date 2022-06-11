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
    /**
     * The constructor of the interaction manager
     * @param engine the parent engine
     * @param container the parent container
     */
    constructor(engine, container) {
        this.container = container;
        /**
         * The engine used for registering the interactions managers
         * @private
         */
        _InteractionManager_engine.set(this, void 0);
        __classPrivateFieldSet(this, _InteractionManager_engine, engine, "f");
        this.externalInteractors = [];
        this.particleInteractors = [];
        this.init();
    }
    /**
     * Initializes the interaction manager, loading all the engine registered managers into the container
     */
    init() {
        const interactors = __classPrivateFieldGet(this, _InteractionManager_engine, "f").plugins.getInteractors(this.container, true);
        this.externalInteractors = [];
        this.particleInteractors = [];
        for (const interactor of interactors) {
            switch (interactor.type) {
                case 0 /* External */:
                    this.externalInteractors.push(interactor);
                    break;
                case 1 /* Particles */:
                    this.particleInteractors.push(interactor);
                    break;
            }
        }
    }
    /**
     * Iterates through the external interactivity manager and call the interact method, if they are enabled
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    async externalInteract(delta) {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                await interactor.interact(delta);
            }
        }
    }
    /**
     * Iterates through the particles interactions manager and call the interact method, if they are enabled
     * @param particle the particle responsible for the current interaction
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    async particlesInteract(particle, delta) {
        for (const interactor of this.externalInteractors) {
            interactor.reset(particle);
        }
        /* interaction auto between particles */
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
