/**
 * @category Utils
 */
export class Range {
    /**
     * Range constructor, initializes the position
     * @param x X coordinate of the position
     * @param y Y coordinate of the position
     * @protected
     */
    constructor(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }
}
