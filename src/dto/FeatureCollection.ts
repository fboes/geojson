import { Feature } from "./Feature.js";
import { GeoJSON, GeoJsonJson } from "./GeoJson.js";

export type FeatureCollectionJson = GeoJsonJson & {
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
