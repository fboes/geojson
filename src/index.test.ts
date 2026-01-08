import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import * as GeoJson from "./index.js";

const Test = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFromJson: (object: any) => {
    return JSON.parse(JSON.stringify(object));
  },
};

describe("GeoJson.Point", () => {
  it("constructor and to/from JSON", () => {
    const geoJsonPoint = Test.toFromJson(new GeoJson.Point(1, 2, 3));
    assert.strictEqual(geoJsonPoint.type, "Point", "Type matches");
    assert.strictEqual(geoJsonPoint.coordinates.length, 3, "3 coordinates");
    assert.strictEqual(geoJsonPoint.coordinates[0], 1, "Coordinates match");
    assert.strictEqual(geoJsonPoint.coordinates[1], 2, "Coordinates match");
    assert.strictEqual(geoJsonPoint.coordinates[2], 3, "Elevation matches");
  });

  it("longitude/latitude range checks", () => {
    const geoJsonPoint = Test.toFromJson(new GeoJson.Point(1, 2));
    assert.strictEqual(geoJsonPoint.type, "Point", "Type matches");
    assert.strictEqual(geoJsonPoint.coordinates.length, 2, "2 coordinates");
    assert.strictEqual(geoJsonPoint.coordinates[0], 1, "Coordinates match");
    assert.strictEqual(geoJsonPoint.coordinates[1], 2, "Coordinates match");
    assert.ok(geoJsonPoint.coordinates[2] === undefined, "No elevation");
  });

  it("longitude/latitude range checks", () => {
    const geoJsonPoint = Test.toFromJson(new GeoJson.Point(180, 90));
    assert.strictEqual(geoJsonPoint.type, "Point", "Type matches");
  });

  it("longitude/latitude range checks invalid", () => {
    const geoJsonPoint = Test.toFromJson(new GeoJson.Point(-180, -90));
    assert.strictEqual(geoJsonPoint.type, "Point", "Type matches");
  });

  it("longitude/latitude range checks out of range", () => {
    assert.throws(() => {
      Test.toFromJson(new GeoJson.Point(-181, -91));
    });
  });

  it("longitude/latitude range checks out of range", () => {
    assert.throws(() => {
      Test.toFromJson(new GeoJson.Point(181, 91));
    });
  });
});

describe("GeoJson.MultiPoint", () => {
  it("constructor and to/from JSON", () => {
    const geoJsonGeometryMultiPoint = Test.toFromJson(
      new GeoJson.MultiPoint([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
    );
    assert.strictEqual(geoJsonGeometryMultiPoint.type, "MultiPoint", "Type matches");

    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[0][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[0][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[0][2], 0, "Elevation matches");

    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[1][0], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[1][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[1][2], 1, "Elevation matches");

    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[2][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[2][1], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPoint.coordinates[2][2], 2, "Elevation matches");
  });
});

describe("GeoJson.LineString", () => {
  it("constructor and to/from JSON", () => {
    const geoJsonGeometryLineString = Test.toFromJson(
      new GeoJson.LineString([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
    );
    assert.strictEqual(geoJsonGeometryLineString.type, "LineString", "Type matches");

    assert.strictEqual(geoJsonGeometryLineString.coordinates[0][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryLineString.coordinates[0][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryLineString.coordinates[0][2], 0, "Coordinates match");

    assert.strictEqual(geoJsonGeometryLineString.coordinates[1][0], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryLineString.coordinates[1][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryLineString.coordinates[1][2], 1, "Coordinates match");

    assert.strictEqual(geoJsonGeometryLineString.coordinates[2][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryLineString.coordinates[2][1], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryLineString.coordinates[2][2], 2, "Coordinates match");
  });
});

describe("GeoJson.MultiLineString", () => {
  it("constructor and to/from JSON", () => {
    const geoJsonGeometryMultiLineString = Test.toFromJson(
      new GeoJson.MultiLineString([
        new GeoJson.LineString([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
      ]),
    );
    assert.strictEqual(geoJsonGeometryMultiLineString.type, "MultiLineString", "Type matches");

    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][0][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][0][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][0][2], 0, "Coordinates match");

    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][1][0], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][1][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][1][2], 1, "Coordinates match");

    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][2][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][2][1], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiLineString.coordinates[0][2][2], 2, "Coordinates match");
  });
});

describe("GeoJson.Polygon", () => {
  it("constructor and to/from JSON", () => {
    const geoJsonGeometryPolygon = Test.toFromJson(
      new GeoJson.Polygon([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
    );
    assert.strictEqual(geoJsonGeometryPolygon.type, "Polygon", "Type matches");

    assert.strictEqual(geoJsonGeometryPolygon.coordinates[0][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryPolygon.coordinates[0][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryPolygon.coordinates[0][2], 0, "Coordinates match");

    assert.strictEqual(geoJsonGeometryPolygon.coordinates[1][0], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryPolygon.coordinates[1][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryPolygon.coordinates[1][2], 1, "Coordinates match");

    assert.strictEqual(geoJsonGeometryPolygon.coordinates[2][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryPolygon.coordinates[2][1], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryPolygon.coordinates[2][2], 2, "Coordinates match");
  });
});

describe("GeoJson.MultiPolygon", () => {
  it("constructor and to/from JSON", () => {
    const geoJsonGeometryMultiPolygon = Test.toFromJson(
      new GeoJson.MultiPolygon([
        new GeoJson.Polygon([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
      ]),
    );
    assert.strictEqual(geoJsonGeometryMultiPolygon.type, "MultiPolygon", "Type matches");

    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][0][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][0][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][0][2], 0, "Coordinates match");

    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][1][0], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][1][1], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][1][2], 1, "Coordinates match");

    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][2][0], 0, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][2][1], 1, "Coordinates match");
    assert.strictEqual(geoJsonGeometryMultiPolygon.coordinates[0][2][2], 2, "Coordinates match");
  });
});

describe("GeoJson.Feature", () => {
  it("constructor and to/from JSON", () => {
    const geoJsonFeature = Test.toFromJson(new GeoJson.Feature(new GeoJson.Point(1, 2, 3), { title: "Test" }));
    assert.strictEqual(geoJsonFeature.type, "Feature", "Type matches");
    assert.strictEqual(geoJsonFeature.properties.title, "Test", "Feature.properties.title");
    assert.strictEqual(geoJsonFeature.geometry.type, "Point", "Feature.geometry.type");
    assert.ok(geoJsonFeature.id === undefined, "No id");
  });
  it("constructor and to/from JSON with id", () => {
    const geoJsonFeature = Test.toFromJson(new GeoJson.Feature(new GeoJson.Point(1, 2, 3), {}, "id"));
    assert.strictEqual(geoJsonFeature.type, "Feature", "Type matches");
    assert.ok(geoJsonFeature.properties === undefined, "No properties");
    assert.strictEqual(geoJsonFeature.geometry.type, "Point", "Feature.geometry.type");
    assert.strictEqual(geoJsonFeature.id, "id", "Has id");
  });
  it("static createWithPoint and to/from JSON", () => {
    const geoJsonFeature = Test.toFromJson(GeoJson.Feature.createWithPoint(1, 2, null, "Test", "id"));
    assert.strictEqual(geoJsonFeature.type, "Feature", "Type matches");
    assert.strictEqual(geoJsonFeature.properties.title, "Test", "Feature.properties.title");
    assert.strictEqual(geoJsonFeature.geometry.type, "Point", "Feature.geometry.type");
    assert.strictEqual(geoJsonFeature.id, "id", "Has id");
  });
  it("static createWithPoint without optional params and to/from JSON", () => {
    const geoJsonFeature = Test.toFromJson(GeoJson.Feature.createWithPoint(1, 2, 3));
    assert.strictEqual(geoJsonFeature.type, "Feature", "Type matches");
    assert.ok(geoJsonFeature.properties === undefined, "No properties");
    assert.strictEqual(geoJsonFeature.geometry.type, "Point", "Feature.geometry.type");
  });
});

describe("GeoJson.FeatureCollection", () => {
  it("constructor and to/from JSON", () => {
    const geoJsonFeatureCollection = Test.toFromJson(
      new GeoJson.FeatureCollection([new GeoJson.Feature(new GeoJson.Point(1, 2, 3), { title: "Test" })]),
    );
    assert.ok(geoJsonFeatureCollection.bbox === undefined);
  });
  it("constructor with bbox and to/from JSON", () => {
    const geoJsonFeatureCollection = new GeoJson.FeatureCollection([
      new GeoJson.Feature(new GeoJson.Point(1.53946, 51.04571), {
        title: "Sailing boat",
        "marker-symbol": "harbor",
      }),
      new GeoJson.Feature(new GeoJson.Point(6.5664576, 58.109285), {
        title: "Lighthouse",
        "marker-symbol": "lighthouse",
      }),
    ]);
    geoJsonFeatureCollection.boundingbox.east = 1.53946;
    geoJsonFeatureCollection.boundingbox.west = 6.5664576;
    geoJsonFeatureCollection.boundingbox.north = 58.109285;
    geoJsonFeatureCollection.boundingbox.south = 51.04571;

    const json = Test.toFromJson(geoJsonFeatureCollection);

    assert.strictEqual(json.type, "FeatureCollection");
    assert.strictEqual(json.bbox[0], geoJsonFeatureCollection.boundingbox.west, "Bounding Box West");
    assert.strictEqual(json.bbox[1], geoJsonFeatureCollection.boundingbox.south, "Bounding Box South");
    assert.strictEqual(json.bbox[2], geoJsonFeatureCollection.boundingbox.east, "Bounding Box East");
    assert.strictEqual(json.bbox[3], geoJsonFeatureCollection.boundingbox.north, "Bounding Box North");
    assert.strictEqual(json.type, "FeatureCollection", "FeatureCollection");
    assert.strictEqual(json.features.length, 2, "Two Features exist");
    assert.strictEqual(json.features[0].type, "Feature", "Feature.type");
    assert.strictEqual(json.features[0].properties.title, "Sailing boat", "Feature.properties.title");
    assert.strictEqual(json.features[0].properties["marker-symbol"], "harbor", "Feature.properties['marker-symbol']");
    assert.strictEqual(json.features[0].geometry.type, "Point", "Feature.geometry.type");

    assert.strictEqual(json.features[1].type, "Feature", "Feature.type");
    assert.strictEqual(json.features[1].properties.title, "Lighthouse", "Feature.properties.title");
    assert.strictEqual(json.features[1].geometry.type, "Point", "Feature.geometry.type");
    assert.strictEqual(
      json.features[1].properties["marker-symbol"],
      "lighthouse",
      "Feature.properties['marker-symbol']",
    );

    assert.deepStrictEqual(json, {
      type: "FeatureCollection",
      bbox: [6.5664576, 51.04571, 1.53946, 58.109285],
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [1.53946, 51.04571] },
          properties: { title: "Sailing boat", "marker-symbol": "harbor" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [6.5664576, 58.109285] },
          properties: { title: "Lighthouse", "marker-symbol": "lighthouse" },
        },
      ],
    });
  });
});

describe("GeoJson.Vector", () => {
  it("getVectorTo and getPointBy", () => {
    const lonLat = new GeoJson.Point(-80.379414, 25.489981);
    const lonLat2 = new GeoJson.Point(-80.279153, 25.320653);
    const vector = lonLat.getVectorTo(lonLat2);

    assert.strictEqual("152", vector.bearing.toPrecision(3));
    assert.strictEqual(21352, Math.round(vector.meters));

    const lonLat3 = lonLat.getPointBy(vector);
    assert.strictEqual(lonLat2.longitude.toPrecision(5), lonLat3.longitude.toPrecision(5));
    assert.strictEqual(lonLat2.latitude.toPrecision(5), lonLat3.latitude.toPrecision(5));
  });
});

/**
 * `GeometryCollection`
 */
