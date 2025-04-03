import { Position } from "./GeoJson.js";
import { Geometry } from "./Geometry.js";
import { Polygon } from "./Polygon.js";

/**
 * For type "MultiPolygon", the "coordinates" member is an array of
 * Polygon coordinate arrays.
 */
export class MultiPolygon extends Geometry {
  polygons: Polygon[];

  constructor(polygons: Polygon[]) {
    super();
    this.polygons = polygons;
  }

  get coordinates(): Position[][] {
    return this.polygons.map((p) => p.coordinates);
  }
}
