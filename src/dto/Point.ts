import { Position } from "./GeoJson.js";
import { Geometry } from "./Geometry.js";
import { Vector } from "./Vector.js";

/**
 * For type "Point", the "coordinates" member is a single position.
 */
export class Point extends Geometry {
  /**
   *easting, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -180..180
   */
  protected _longitude!: number;

  /**
   * northing, using the World Geodetic
   *     System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *     of decimal degrees; -90..90
   */
  protected _latitude!: number;

  /**
   * elevation the height in meters above or below the WGS
   *   84 reference ellipsoid
   */
  elevation: number | null = null;

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
  constructor(longitude: number, latitude: number, elevation: number | null = null) {
    super();
    this.longitude = longitude;
    this.latitude = latitude;
    this.elevation = elevation;
  }

  set longitude(longitude: number) {
    if (longitude < -180 || longitude > 180) {
      throw RangeError("Longitude needs to be -180..180");
    }
    this._longitude = longitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  set latitude(latitude: number) {
    if (latitude < -90 || latitude > 90) {
      throw RangeError("Latitude needs to be -90..90");
    }
    this._latitude = latitude;
  }

  get latitude(): number {
    return this._latitude;
  }

  get coordinates(): Position {
    return this.elevation === null || isNaN(this.elevation)
      ? [this.longitude, this.latitude]
      : [this.longitude, this.latitude, this.elevation];
  }

  /**
   *
   * @param {Point} otherPoint to get bearing to
   * @returns {Vector} from `this` to `otherPoint`
   */
  getVectorTo(otherPoint: Point): Vector {
    const lat1 = (this.latitude / 180) * Math.PI;
    const lon1 = (this.longitude / 180) * Math.PI;
    const lat2 = (otherPoint.latitude / 180) * Math.PI;
    const lon2 = (otherPoint.longitude / 180) * Math.PI;

    const dLon = lon2 - lon1;
    const dLat = lat2 - lat1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const meters = 6_371_000 * c;

    return new Vector(meters, bearing);
  }

  /**
   *
   * @param {Vector} vector from `this` to result.
   * @returns {Point} `this` moved by `vector`
   */
  getPointBy(vector: Vector): Point {
    const d = vector.meters;
    const brng = (((vector.bearing + 360) % 360) / 180) * Math.PI;
    const lat1 = (this.latitude / 180) * Math.PI;
    const lon1 = (this.longitude / 180) * Math.PI;
    const R = 6_371_000;

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng));
    const lon2 =
      lon1 +
      Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2));

    return new Point((lon2 * 180) / Math.PI, (lat2 * 180) / Math.PI, this.elevation);
  }
}
