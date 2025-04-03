import { GeoJsonJson, Position, GeoJSON } from "./GeoJson.js";

type GeometryJson = GeoJsonJson & {
  coordinates: Position | Position[] | Position[][];
};

/**
 * A Geometry object represents points, curves, and surfaces in
 * coordinate space.
 */
export class Geometry extends GeoJSON {
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
