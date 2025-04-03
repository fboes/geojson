import { GeoJSON } from "./GeoJson.js";
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
