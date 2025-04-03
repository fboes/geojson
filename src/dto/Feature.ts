import { GeoJSON, GeoJsonJson } from "./GeoJson.js";
import { Geometry } from "./Geometry.js";
import { GeometryCollection } from "./GeometryCollection.js";
import { Point } from "./Point.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Properties = { [k: string]: any };

export type FeatureJson = GeoJsonJson & {
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
