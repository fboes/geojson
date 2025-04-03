import { GeoJSON } from "./GeoJson.js";
/**
 * Unlike the other geometry types described above, a GeometryCollection
 * can be a heterogeneous composition of smaller Geometry objects.
 */
export class GeometryCollection extends GeoJSON {
    constructor(geometries) {
        super();
        this.geometries = geometries;
    }
}
