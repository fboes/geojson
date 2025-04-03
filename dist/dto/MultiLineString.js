import { Geometry } from "./Geometry.js";
/**
 * For type "MultiLineString", the "coordinates" member is an array of
 * LineString coordinate arrays.
 */
export class MultiLineString extends Geometry {
    constructor(lineStrings) {
        super();
        this.lineStrings = [];
        this.lineStrings = lineStrings;
    }
    get coordinates() {
        return this.lineStrings.map((p) => p.coordinates);
    }
}
