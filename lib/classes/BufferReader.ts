import {Endian} from "../enums/Endian.js";

/**
 * @class
 * @name BufferReader
 * @description A buffer reader.
 */
export class BufferReader {
    private _buffer: Buffer
    private readonly _endian: Endian

    /**
     * @constructor
     * @name BufferReader
     * @param {Buffer} buffer - The buffer.
     * @param {Endian} [endian=Endian.Little] - The endianness.
     */
    constructor(buffer: Buffer, endian: Endian = Endian.Little) {
        this._buffer = buffer
        this._endian = endian
    }

    public readChar() {

    }

    public readChar16() {

    }

    public readChar32() {

    }

    public readWChar() {

    }

    public readUnsignedChar() {

    }

    public readShortInt() {

    }

    public readInt() {

    }

    public readLongInt() {

    }

    public readLongLongInt() {

    }

    public readUnsignedShortInt() {

    }

    public readUnsignedInt() {

    }

    public readUnsignedLongInt() {

    }

    public readUnsignedLongLongInt() {

    }

    public readInt8() {

    }

    public readInt16() {

    }

    public readInt32() {

    }

    public readInt64() {

    }

    public readUInt8() {

    }

    public readUInt16() {

    }

    public readUInt32() {

    }

    public readUInt64() {

    }

    public readFloat() {

    }

    public readDouble() {

    }

    public readBool() {

    }
}

export default BufferReader