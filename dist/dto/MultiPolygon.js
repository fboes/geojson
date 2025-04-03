import { Geometry } from "./Geometry.js";
/**
 * For type "MultiPolygon", the "coordinates" member is an array of
 * Polygon coordinate arrays.
 */
export class MultiPolygon extends Geometry {
    constructor(polygons) {
        super();
        this.polygons = polygons;
    }
    get coordinates() {
        return this.polygons.map((p) => p.coordinates);
    }
}
