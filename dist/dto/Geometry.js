import { GeoJSON } from "./GeoJson.js";
/**
 * A Geometry object represents points, curves, and surfaces in
 * coordinate space.
 */
export class Geometry extends GeoJSON {
    get coordinates() {
        return [0, 0];
    }
    toJSON() {
        return {
            ...super.toJSON(),
            coordinates: this.coordinates,
        };
    }
}
