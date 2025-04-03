/**
 * Distance and bearing between two `Point`
 */
export class Vector {
  meters: number;
  protected _bearing!: number;

  /**
   *
   * @param {number} meters distance between `Point` A & B
   * @param {number} bearing from `Point` A to B. 0..360
   */
  constructor(meters: number, bearing: number) {
    this.meters = meters;
    this.bearing = bearing;
  }

  /**
   * @returns {number} from `Point` A to B. 0..360
   */
  get bearing(): number {
    return this._bearing;
  }

  /**
   * @param {number} bearing from `Point` A to B. 0..360
   */
  set bearing(bearing: number) {
    this._bearing = (bearing + 360) % 360;
  }
}
