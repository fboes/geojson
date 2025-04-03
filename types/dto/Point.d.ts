import { Position } from "./GeoJson.js";
import { Geometry } from "./Geometry.js";
import { Vector } from "./Vector.js";
/**
 * For type "Point", the "coordinates" member is a single position.
 */
export declare class Point extends Geometry {
  /**
   *easting, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -180..180
   */
  protected _longitude: number;
  /**
   * northing, using the World Geodetic
   *     System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *     of decimal degrees; -90..90
   */
  protected _latitude: number;
  /**
   * elevation the height in meters above or below the WGS
   *   84 reference ellipsoid
   */
  elevation: number | null;
  /**
   * @param {number} longitude easting, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -180..180
   * @param {number} latitude northing, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -90..90
   * @param {number|null} elevation the height in meters above or below the WGS
   *    84 reference ellipsoid
   */
  constructor(longitude: number, latitude: number, elevation?: number | null);
  set longitude(longitude: number);
  get longitude(): number;
  set latitude(latitude: number);
  get latitude(): number;
  get coordinates(): Position;
  /**
   *
   * @param {Point} otherPoint to get bearing to
   * @returns {Vector} from `this` to `otherPoint`
   */
  getVectorTo(otherPoint: Point): Vector;
  /**
   *
   * @param {Vector} vector from `this` to result.
   * @returns {Point} `this` moved by `vector`
   */
  getPointBy(vector: Vector): Point;
}
//# sourceMappingURL=Point.d.ts.map
