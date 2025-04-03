/**
 * Distance and bearing between two `Point`
 */
export declare class Vector {
  meters: number;
  protected _bearing: number;
  /**
   *
   * @param {number} meters distance between `Point` A & B
   * @param {number} bearing from `Point` A to B. 0..360
   */
  constructor(meters: number, bearing: number);
  /**
   * @returns {number} from `Point` A to B. 0..360
   */
  get bearing(): number;
  /**
   * @param {number} bearing from `Point` A to B. 0..360
   */
  set bearing(bearing: number);
}
//# sourceMappingURL=Vector.d.ts.map
