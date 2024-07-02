import {Endian} from "../enums/Endian.js";

/**
 * @class
 * @name BufferWriter
 * @description A buffer writer.
 */
export class BufferWriter {
    private _buffer: Buffer = Buffer.alloc(0)
    private readonly _endian: Endian

    /**
     * @constructor
     * @name BufferWriter
     * @param {Endian} [endian=Endian.Little] - The endianness.
     */
    constructor(endian: Endian = Endian.Little) {
        this._endian = endian
    }

    public writeChar() {

    }

    public writeChar16() {

    }

    public writeChar32() {

    }

    public writeWChar() {

    }

    public writeUnsignedChar() {

    }

    public writeShortInt() {

    }

    public writeInt() {

    }

    public writeLongInt() {
    }

    public writeLongLongInt() {

    }

    public writeUnsignedShortInt() {

    }

    public writeUnsignedInt() {

    }

    public writeUnsignedLongInt() {
    }

    public writeUnsignedLongLongInt() {

    }

    public writeInt8() {

    }

    public writeInt16() {

    }

    public writeInt32() {

    }

    public writeInt64() {

    }

    public writeUInt8() {

    }

    public writeUInt16() {

    }

    public writeUInt32() {

    }

    public writeUInt64() {

    }

    public writeFloat() {

    }

    public writeDouble() {

    }

    public writeBool() {

    }
}

export default BufferWriter