import { Geometry } from "./Geometry.js";
/**
 * For type "MultiPoint", the "coordinates" member is an array of
 *  positions.
 */
export class MultiPoint extends Geometry {
    constructor(points) {
        super();
        this.points = [];
        this.points = points;
    }
    get coordinates() {
        return this.points.map((p) => p.coordinates);
    }
}
