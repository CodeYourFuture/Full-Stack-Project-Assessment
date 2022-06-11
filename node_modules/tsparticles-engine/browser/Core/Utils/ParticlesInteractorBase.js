/**
 * Particles interactions manager, base abstract class
 */
export class ParticlesInteractorBase {
    /**
     * The particles interactions manager constructor
     * @param container the parent container
     * @protected
     */
    constructor(container) {
        this.container = container;
        /**
         * Particles interactions type
         */
        this.type = 1 /* Particles */;
    }
}
