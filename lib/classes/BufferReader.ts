import {Endian} from "../enums/Endian.js";
import FileMapping from "./FileMapping.js";
import {VarType} from "../enums/VarType.js";

// TODO: Add comments

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

    private readNumber(size: number, unsigned: boolean) {
        // Check weather we have enough data
        if (this._buffer.length < size)
            throw new Error('Not enough data to read a char')

        let value
        switch (size) {
            case 1:
                value = unsigned ? this.readUInt8() : this.readInt8()
                break
            case 2:
                value = unsigned ? this.readUInt16() : this.readInt16()
                break
            case 4:
                value = unsigned ? this.readUInt32() : this.readInt32()
                break
            case 8:
                value = unsigned ? this.readUInt64() : this.readInt64()
                break
            default:
                throw new Error('Invalid variable size')
        }

        // Remove the bytes from the buffer
        this._buffer = this._buffer.subarray(size)

        return value
    }

    public readChar() {
        const size = FileMapping.getVarTypeSize(VarType.char)
        return this.readNumber(size, false)
        // TODO: Implement function to convert to char
    }

    public readChar16() {
        const size = FileMapping.getVarTypeSize(VarType.char16_t)
        return this.readNumber(size, false)
        // TODO: Implement function to convert to char
    }

    public readChar32() {
        const size = FileMapping.getVarTypeSize(VarType.char32_t)
        return this.readNumber(size, false)
        // TODO: Implement function to convert to char
    }

    public readWChar() {
        const size = FileMapping.getVarTypeSize(VarType.wchar_t)
        return this.readNumber(size, false)
        // TODO: Implement function to convert to wide char
    }

    public readUnsignedChar() {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_char)
        return this.readNumber(size, true)
        // TODO: Implement function to convert to char
    }

    public readShortInt() {
        const size = FileMapping.getVarTypeSize(VarType.short_int)
        return this.readNumber(size, false)
    }

    public readInt() {
        const size = FileMapping.getVarTypeSize(VarType.int)
        return this.readNumber(size, false)
    }

    public readLongInt() {
        const size = FileMapping.getVarTypeSize(VarType.long_int)
        return this.readNumber(size, false)
    }

    public readLongLongInt() {
        const size = FileMapping.getVarTypeSize(VarType.long_long_int)
        return this.readNumber(size, false)
    }

    public readUnsignedShortInt() {
        const size = FileMapping.getVarTypeSize(VarType.short_int)
        return this.readNumber(size, true)
    }

    public readUnsignedInt() {
        const size = FileMapping.getVarTypeSize(VarType.int)
        return this.readNumber(size, true)
    }

    public readUnsignedLongInt() {
        const size = FileMapping.getVarTypeSize(VarType.long_int)
        return this.readNumber(size, true)
    }

    public readUnsignedLongLongInt() {
        const size = FileMapping.getVarTypeSize(VarType.long_long_int)
        return this.readNumber(size, true)
    }

    public readInt8() {
        return this._buffer.readInt8()
    }

    public readInt16() {
        return this._endian === Endian.Little ? this._buffer.readInt16LE() : this._buffer.readInt16BE()
    }

    public readInt32() {
        return this._endian === Endian.Little ? this._buffer.readInt32LE() : this._buffer.readInt32BE()
    }

    public readInt64() {
        return this._endian === Endian.Little ? this._buffer.readBigInt64LE() : this._buffer.readBigInt64BE()
    }

    public readUInt8() {
        return this._endian === Endian.Little ? this._buffer.readUInt8() : this._buffer.readUInt8()
    }

    public readUInt16() {
        return this._endian === Endian.Little ? this._buffer.readUInt16LE() : this._buffer.readUInt16BE()
    }

    public readUInt32() {
        return this._endian === Endian.Little ? this._buffer.readUInt32BE() : this._buffer.readUInt32BE()
    }

    public readUInt64() {
        return this._endian === Endian.Little ? this._buffer.readBigUInt64LE() : this._buffer.readBigUint64BE()
    }

    public readFloat() {
        return this._endian === Endian.Little ? this._buffer.readFloatLE() : this._buffer.readFloatBE()
    }

    public readDouble() {
        return this._endian === Endian.Little ? this._buffer.readDoubleLE() : this._buffer.readDoubleBE()
    }

    public readBool() {
        const size = FileMapping.getVarTypeSize(VarType.bool)
        return this.readNumber(size, true) === 1
    }
}

export default BufferReader