# GeoJSON

This dual-purpose library creates [GeoJSON](https://geojson.org/) according to [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946) in NodeJS as well as directly in your browser.

It contains all of the basic object types of GeoJSON geometries:

- `GeoJson.Point` and `GeoJson.MultiPoint`
- `GeoJson.LineString` and `GeoJson.MultiLineString`
- `GeoJson.Polygon` and `GeoJson.MultiPolygon`
- `GeoJson.GeometryCollection`

…and organizational objects:

- `GeoJson.Feature`
- `GeoJson.FeatureCollection`

Why do we need _classes_ to build JSON objects?

- It makes some of the data types of GeoJSON more accessible, as some types like coordinates are just ordered arrays. Now you have named parameters.
- Working with typed objects allows to see how the objects can be combined.
- Adding properties to `Feature` is improved.

## Installation

Either download the [`dist/index.js`](dist/index.js) to a sensible location in your web project, or do a NPM installation:

```bash
npm install @fboes/geojson --save
```

Instead of a local installation you may also load the library from https://unpkg.com/. Beware: This makes https://unpkg.com/ a dependency of your project and may pose data protection issues.

```html
<script type="module" src="https://unpkg.com/@fboes/geojson@latest/dist/index.js"></script>
```

Everything required for the functionality of this library is contained in [`dist/index.js`](dist/index.js).

## Usage

Loading the library prior to use:

```javascript
// 1. NodeJS - NPM installation
import GeoJson from "geojson";

// 2. Local installation and/or browser usage
import GeoJson from "dist/index.js";
```

Now you are set to build your GeoJSON:

```javascript
const featureCollection = new GeoJson.FeatureCollection([
  new GeoJson.Feature(new GeoJson.Point(1.53946, 51.04571), {
    title: "Sailing boat",
    "marker-symbol": "harbor",
  }),
  new GeoJson.Feature(new GeoJson.Point(6.5664576, 58.109285), {
    title: "Lighthouse",
    "marker-symbol": "lighthouse",
  }),
]);

console.log(JSON.stringify(featureCollection));
```

which yields GeoJSON:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [1.53946, 51.04571] },
      "properties": { "title": "Sailing boat", "marker-symbol": "harbor" }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [6.5664576, 58.109285] },
      "properties": { "title": "Lighthouse", "marker-symbol": "lighthouse" }
    }
  ]
}
```

## Further readings

- [`simplestyle-spec`](https://github.com/mapbox/simplestyle-spec): A simple specification for styling GeoJSON data.
- [Maki Icons](https://labs.mapbox.com/maki-icons/): Maki is an icon set made for map designers. Maki includes icons for common points of interest like parks, museums, and places of worship.
- [Mapbox GeoJSON integration](https://docs.mapbox.com/mapbox-gl-js/example/external-geojson/): This example adds GeoJSON data from an external file and uses it in a layer on the map.

## Status

[![GitHub version](https://badge.fury.io/gh/fboes%2Fgeojson.svg)](https://badge.fury.io/gh/fboes%2Fgeojson)
[![`npm` version](https://badge.fury.io/js/%40fboes%2Fgeojson.svg)](https://badge.fury.io/js/%40fboes%2Fgeojson)
![MIT license](https://img.shields.io/github/license/fboes/geojson.svg)

## Legal stuff

Author: [Frank Boës](https://3960.org)

Copyright & license: See [LICENSE.txt](LICENSE.txt)
