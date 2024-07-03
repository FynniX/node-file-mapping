import {Endian} from "../enums/Endian.js";
import FileMapping from "./FileMapping.js";
import {VarType} from "../enums/VarType.js";
import {Char} from "./Char.js";
import {WideChar} from "./WideChar.js";

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

    /**
     * @name readChar
     * @returns A char.
     */
    public readChar() {
        const size = FileMapping.getVarTypeSize(VarType.char)
        return new Char(Number(this.readNumber(size, false)))
    }

    /**
     * @name readChar16
     * @returns A char16_t.
     */
    public readChar16() {
        const size = FileMapping.getVarTypeSize(VarType.char16_t)
        return new Char(Number(this.readNumber(size, false)))
    }

    /**
     * @name readChar32
     * @returns A char32_t.
     */
    public readChar32() {
        const size = FileMapping.getVarTypeSize(VarType.char32_t)
        return new Char(Number(this.readNumber(size, false)))
    }

    /**
     * @name readWideChar
     * @returns A wchar_t.
     */
    public readWideChar() {
        const size = FileMapping.getVarTypeSize(VarType.wchar_t)
        return new WideChar(Number(this.readNumber(size, false)))
    }

    /**
     * @name readUnsignedChar
     * @returns A unsigned char.
     */
    public readUnsignedChar() {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_char)
        return new Char(Number(this.readNumber(size, true)))
    }

    /**
     * @name readShortInt
     * @returns A short int.
     */
    public readShortInt() {
        const size = FileMapping.getVarTypeSize(VarType.short_int)
        return Number(this.readNumber(size, false))
    }

    /**
     * @name readInt
     * @returns A int.
     */
    public readInt() {
        const size = FileMapping.getVarTypeSize(VarType.int)
        return Number(this.readNumber(size, false))
    }

    /**
     * @name readLongInt
     * @returns A long int.
     */
    public readLongInt() {
        const size = FileMapping.getVarTypeSize(VarType.long_int)
        return this.readNumber(size, false)
    }

    /**
     * @name readLongLongInt
     * @returns A long long int.
     */
    public readLongLongInt() {
        const size = FileMapping.getVarTypeSize(VarType.long_long_int)
        return BigInt(this.readNumber(size, false))
    }

    /**
     * @name readUnsignedShortInt
     * @returns A unsigned short int.
     */
    public readUnsignedShortInt() {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_short_int)
        return Number(this.readNumber(size, true))
    }

    /**
     * @name readUnsignedInt
     * @returns A unsigned int.
     */
    public readUnsignedInt() {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_int)
        return Number(this.readNumber(size, true))
    }

    /**
     * @name readUnsignedLongInt
     * @returns A unsigned long int.
     */
    public readUnsignedLongInt() {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_long_int)
        return this.readNumber(size, true)
    }

    /**
     * @name readUnsignedLongLongInt
     * @returns A unsigned long long int.
     */
    public readUnsignedLongLongInt() {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_long_long_int)
        return BigInt(this.readNumber(size, true))
    }

    /**
     * @name readInt8
     * @returns A int8_t.
     */
    public readInt8() {
        return this._buffer.readInt8()
    }

    /**
     * @name readInt16
     * @returns A int16_t.
     */
    public readInt16() {
        return this._endian === Endian.Little ? this._buffer.readInt16LE() : this._buffer.readInt16BE()
    }

    /**
     * @name readInt32
     * @returns A int32_t.
     */
    public readInt32() {
        return this._endian === Endian.Little ? this._buffer.readInt32LE() : this._buffer.readInt32BE()
    }

    /**
     * @name readInt64
     * @returns A int64_t.
     */
    public readInt64() {
        return this._endian === Endian.Little ? this._buffer.readBigInt64LE() : this._buffer.readBigInt64BE()
    }

    /**
     * @name readUInt8
     * @returns A uint8_t.
     */
    public readUInt8() {
        return this._endian === Endian.Little ? this._buffer.readUInt8() : this._buffer.readUInt8()
    }

    /**
     * @name readUInt16
     * @returns A uint16_t.
     */
    public readUInt16() {
        return this._endian === Endian.Little ? this._buffer.readUInt16LE() : this._buffer.readUInt16BE()
    }

    /**
     * @name readUInt32
     * @returns A uint32_t.
     */
    public readUInt32() {
        return this._endian === Endian.Little ? this._buffer.readUInt32BE() : this._buffer.readUInt32BE()
    }

    /**
     * @name readUInt64
     * @returns A uint64_t.
     */
    public readUInt64() {
        return this._endian === Endian.Little ? this._buffer.readBigUInt64LE() : this._buffer.readBigUint64BE()
    }

    /**
     * @name readFloat
     * @returns A float.
     */
    public readFloat() {
        return this._endian === Endian.Little ? this._buffer.readFloatLE() : this._buffer.readFloatBE()
    }

    /**
     * @name readDouble
     * @returns A double.
     */
    public readDouble() {
        return this._endian === Endian.Little ? this._buffer.readDoubleLE() : this._buffer.readDoubleBE()
    }

    /**
     * @name readBool
     * @returns A bool.
     */
    public readBool() {
        const size = FileMapping.getVarTypeSize(VarType.bool)
        return this.readNumber(size, true) === 1
    }
}

export default BufferReader