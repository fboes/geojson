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
class GeoJSON {
  /**
   *
   *
   * A GeoJSON object MAY have a member named "bbox" to include
   * information on the coordinate range for its Geometries, Features, or
   * FeatureCollections
   */
  boundingbox: AbstractBoundingBox = {
    west: null,
    south: null,
    low: null,
    east: null,
    north: null,
    high: null,
  };

  get bbox(): BoundingBox | null {
    if (
      this.boundingbox.west === null ||
      this.boundingbox.south === null ||
      this.boundingbox.east === null ||
      this.boundingbox.north === null
    ) {
      return null;
    }

    return this.boundingbox.low === null || this.boundingbox.high === null
      ? [this.boundingbox.west, this.boundingbox.south, this.boundingbox.east, this.boundingbox.north]
      : [
          this.boundingbox.west,
          this.boundingbox.south,
          this.boundingbox.low,
          this.boundingbox.east,
          this.boundingbox.north,
          this.boundingbox.high,
        ];
  }

  toJSON(): GeoJsonJson {
    const json: GeoJsonJson = {
      type: this.constructor.name,
    };

    const bbox = this.bbox;
    bbox !== null && (json.bbox = bbox);

    return json;
  }
}

type GeometryJson = GeoJsonJson & {
  coordinates: Position | Position[] | Position[][];
};

/**
 * A Geometry object represents points, curves, and surfaces in
 * coordinate space.
 */
class Geometry extends GeoJSON {
  get coordinates(): Position | Position[] | Position[][] {
    return [0, 0];
  }

  toJSON(): GeometryJson {
    return {
      ...super.toJSON(),
      coordinates: this.coordinates,
    };
  }
}

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
   * @returns {number} in Nautical miles
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

/**
 * For type "LineString", the "coordinates" member is an array of two or
 * more positions.
 */
export class LineString extends MultiPoint {}

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
export class Polygon extends MultiPoint {}

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

/**
 * Unlike the other geometry types described above, a GeometryCollection
 * can be a heterogeneous composition of smaller Geometry objects.
 */
export class GeometryCollection extends GeoJSON {
  geometries: Geometry[];

  constructor(geometries: Geometry[]) {
    super();
    this.geometries = geometries;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Properties = { [k: string]: any };

type FeatureJson = GeoJsonJson & {
  geometry: Geometry | GeometryCollection | null;
  properties?: Properties;
  id?: string | number;
};

/**
 * A Feature object represents a spatially bounded thing.
 */
export class Feature extends GeoJSON {
  geometry: Geometry | GeometryCollection | null = null;

  /**
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  properties: Properties = {};

  id: string | number | null = null;

  /**
   * @param {Geometry | GeometryCollection | null} geometry mandatory
   * @param {Properties} properties optional
   * @param {string | number | null} id optional
   */
  constructor(
    geometry: Geometry | GeometryCollection | null = null,
    properties: Properties = {},
    id: string | number | null = null,
  ) {
    super();
    this.geometry = geometry;
    this.properties = properties;
    this.id = id;
  }

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProperty(key: string, value: any) {
    if (value === null) {
      this.properties[key] && delete this.properties[key];
      return;
    }
    this.properties[key] = value;
  }

  /**
   * Set `this.properties.title`
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  set title(title: string | null) {
    this.setProperty("title", title);
  }

  /**
   * Set `this.properties.description`
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  set description(description: string | null) {
    this.setProperty("description", description);
  }

  toJSON(): FeatureJson {
    const json: FeatureJson = {
      ...super.toJSON(),
      geometry: this.geometry,
    };
    this.id !== null && (json.id = this.id);
    Object.keys(this.properties).length > 0 && (json.properties = this.properties);

    return json;
  }

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
    elevation: number | null = null,
    title: string | null = null,
    id: string | number | null = null,
  ): Feature {
    const feature = new Feature(new Point(longitude, latitude, elevation), {}, id);
    feature.title = title;

    return feature;
  }
}

type FeatureCollectionJson = GeoJsonJson & {
  features: Feature[];
};

/**
 * A FeatureCollection contains multiple Feature objects.
 */
export class FeatureCollection extends GeoJSON {
  features: Feature[] = [];

  constructor(features: Feature[] = []) {
    super();
    this.features = features;
  }

  addFeature(feature: Feature) {
    this.features.push(feature);
  }

  toJSON(): FeatureCollectionJson {
    return {
      ...super.toJSON(),
      features: this.features,
    };
  }
}

export class Vector {
  meters: number;
  protected _bearing!: number;

  constructor(meters: number, bearing: number) {
    this.meters = meters;
    this.bearing = bearing;
  }

  /**
   * @returns {number} 0..360
   */
  get bearing(): number {
    return this._bearing;
  }

  /**
   * @param {number} bearing 0..360
   */
  set bearing(bearing: number) {
    this._bearing = bearing % 360;
  }
}

export default {
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon,
  GeometryCollection,
  Feature,
  FeatureCollection,
  Vector,
};
