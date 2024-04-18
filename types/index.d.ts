/**
 * A position is the fundamental geometry construct.
 *
 * The first two elements are longitude and latitude, or easting and northing,
 * precisely in that order and using decimal numbers.
 *
 * Altitude or elevation MAY be included as an optional third element.
 */
type Position = [number, number, number] | [number, number];
/**
 * A GeoJSON object MAY have a member named "bbox" to include
 * information on the coordinate range for its Geometries, Features, or
 * FeatureCollections.
 *
 * The value of the bbox member MUST be an array of
 * length 2*n where n is the number of dimensions represented in the
 * contained geometries, with all axes of the most southwesterly point
 * followed by all axes of the more northeasterly point. The axes order
 * of a bbox follows the axes order of geometries.
 */
type BoundingBox = [number, number, number, number] | [number, number, number, number, number, number];
type AbstractBoundingBox = {
  west: number | null;
  south: number | null;
  low: number | null;
  east: number | null;
  north: number | null;
  high: number | null;
};
type GeoJsonJson = {
  type: string;
  bbox?: BoundingBox;
};
/**
 * A GeoJSON object represents a Geometry, Feature, or collection of
 * Features.
 */
declare class GeoJSON {
  /**
   *
   *
   * A GeoJSON object MAY have a member named "bbox" to include
   * information on the coordinate range for its Geometries, Features, or
   * FeatureCollections
   */
  boundingbox: AbstractBoundingBox;
  get bbox(): BoundingBox | null;
  toJSON(): GeoJsonJson;
}
type GeometryJson = GeoJsonJson & {
  coordinates: Position | Position[] | Position[][];
};
/**
 * A Geometry object represents points, curves, and surfaces in
 * coordinate space.
 */
declare class Geometry extends GeoJSON {
  get coordinates(): Position | Position[] | Position[][];
  toJSON(): GeometryJson;
}
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
   * @returns {number} in Nautical miles
   */
  getVectorTo(otherPoint: Point): Vector;
  getPointBy(vector: Vector): Point;
}
/**
 * For type "MultiPoint", the "coordinates" member is an array of
 *  positions.
 */
export declare class MultiPoint extends Geometry {
  points: Point[];
  constructor(points: Point[]);
  get coordinates(): Position[];
}
/**
 * For type "LineString", the "coordinates" member is an array of two or
 * more positions.
 */
export declare class LineString extends MultiPoint {}
/**
 * For type "MultiLineString", the "coordinates" member is an array of
 * LineString coordinate arrays.
 */
export declare class MultiLineString extends Geometry {
  lineStrings: LineString[];
  constructor(lineStrings: LineString[]);
  get coordinates(): Position[][];
}
/**
 * To specify a constraint specific to Polygons, it is useful to
 * introduce the concept of a linear ring.
 *
 * The first and last positions are equivalent, and they MUST contain
 * identical values; their representation SHOULD also be identical.
 *
 * A linear ring MUST follow the right-hand rule with respect to the
 * area it bounds, i.e., exterior rings are counterclockwise, and
 * holes are clockwise.
 */
export declare class Polygon extends MultiPoint {}
/**
 * For type "MultiPolygon", the "coordinates" member is an array of
 * Polygon coordinate arrays.
 */
export declare class MultiPolygon extends Geometry {
  polygons: Polygon[];
  constructor(polygons: Polygon[]);
  get coordinates(): Position[][];
}
/**
 * Unlike the other geometry types described above, a GeometryCollection
 * can be a heterogeneous composition of smaller Geometry objects.
 */
export declare class GeometryCollection extends GeoJSON {
  geometries: Geometry[];
  constructor(geometries: Geometry[]);
}
type Properties = {
  [k: string]: any;
};
type FeatureJson = GeoJsonJson & {
  geometry: Geometry | GeometryCollection | null;
  properties?: Properties;
  id?: string | number;
};
/**
 * A Feature object represents a spatially bounded thing.
 */
export declare class Feature extends GeoJSON {
  geometry: Geometry | GeometryCollection | null;
  /**
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  properties: Properties;
  id: string | number | null;
  /**
   * @param {Geometry | GeometryCollection | null} geometry mandatory
   * @param {Properties} properties optional
   * @param {string | number | null} id optional
   */
  constructor(geometry?: Geometry | GeometryCollection | null, properties?: Properties, id?: string | number | null);
  /**
   * Set `this.properties[key]`.
   * @param {string} key Key of `this.properties[key]`. For `simplestyle-spec`:
   *
   *  | Key             | Value                     |
   *  | --------------- | ------------------------- |
   *  | `title`         |                           |
   *  | `description`   |                           |
   *  | `marker-symbol` | Icon-ID, an integer, a lowercase character |
   *  | `marker-color`  | hex color                 |
   *  | `stroke`        | hex color for LineStrings |
   *  | `fill`          | hex color for Polygons    |
   * @param {any} value if this is `null`, `this.properties[key]` will be deleted.
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  setProperty(key: string, value: any): void;
  /**
   * Set `this.properties.title`
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  set title(title: string | null);
  /**
   * Set `this.properties.description`
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  set description(description: string | null);
  toJSON(): FeatureJson;
  /**
   * Create a `Feature` which has a `Point` geometry as a shortcut.
   * @param {number} longitude easting, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -180..180
   * @param {number} latitude northing, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -90..90
   * @param {number | null} elevation the height in meters above or below the WGS
   *    84 reference ellipsoid
   * @param {string | null } title will set `this.properties.title`
   * @param {string | number | null} id will set `this.id`
   * @returns {Feature} build from the given parameters
   */
  static createWithPoint(
    longitude: number,
    latitude: number,
    elevation?: number | null,
    title?: string | null,
    id?: string | number | null,
  ): Feature;
}
type FeatureCollectionJson = GeoJsonJson & {
  features: Feature[];
};
/**
 * A FeatureCollection contains multiple Feature objects.
 */
export declare class FeatureCollection extends GeoJSON {
  features: Feature[];
  constructor(features?: Feature[]);
  addFeature(feature: Feature): void;
  toJSON(): FeatureCollectionJson;
}
export declare class Vector {
  meters: number;
  protected _bearing: number;
  constructor(meters: number, bearing: number);
  /**
   * @returns {number} 0..360
   */
  get bearing(): number;
  /**
   * @param {number} bearing 0..360
   */
  set bearing(bearing: number);
}
declare const _default: {
  Point: typeof Point;
  MultiPoint: typeof MultiPoint;
  LineString: typeof LineString;
  MultiLineString: typeof MultiLineString;
  Polygon: typeof Polygon;
  MultiPolygon: typeof MultiPolygon;
  GeometryCollection: typeof GeometryCollection;
  Feature: typeof Feature;
  FeatureCollection: typeof FeatureCollection;
  Vector: typeof Vector;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
