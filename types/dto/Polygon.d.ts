import { MultiPoint } from "./MultiPoint.js";
/**
 * To specify a constraint specific to Polygons, it is useful to
 * introduce the concept of a linear ring.
 *
 * The first and last positions are equivalent, and they MUST contain
 * identical values; their representation SHOULD also be identical.
 *
 * A linear ring MUST follow the right-hand rule with respect to the
 * area it bounds, i.e., exterior rings are counterclockwise, and
 * holes are clockwise.
 */
export declare class Polygon extends MultiPoint {}
//# sourceMappingURL=Polygon.d.ts.map
