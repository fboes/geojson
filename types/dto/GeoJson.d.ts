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
 * followed by all axes of the more northeasterly point. The axes order
 * of a bbox follows the axes order of geometries.
 */
export type BoundingBox = [number, number, number, number] | [number, number, number, number, number, number];
export type AbstractBoundingBox = {
  west: number | null;
  south: number | null;
  low: number | null;
  east: number | null;
  north: number | null;
  high: number | null;
};
export type GeoJsonJson = {
  type: string;
  bbox?: BoundingBox;
};
/**
 * A GeoJSON object represents a Geometry, Feature, or collection of
 * Features.
 */
export declare class GeoJSON {
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
//# sourceMappingURL=GeoJson.d.ts.map
