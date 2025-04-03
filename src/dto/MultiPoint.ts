import { Position } from "./GeoJson";
import { Geometry } from "./Geometry.js";
import { Point } from "./Point.js";

/**
 * For type "MultiPoint", the "coordinates" member is an array of
 *  positions.
 */
export class MultiPoint extends Geometry {
  points: Point[] = [];

  constructor(points: Point[]) {
    super();
    this.points = points;
  }

  get coordinates(): Position[] {
    return this.points.map((p) => p.coordinates);
  }
}
