import { Circle } from "./Circle";
import { CircleWarp } from "./CircleWarp";
import { Rectangle } from "./Rectangle";
import { getDistance } from "../../Utils/NumberUtils";
/**
 * @category Utils
 */
export class QuadTree {
    /**
     * Initializes the instance with a rectangle and a capacity
     * @param rectangle the instance rectangle area
     * @param capacity the points capacity
     */
    constructor(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    /**
     * Inserts the given point in the instance, or to its subtrees
     * @param point the point to insert
     * @returns true if the point is added to the instance or one of its subtrees, false if it's not
     */
    insert(point) {
        var _a, _b, _c, _d, _e;
        if (!this.rectangle.contains(point.position)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        if (!this.divided) {
            this.subdivide();
        }
        return ((_e = (((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) ||
            ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) ||
            ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) ||
            ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point)))) !== null && _e !== void 0 ? _e : false);
    }
    /**
     * Queries the instance using a [[Circle]] object, with the given position and the given radius
     * @param position the circle position
     * @param radius the circle radius
     * @returns the particles inside the given circle
     */
    queryCircle(position, radius) {
        return this.query(new Circle(position.x, position.y, radius));
    }
    /**
     * Queries the instance using a [[CircleWarp]] object, with the given position and the given radius
     * @param position the circle position
     * @param radius the circle radius
     * @param containerOrSize the container canvas size
     * @returns the particles inside the given circle
     */
    queryCircleWarp(position, radius, containerOrSize) {
        const container = containerOrSize, size = containerOrSize;
        return this.query(new CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size));
    }
    /**
     * Queries the instance using a [[Rectangle]] object, with the given position and the given size
     * @param position the rectangle position
     * @param size the rectangle size
     * @returns the particles inside the given rectangle
     */
    queryRectangle(position, size) {
        return this.query(new Rectangle(position.x, position.y, size.width, size.height));
    }
    /**
     * Queries the instance using a [[Rectangle]] object, with the given position and the given size
     * @param range the range to use for querying the tree
     * @param found found particles array, output parameter
     * @returns the particles inside the given range
     */
    query(range, found) {
        var _a, _b, _c, _d;
        const res = found !== null && found !== void 0 ? found : [];
        if (!range.intersects(this.rectangle)) {
            return [];
        }
        for (const p of this.points) {
            if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius()) {
                continue;
            }
            res.push(p.particle);
        }
        if (this.divided) {
            (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
            (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
            (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
            (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
        }
        return res;
    }
    /**
     * Creates the subtrees, making the instance a branch
     */
    subdivide() {
        const x = this.rectangle.position.x, y = this.rectangle.position.y, w = this.rectangle.size.width, h = this.rectangle.size.height, capacity = this.capacity;
        this.northEast = new QuadTree(new Rectangle(x, y, w / 2, h / 2), capacity);
        this.northWest = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
        this.southEast = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
        this.southWest = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
        this.divided = true;
    }
}
