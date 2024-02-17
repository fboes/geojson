/**
 * For type "Point", the "coordinates" member is a single position.
 */
export class Point extends Geometry {
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
    constructor(longitude: number, latitude: number, elevation?: number | null);
    /**
     * @type {?number} elevation the height in meters above or below the WGS
     *   84 reference ellipsoid
     */
    elevation: number | null;
    set longitude(longitude: number);
    get longitude(): number;
    set latitude(latitude: number);
    get latitude(): number;
    /**
     * @returns {Position} to add
     */
    get coordinates(): Position;
    #private;
}
/**
 * For type "MultiPoint", the "coordinates" member is an array of
 *  positions.
 */
export class MultiPoint extends Geometry {
    /**
     *
     * @param {Point[]} points to add
     */
    constructor(points: Point[]);
    /**
     * @type {Point[]}
     */
    points: Point[];
    /**
     * @returns {Position[]} compiled
     */
    get coordinates(): Position[];
}
/**
 * For type "LineString", the "coordinates" member is an array of two or
 * more positions.
 */
export class LineString extends MultiPoint {
    type: string;
}
/**
 * For type "MultiLineString", the "coordinates" member is an array of
 * LineString coordinate arrays.
 */
export class MultiLineString extends Geometry {
    /**
     *
     * @param {LineString[]} lineStrings to add
     */
    constructor(lineStrings: LineString[]);
    /**
     * @type {LineString[]}
     */
    lineStrings: LineString[];
    /**
     * @returns {Position[][]} compiled
     */
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
export class Polygon extends MultiPoint {
    type: string;
}
/**
 * For type "MultiPolygon", the "coordinates" member is an array of
 * Polygon coordinate arrays.
 */
export class MultiPolygon extends Geometry {
    /**
     *
     * @param {Polygon[]} polygons to add
     */
    constructor(polygons: Polygon[]);
    /** @type {Polygon[]} */
    polygons: Polygon[];
    /**
     * @returns {Position[][]} compiled
     */
    get coordinates(): Position[][];
}
/**
 * Unlike the other geometry types described above, a GeometryCollection
 * can be a heterogeneous composition of smaller Geometry objects.
 */
export class GeometryCollection extends GeoJSON {
    /**
     *
     * @param {Geometry[]} geometries to add
     */
    constructor(geometries: Geometry[]);
    /** @type {Geometry[]} */
    geometries: Geometry[];
}
/**
 * A Feature object represents a spatially bounded thing.
 */
export class Feature extends GeoJSON {
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
    static createWithPoint(longitude: number, latitude: number, elevation?: number | null, title?: string | null, id?: (string | number) | null): Feature;
    /**
     * @param {?Geometry|GeometryCollection} geometry mandatory
     * @param {{[key: string]: any}} properties optional
     * @param {?string | number} id optional
     */
    constructor(geometry?: (Geometry | GeometryCollection) | null, properties?: {
        [key: string]: any;
    }, id?: (string | number) | null);
    /** @type {?Geometry|GeometryCollection} */
    geometry: (Geometry | GeometryCollection) | null;
    /**
     * @type {{[key: string]: any}}
     * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
     */
    properties: {
        [key: string]: any;
    };
    /** @type {?string | number} */
    id: (string | number) | null;
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
    setProperty(key: string, value: string | null): void;
    /**
     * Set `this.properties.title`
     * @param {?string} title to add to properties
     * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
     */
    set title(title: string);
    /**
     * Set `this.properties.description`
     * @param {?string} description to add to properties
     * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
     */
    set description(description: string);
}
/**
 * A FeatureCollection contains multiple Feature objects.
 */
export class FeatureCollection extends GeoJSON {
    /**
     * @param {Feature[]} features to start with
     */
    constructor(features?: Feature[]);
    /** @type {Feature[]} */
    features: Feature[];
    /**
     * @param {Feature} feature to add
     */
    addFeature(feature: Feature): void;
}
declare namespace _default {
    export { Point };
    export { MultiPoint };
    export { LineString };
    export { MultiLineString };
    export { Polygon };
    export { MultiPolygon };
    export { GeometryCollection };
    export { Feature };
    export { FeatureCollection };
}
export default _default;
/**
 * A position is the fundamental geometry construct.
 *
 * The first two elements are longitude and latitude, or easting and northing,
 * precisely in that order and using decimal numbers.
 *
 * Altitude or elevation MAY be included as an optional third element.
 */
export type Position = [number, number, number] | [number, number];
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
 */
export type BoundingBox = [number, number, number, number] | [number, number, number, number, number, number];
/**
 * A Geometry object represents points, curves, and surfaces in
 * coordinate space.
 */
declare class Geometry extends GeoJSON {
    /**
     * @returns {?Position|Position[]|Position[][]} compiled
     */
    get coordinates(): Position | Position[] | Position[][];
}
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
declare class GeoJSON {
    /**
     * @type {{west: ?number, south: ?number, low: ?number, east: ?number, north: ?number, high: ?number}}
     *
     * A GeoJSON object MAY have a member named "bbox" to include
     * information on the coordinate range for its Geometries, Features, or
     * FeatureCollections
     */
    boundingbox: {
        west: number | null;
        south: number | null;
        low: number | null;
        east: number | null;
        north: number | null;
        high: number | null;
    };
    /**
     * @returns {?BoundingBox} if set
     */
    get bbox(): BoundingBox;
    toJSON(): {
        type: string;
    };
}
