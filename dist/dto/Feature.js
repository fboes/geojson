import { GeoJSON } from "./GeoJson.js";
import { Point } from "./Point.js";
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
