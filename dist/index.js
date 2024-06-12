/**
 * A GeoJSON object represents a Geometry, Feature, or collection of
 * Features.
 */
class GeoJSON {
    constructor() {
        /**
         *
         *
         * A GeoJSON object MAY have a member named "bbox" to include
         * information on the coordinate range for its Geometries, Features, or
         * FeatureCollections
         */
        this.boundingbox = {
            west: null,
            south: null,
            low: null,
            east: null,
            north: null,
            high: null,
        };
    }
    get bbox() {
        if (this.boundingbox.west === null ||
            this.boundingbox.south === null ||
            this.boundingbox.east === null ||
            this.boundingbox.north === null) {
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
    get coordinates() {
        return [0, 0];
    }
    toJSON() {
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
     * @param {number} longitude easting, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -180..180
     * @param {number} latitude northing, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -90..90
     * @param {number|null} elevation the height in meters above or below the WGS
     *    84 reference ellipsoid
     */
    constructor(longitude, latitude, elevation = null) {
        super();
        /**
         * elevation the height in meters above or below the WGS
         *   84 reference ellipsoid
         */
        this.elevation = null;
        this.longitude = longitude;
        this.latitude = latitude;
        this.elevation = elevation;
    }
    set longitude(longitude) {
        if (longitude < -180 || longitude > 180) {
            throw RangeError("Longitude needs to be -180..180");
        }
        this._longitude = longitude;
    }
    get longitude() {
        return this._longitude;
    }
    set latitude(latitude) {
        if (latitude < -90 || latitude > 90) {
            throw RangeError("Latitude needs to be -90..90");
        }
        this._latitude = latitude;
    }
    get latitude() {
        return this._latitude;
    }
    get coordinates() {
        return this.elevation === null || isNaN(this.elevation)
            ? [this.longitude, this.latitude]
            : [this.longitude, this.latitude, this.elevation];
    }
    /**
     *
     * @param {Point} otherPoint to get bearing to
     * @returns {Vector} from `this` to `otherPoint`
     */
    getVectorTo(otherPoint) {
        const lat1 = (this.latitude / 180) * Math.PI;
        const lon1 = (this.longitude / 180) * Math.PI;
        const lat2 = (otherPoint.latitude / 180) * Math.PI;
        const lon2 = (otherPoint.longitude / 180) * Math.PI;
        const dLon = lon2 - lon1;
        const dLat = lat2 - lat1;
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const meters = 6371000 * c;
        return new Vector(meters, bearing);
    }
    /**
     *
     * @param {Vector} vector from `this` to result.
     * @returns {Point} `this` moved by `vector`
     */
    getPointBy(vector) {
        const d = vector.meters;
        const brng = (((vector.bearing + 360) % 360) / 180) * Math.PI;
        const lat1 = (this.latitude / 180) * Math.PI;
        const lon1 = (this.longitude / 180) * Math.PI;
        const R = 6371000;
        const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng));
        const lon2 = lon1 +
            Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2));
        return new Point((lon2 * 180) / Math.PI, (lat2 * 180) / Math.PI, this.elevation);
    }
}
/**
 * For type "MultiPoint", the "coordinates" member is an array of
 *  positions.
 */
export class MultiPoint extends Geometry {
    constructor(points) {
        super();
        this.points = [];
        this.points = points;
    }
    get coordinates() {
        return this.points.map((p) => p.coordinates);
    }
}
/**
 * For type "LineString", the "coordinates" member is an array of two or
 * more positions.
 */
export class LineString extends MultiPoint {
}
/**
 * For type "MultiLineString", the "coordinates" member is an array of
 * LineString coordinate arrays.
 */
export class MultiLineString extends Geometry {
    constructor(lineStrings) {
        super();
        this.lineStrings = [];
        this.lineStrings = lineStrings;
    }
    get coordinates() {
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
export class Polygon extends MultiPoint {
}
/**
 * For type "MultiPolygon", the "coordinates" member is an array of
 * Polygon coordinate arrays.
 */
export class MultiPolygon extends Geometry {
    constructor(polygons) {
        super();
        this.polygons = polygons;
    }
    get coordinates() {
        return this.polygons.map((p) => p.coordinates);
    }
}
/**
 * Unlike the other geometry types described above, a GeometryCollection
 * can be a heterogeneous composition of smaller Geometry objects.
 */
export class GeometryCollection extends GeoJSON {
    constructor(geometries) {
        super();
        this.geometries = geometries;
    }
}
/**
 * A Feature object represents a spatially bounded thing.
 */
export class Feature extends GeoJSON {
    /**
     * @param {Geometry | GeometryCollection | null} geometry mandatory
     * @param {Properties} properties optional
     * @param {string | number | null} id optional
     */
    constructor(geometry = null, properties = {}, id = null) {
        super();
        this.geometry = null;
        /**
         * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
         */
        this.properties = {};
        this.id = null;
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
    setProperty(key, value) {
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
    set title(title) {
        this.setProperty("title", title);
    }
    /**
     * Set `this.properties.description`
     * @see https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md
     */
    set description(description) {
        this.setProperty("description", description);
    }
    toJSON() {
        const json = {
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
    constructor(features = []) {
        super();
        this.features = [];
        this.features = features;
    }
    addFeature(feature) {
        this.features.push(feature);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            features: this.features,
        };
    }
}
/**
 * Distance and bearing between two `Point`
 */
export class Vector {
    /**
     *
     * @param {number} meters distance between `Point` A & B
     * @param {number} bearing from `Point` A to B. 0..360
     */
    constructor(meters, bearing) {
        this.meters = meters;
        this.bearing = bearing;
    }
    /**
     * @returns {number} from `Point` A to B. 0..360
     */
    get bearing() {
        return this._bearing;
    }
    /**
     * @param {number} bearing from `Point` A to B. 0..360
     */
    set bearing(bearing) {
        this._bearing = (bearing + 360) % 360;
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
