import { Position } from "./GeoJson.js";
import { Geometry } from "./Geometry.js";
import { LineString } from "./LineString.js";

/**
 * For type "MultiLineString", the "coordinates" member is an array of
 * LineString coordinate arrays.
 */
export class MultiLineString extends Geometry {
  lineStrings: LineString[] = [];

  constructor(lineStrings: LineString[]) {
    super();
    this.lineStrings = lineStrings;
  }

  get coordinates(): Position[][] {
    return this.lineStrings.map((p) => p.coordinates);
  }
}
