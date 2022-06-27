/**
 * External Interactivity manager, base abstract class
 */
export class ExternalInteractorBase {
    /**
     * Constructor of external interactivity manager
     * @param container the parent container
     * @protected
     */
    constructor(container) {
        this.container = container;
        /**
         * External Interactivity type
         */
        this.type = 0 /* External */;
    }
}
