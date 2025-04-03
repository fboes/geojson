import { Position } from "./GeoJson.js";
import { Geometry } from "./Geometry.js";
import { Polygon } from "./Polygon.js";
/**
 * For type "MultiPolygon", the "coordinates" member is an array of
 * Polygon coordinate arrays.
 */
export declare class MultiPolygon extends Geometry {
  polygons: Polygon[];
  constructor(polygons: Polygon[]);
  get coordinates(): Position[][];
}
//# sourceMappingURL=MultiPolygon.d.ts.map
