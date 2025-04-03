import { GeoJsonJson, Position, GeoJSON } from "./GeoJson.js";
type GeometryJson = GeoJsonJson & {
  coordinates: Position | Position[] | Position[][];
};
/**
 * A Geometry object represents points, curves, and surfaces in
 * coordinate space.
 */
export declare class Geometry extends GeoJSON {
  get coordinates(): Position | Position[] | Position[][];
  toJSON(): GeometryJson;
}
export {};
//# sourceMappingURL=Geometry.d.ts.map
