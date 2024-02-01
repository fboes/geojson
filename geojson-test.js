// @ts-check

import * as GeoJson from "./geojson.js";

const Test = {
  toFromJson: (object) => {
    return JSON.parse(JSON.stringify(object));
  },

  consoleUltra: (object, label) => {
    label && console.group(label);
    console.dir(object, { depth: null });
    label && console.groupEnd();
  },

  /**
   * @param {Boolean} condition
   * @param {?String} message
   */
  assert(condition, message = null) {
    console.assert(condition, message);
  },
};

// -----------------------------------------------------------------------------
// GeoJson.Point
{
  const geoJsonPoint = Test.toFromJson(new GeoJson.Point(1, 2, 3));
  Test.consoleUltra(geoJsonPoint, "GeoJson.Point");

  Test.assert(geoJsonPoint.coordinates[0] === 1, "Coordinates match");
  Test.assert(geoJsonPoint.coordinates[1] === 2, "Coordinates match");
  Test.assert(geoJsonPoint.coordinates[2] === 3, "Coordinates match");
}
{
  const geoJsonPoint = Test.toFromJson(new GeoJson.Point(1, 2));
  Test.consoleUltra(geoJsonPoint, "GeoJson.Point");

  Test.assert(geoJsonPoint.coordinates[0] === 1, "Coordinates match");
  Test.assert(geoJsonPoint.coordinates[1] === 2, "Coordinates match");
  Test.assert(geoJsonPoint.coordinates[2] === undefined, "No elevation");
}

// -----------------------------------------------------------------------------
// GeoJson.MultiPoint
{
  const geoJsonGeometryMultiPoint = Test.toFromJson(
    new GeoJson.MultiPoint([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
  );
  Test.consoleUltra(geoJsonGeometryMultiPoint, "GeoJson.MultiPoint");

  Test.assert(geoJsonGeometryMultiPoint.coordinates[0][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPoint.coordinates[0][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPoint.coordinates[0][2] === 0, "Coordinates match");

  Test.assert(geoJsonGeometryMultiPoint.coordinates[1][0] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPoint.coordinates[1][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPoint.coordinates[1][2] === 1, "Coordinates match");

  Test.assert(geoJsonGeometryMultiPoint.coordinates[2][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPoint.coordinates[2][1] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPoint.coordinates[2][2] === 2, "Coordinates match");
}

// -----------------------------------------------------------------------------
// GeoJson.LineString
{
  const geoJsonGeometryLineString = Test.toFromJson(
    new GeoJson.LineString([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
  );
  Test.consoleUltra(geoJsonGeometryLineString, "GeoJson.LineString");

  Test.assert(geoJsonGeometryLineString.coordinates[0][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryLineString.coordinates[0][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryLineString.coordinates[0][2] === 0, "Coordinates match");

  Test.assert(geoJsonGeometryLineString.coordinates[1][0] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryLineString.coordinates[1][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryLineString.coordinates[1][2] === 1, "Coordinates match");

  Test.assert(geoJsonGeometryLineString.coordinates[2][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryLineString.coordinates[2][1] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryLineString.coordinates[2][2] === 2, "Coordinates match");
}

// -----------------------------------------------------------------------------
// GeoJson.MultiLineString
{
  const geoJsonGeometryMultiLineString = Test.toFromJson(
    new GeoJson.MultiLineString([
      new GeoJson.LineString([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
    ]),
  );
  Test.consoleUltra(geoJsonGeometryMultiLineString, "GeoJson.MultiLineString");

  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][0][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][0][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][0][2] === 0, "Coordinates match");

  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][1][0] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][1][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][1][2] === 1, "Coordinates match");

  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][2][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][2][1] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryMultiLineString.coordinates[0][2][2] === 2, "Coordinates match");
}

// -----------------------------------------------------------------------------
// GeoJson.Polygon
{
  const geoJsonGeometryPolygon = Test.toFromJson(
    new GeoJson.Polygon([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
  );
  Test.consoleUltra(geoJsonGeometryPolygon, "GeoJson.Polygon");

  Test.assert(geoJsonGeometryPolygon.coordinates[0][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryPolygon.coordinates[0][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryPolygon.coordinates[0][2] === 0, "Coordinates match");

  Test.assert(geoJsonGeometryPolygon.coordinates[1][0] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryPolygon.coordinates[1][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryPolygon.coordinates[1][2] === 1, "Coordinates match");

  Test.assert(geoJsonGeometryPolygon.coordinates[2][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryPolygon.coordinates[2][1] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryPolygon.coordinates[2][2] === 2, "Coordinates match");
}

// -----------------------------------------------------------------------------
// GeoJson.MultiLineString
{
  const geoJsonGeometryMultiPolygon = Test.toFromJson(
    new GeoJson.MultiPolygon([
      new GeoJson.Polygon([new GeoJson.Point(0, 0, 0), new GeoJson.Point(1, 0, 1), new GeoJson.Point(0, 1, 2)]),
    ]),
  );
  Test.consoleUltra(geoJsonGeometryMultiPolygon, "GeoJson.MultiLineString");

  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][0][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][0][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][0][2] === 0, "Coordinates match");

  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][1][0] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][1][1] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][1][2] === 1, "Coordinates match");

  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][2][0] === 0, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][2][1] === 1, "Coordinates match");
  Test.assert(geoJsonGeometryMultiPolygon.coordinates[0][2][2] === 2, "Coordinates match");
}

// -----------------------------------------------------------------------------
// GeoJson.Feature
{
  const geoJsonFeature = Test.toFromJson(new GeoJson.Feature(new GeoJson.Point(1, 2, 3), { title: "Test" }));
  Test.consoleUltra(geoJsonFeature, "GeoJson.Feature");
}
{
  const geoJsonFeature = Test.toFromJson(new GeoJson.Feature(new GeoJson.Point(1, 2, 3)));
  Test.consoleUltra(geoJsonFeature, "GeoJson.Feature");
}
{
  const geoJsonFeature = Test.toFromJson(GeoJson.Feature.createWithPoint(1, 2, null, "Test"));
  Test.consoleUltra(geoJsonFeature, "GeoJson.Feature");
}
{
  const geoJsonFeature = Test.toFromJson(GeoJson.Feature.createWithPoint(1, 2, 3));
  Test.consoleUltra(geoJsonFeature, "GeoJson.Feature");
}

// -----------------------------------------------------------------------------
// GeoJson.FeatureCollection
{
  const geoJsonFeatureCollection = Test.toFromJson(
    new GeoJson.FeatureCollection([new GeoJson.Feature(new GeoJson.Point(1, 2, 3), { title: "Test" })]),
  );
  Test.assert(geoJsonFeatureCollection.bbox === undefined);
  Test.consoleUltra(geoJsonFeatureCollection, "GeoJson.FeatureCollection");
}
{
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
  Test.assert(json.type === "FeatureCollection");
  Test.assert(json.bbox !== undefined);
  Test.assert(json.bbox[0] === geoJsonFeatureCollection.boundingbox.west, "West");
  Test.assert(json.bbox[1] === geoJsonFeatureCollection.boundingbox.south, "South");
  Test.assert(json.bbox[2] === geoJsonFeatureCollection.boundingbox.east, "East");
  Test.assert(json.bbox[3] === geoJsonFeatureCollection.boundingbox.north, "North");

  Test.consoleUltra(json, "GeoJson.FeatureCollection");
  console.log(JSON.stringify(geoJsonFeatureCollection));
}

/**
 * `GeometryCollection`
 */
