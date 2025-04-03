/**
 * A GeoJSON object represents a Geometry, Feature, or collection of
 * Features.
 */
export class GeoJSON {
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
