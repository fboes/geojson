import { GeoJSON } from "./GeoJson.js";
import { Geometry } from "./Geometry.js";
/**
 * Unlike the other geometry types described above, a GeometryCollection
 * can be a heterogeneous composition of smaller Geometry objects.
 */
export declare class GeometryCollection extends GeoJSON {
  geometries: Geometry[];
  constructor(geometries: Geometry[]);
}
//# sourceMappingURL=GeometryCollection.d.ts.map
