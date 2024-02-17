// @ts-check

/**
 * A position is the fundamental geometry construct.
 *
 * The first two elements are longitude and latitude, or easting and northing,
 * precisely in that order and using decimal numbers.
 *
 * Altitude or elevation MAY be included as an optional third element.
 * @typedef {[number, number, number] | [number, number]} Position
 */

/**
 * A GeoJSON object MAY have a member named "bbox" to include
 * information on the coordinate range for its Geometries, Features, or
 * FeatureCollections.
 *
 * The value of the bbox member MUST be an array of
 * length 2*n where n is the number of dimensions represented in the
 * contained geometries, with all axes of the most southwesterly point
 * followed by all axes of the more northeasterly point.  The axes order
 * of a bbox follows the axes order of geometries.
 * @typedef {[number, number, number, number] | [number, number, number, number, number, number]} BoundingBox
 */

/**
 * A GeoJSON object represents a Geometry, Feature, or collection of
 * Features.
 */
class GeoJSON {
  /**
   * @type {{west: ?number, south: ?number, low: ?number, east: ?number, north: ?number, high: ?number}}
   *
   * A GeoJSON object MAY have a member named "bbox" to include
   * information on the coordinate range for its Geometries, Features, or
   * FeatureCollections
   */
  boundingbox = {
    west: null,
    south: null,
    low: null,
    east: null,
    north: null,
    high: null,
  };

  /**
   * @returns {?BoundingBox} if set
   */
  get bbox() {
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

  toJSON() {
    const json = {
      type: this.constructor.name,
    };

    const bbox = this.bbox;
    bbox !== null && (json.bbox = bbox);

    return json;
  }
}

/**
 * A Geometry object represents points, curves, and surfaces in
 * coordinate space.
 */
class Geometry extends GeoJSON {
  /**
   * @returns {?Position|Position[]|Position[][]} compiled
   */
  get coordinates() {
    return null;
  }

  toJSON() {
    const json = super.toJSON();
    json.coordinates = this.coordinates;
    return json;
  }
}

/**
 * For type "Point", the "coordinates" member is a single position.
 */
export class Point extends Geometry {
  /**
   * @type {number} easting, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -180..180
   */
  #longitude;

  /**
   * @type {number} northing, using the World Geodetic
   *     System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *     of decimal degrees; -90..90
   */
  #latitude;

  /**
   * @type {?number} elevation the height in meters above or below the WGS
   *   84 reference ellipsoid
   */
  elevation;

  /**
   * @param {number} longitude easting, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -180..180
   * @param {number} latitude northing, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -90..90
   * @param {?number} elevation the height in meters above or below the WGS
   *    84 reference ellipsoid
   */
  constructor(longitude, latitude, elevation = null) {
    super();
    /**
     * @type {number} longitude easting, using the World Geodetic
     *     System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *     of decimal degrees; -180..180
     */
    this.longitude = longitude;

    /**
     * @type {number} latitude northing, using the World Geodetic
     *     System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *     of decimal degrees; -90..90
     */
    this.latitude = latitude;
    this.elevation = elevation;
  }

  set longitude(longitude) {
    if (longitude < -180 || longitude > 180) {
      throw RangeError("Longitude needs to be -180..180");
    }
    this.#longitude = longitude;
  }

  get longitude() {
    return this.#longitude;
  }

  set latitude(latitude) {
    if (latitude < -90 || latitude > 90) {
      throw RangeError("Latitude needs to be -90..90");
    }
    this.#latitude = latitude;
  }

  get latitude() {
    return this.#latitude;
  }

  /**
   * @returns {Position} to add
   */
  get coordinates() {
    return this.elevation === null || isNaN(this.elevation)
      ? [this.longitude, this.latitude]
      : [this.longitude, this.latitude, this.elevation];
  }

  toJSON() {
    const json = super.toJSON();
    json.coordinates = this.coordinates;
    return json;
  }
}

/**
 * For type "MultiPoint", the "coordinates" member is an array of
 *  positions.
 */
export class MultiPoint extends Geometry {
  /**
   * @type {Point[]}
   */
  points = [];

  /**
   *
   * @param {Point[]} points to add
   */
  constructor(points) {
    super();
    this.points = points;
  }

  /**
   * @returns {Position[]} compiled
   */
  get coordinates() {
    return this.points.map((p) => p.coordinates);
  }
}

/**
 * For type "LineString", the "coordinates" member is an array of two or
 * more positions.
 */
export class LineString extends MultiPoint {
  type = "LineString";
}

/**
 * For type "MultiLineString", the "coordinates" member is an array of
 * LineString coordinate arrays.
 */
export class MultiLineString extends Geometry {
  /**
   * @type {LineString[]}
   */
  lineStrings = [];

  /**
   *
   * @param {LineString[]} lineStrings to add
   */
  constructor(lineStrings) {
    super();
    this.lineStrings = lineStrings;
  }

  /**
   * @returns {Position[][]} compiled
   */
  get coordinates() {
    return this.lineStrings.map((p) => p.coordinates);
  }

  toJSON() {
    const json = super.toJSON();
    json.coordinates = this.coordinates;
    return json;
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
export class Polygon extends MultiPoint {
  type = "Polygon";
}

/**
 * For type "MultiPolygon", the "coordinates" member is an array of
 * Polygon coordinate arrays.
 */
export class MultiPolygon extends Geometry {
  /** @type {Polygon[]} */
  polygons;

  /**
   *
   * @param {Polygon[]} polygons to add
   */
  constructor(polygons) {
    super();
    this.polygons = polygons;
  }

  /**
   * @returns {Position[][]} compiled
   */
  get coordinates() {
    return this.polygons.map((p) => p.coordinates);
  }
}

/**
 * Unlike the other geometry types described above, a GeometryCollection
 * can be a heterogeneous composition of smaller Geometry objects.
 */
export class GeometryCollection extends GeoJSON {
  /** @type {Geometry[]} */
  geometries;

  /**
   *
   * @param {Geometry[]} geometries to add
   */
  constructor(geometries) {
    super();
    this.geometries = geometries;
  }
}

/**
 * A Feature object represents a spatially bounded thing.
 */
export class Feature extends GeoJSON {
  /** @type {?Geometry|GeometryCollection} */
  geometry = null;

  /**
   * @type {{[key: string]: any}}
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  properties = {};

  /** @type {?string | number} */
  id = null;

  /**
   * @param {?Geometry|GeometryCollection} geometry mandatory
   * @param {{[key: string]: any}} properties optional
   * @param {?string | number} id optional
   */
  constructor(geometry = null, properties = {}, id = null) {
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
   * @param {?string} value if this is `null`, `this.properties[key]` will be deleted.
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  setProperty(key, value) {
    if (value === null) {
      this.properties[key] && delete this.properties[key];
      return;
    }
    this.properties[key] = value;
  }

  /**
   * Set `this.properties.title`
   * @param {?string} title to add to properties
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  set title(title) {
    this.setProperty("title", title);
  }

  /**
   * Set `this.properties.description`
   * @param {?string} description to add to properties
   * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
   */
  set description(description) {
    this.setProperty("description", description);
  }

  toJSON() {
    const json = super.toJSON();

    this.id !== null && (json.id = this.id);
    json.geometry = this.geometry;
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
   * @param {?number} elevation the height in meters above or below the WGS
   *    84 reference ellipsoid
   * @param {?string} title will set `this.properties.title`
   * @param {?string | number} id will set `this.id`
   * @returns {Feature} build from the given parameters
   */
  static createWithPoint(longitude, latitude, elevation = null, title = null, id = null) {
    const feature = new Feature(new Point(longitude, latitude, elevation), {}, id);
    feature.title = title;

    return feature;
  }
}

/**
 * A FeatureCollection contains multiple Feature objects.
 */
export class FeatureCollection extends GeoJSON {
  /** @type {Feature[]} */
  features = [];

  /**
   * @param {Feature[]} features to start with
   */
  constructor(features = []) {
    super();
    this.features = features;
  }

  /**
   * @param {Feature} feature to add
   */
  addFeature(feature) {
    this.features.push(feature);
  }

  toJSON() {
    const json = super.toJSON();
    json.features = this.features;
    return json;
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
};
