/**
 * @class
 * @name Char
 * @description Represents a class of a class that provides number and encoded value
 */
export class Char {
  private readonly _value: number;

  /**
   * @constructor
   * @param {number} value - the value.
   */
  constructor(value: number) {
    this._value = value;
  }

  public toString() {
    return String.fromCharCode(this._value);
  }

  public toNumber() {
    return this._value;
  }
}
