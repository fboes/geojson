import { Feature } from "./Feature.js";
import { GeoJSON, GeoJsonJson } from "./GeoJson.js";
export type FeatureCollectionJson = GeoJsonJson & {
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
//# sourceMappingURL=FeatureCollection.d.ts.map
