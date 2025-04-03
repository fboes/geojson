import { Position } from "./GeoJson";
import { Geometry } from "./Geometry.js";
import { Point } from "./Point.js";
/**
 * For type "MultiPoint", the "coordinates" member is an array of
 *  positions.
 */
export declare class MultiPoint extends Geometry {
  points: Point[];
  constructor(points: Point[]);
  get coordinates(): Position[];
}
//# sourceMappingURL=MultiPoint.d.ts.map
