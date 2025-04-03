import { Position } from "./GeoJson.js";
import { Geometry } from "./Geometry.js";
import { LineString } from "./LineString.js";
/**
 * For type "MultiLineString", the "coordinates" member is an array of
 * LineString coordinate arrays.
 */
export declare class MultiLineString extends Geometry {
  lineStrings: LineString[];
  constructor(lineStrings: LineString[]);
  get coordinates(): Position[][];
}
//# sourceMappingURL=MultiLineString.d.ts.map
