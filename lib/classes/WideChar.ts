
/**
 * @class
 * @name WideChar
 * @description Extends the number class to make conversion to wide char available.
 */
export class WideChar extends Number {
    private readonly _value: number

    /**
     * @constructor
     * @param {number} value - the number.
     */
    constructor(value: number) {
        super(value)
        this._value = value
    }

    public getValue() {
        return this._value
    }

    public toWideCharString() {
        // TODO: Implement conversion
        console.log(this._value)
        return "todo"
    }
}