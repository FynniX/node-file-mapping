import {Endian} from "../enums/Endian.js";
import FileMapping from "./FileMapping.js";
import {VarType} from "../enums/VarType.js";
import {Char} from "./Char.js";

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

    private writeNumber(data: number | bigint, size: number, unsigned: boolean) {
        switch (size) {
            case 1:
                unsigned ? this.writeUInt8(Number(data)) : this.writeInt8(Number(data))
                break
            case 2:
                unsigned ? this.writeUInt16(Number(data)) : this.writeInt16(Number(data))
                break
            case 4:
                unsigned ? this.writeUInt32(Number(data)) : this.writeInt32(Number(data))
                break
            case 8:
                unsigned ? this.writeUInt64(BigInt(data)) : this.writeInt64(BigInt(data))
                break
            default:
                throw new Error('Invalid variable size')
        }
    }

    private appendBuffer(data: Buffer) {
        this._buffer = Buffer.concat([this._buffer, data])
    }

    /**
     * @name writeChar
     * @param {Char} data - The char to write.
     */
    public writeChar(data: Char) {
        const size = FileMapping.getVarTypeSize(VarType.char)
        this.writeNumber(data.toNumber(), size, false)
    }

    /**
     * @name writeChar16
     * @param {Char} data - The char_16t to write.
     */
    public writeChar16(data: Char) {
        const size = FileMapping.getVarTypeSize(VarType.char16_t)
        this.writeNumber(data.toNumber(), size, true)
    }

    /**
     * @name writeChar32
     * @param {Char} data - The char32_t to write.
     */
    public writeChar32(data: Char) {

        const size = FileMapping.getVarTypeSize(VarType.char32_t)
        this.writeNumber(data.toNumber(), size, true)
    }

    /**
     * @name writeWideChar
     * @param {Char} data - The wchar_t to write.
     */
    public writeWideChar(data: Char) {
        const size = FileMapping.getVarTypeSize(VarType.wchar_t)
        this.writeNumber(data.toNumber(), size, false)
    }

    /**
     * @name writeUnsignedChar
     * @param {number} data - The unsigned char to write.
     */
    public writeUnsignedChar(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_char)
        this.writeNumber(data, size, true)
    }

    /**
     * @name writeShortInt
     * @param {number} data - The short int to write.
     */
    public writeShortInt(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.short_int)
        this.writeNumber(data, size, false)
    }

    /**
     * @name writeInt
     * @param {number} data - The int to write.
     */
    public writeInt(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.int)
        this.writeNumber(data, size, false)
    }

    /**
     * @name writeLongInt
     * @param {number | bigint} data - The long int to write.
     */
    public writeLongInt(data: number | bigint) {
        const size = FileMapping.getVarTypeSize(VarType.long_int)
        this.writeNumber(data, size, false)
    }

    /**
     * @name writeLongLongInt
     * @param {bigint} data - The long long int to write.
     */
    public writeLongLongInt(data: bigint) {
        const size = FileMapping.getVarTypeSize(VarType.long_long_int)
        this.writeNumber(data, size, false)
    }

    /**
     * @name writeUnsignedShortInt
     * @param {number} data - The unsigned short int to write.
     */
    public writeUnsignedShortInt(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_short_int)
        this.writeNumber(data, size, true)
    }

    /**
     * @name writeUnsignedInt
     * @param {number} data - The unsigned int to write.
     */
    public writeUnsignedInt(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_int)
        this.writeNumber(data, size, true)
    }

    /**
     * @name writeUnsignedLongInt
     * @param {number | bigint} data - The unsigned long int to write.
     */
    public writeUnsignedLongInt(data: number | bigint) {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_long_int)
        this.writeNumber(data, size, true)
    }

    /**
     * @name writeUnsignedLongLongInt
     * @param {bigint} data - The unsigned long long int to write.
     */
    public writeUnsignedLongLongInt(data: bigint) {
        const size = FileMapping.getVarTypeSize(VarType.unsigned_long_long_int)
        this.writeNumber(data, size, true)
    }

    /**
     * @name writeInt8
     * @param {number} data - The int8_t to write.
     */
    public writeInt8(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.int8_t)
        const tmpBuffer = Buffer.alloc(size)
        tmpBuffer.writeInt8(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeInt16
     * @param {number} data - The int16_t to write.
     */
    public writeInt16(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.int16_t)
        const tmpBuffer = Buffer.alloc(size)
        this._endian === Endian.Little ? tmpBuffer.writeInt16LE(data) : tmpBuffer.writeInt16BE(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeInt32
     * @param {number} data - The int32_t to write.
     */
    public writeInt32(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.int32_t)
        const tmpBuffer = Buffer.alloc(size)
        this._endian === Endian.Little ? tmpBuffer.writeInt32LE(data) : tmpBuffer.writeInt32BE(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeInt64
     * @param {bigint} data - The int64_t to write.
     */
    public writeInt64(data: bigint) {
        const size = FileMapping.getVarTypeSize(VarType.int64_t)
        const tmpBuffer = Buffer.alloc(size)
        this._endian === Endian.Little ? tmpBuffer.writeBigInt64LE(data) : tmpBuffer.writeBigInt64BE(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeUInt8
     * @param {number} data - The uint8_t to write.
     */
    public writeUInt8(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.uint8_t)
        const tmpBuffer = Buffer.alloc(size)
        tmpBuffer.writeUInt8(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeUInt16
     * @param {number} data - The uint16_t to write.
     */
    public writeUInt16(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.uint16_t)
        const tmpBuffer = Buffer.alloc(size)
        this._endian === Endian.Little ? tmpBuffer.writeUInt16LE(data) : tmpBuffer.writeUInt16BE(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeUInt32
     * @param {number} data - The uint32_t to write.
     */
    public writeUInt32(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.uint32_t)
        const tmpBuffer = Buffer.alloc(size)
        this._endian === Endian.Little ? tmpBuffer.writeUInt32LE(data) : tmpBuffer.writeUInt32BE(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeUInt64
     * @param {bigint} data - The uint64_t to write.
     */
    public writeUInt64(data: bigint) {
        const size = FileMapping.getVarTypeSize(VarType.uint64_t)
        const tmpBuffer = Buffer.alloc(size)
        this._endian === Endian.Little ? tmpBuffer.writeBigUInt64LE(data) : tmpBuffer.writeBigUInt64BE(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeFloat
     * @param {number} data - The float to write.
     */
    public writeFloat(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.float)
        const tmpBuffer = Buffer.alloc(size)
        this._endian === Endian.Little ? tmpBuffer.writeFloatLE(data) : tmpBuffer.writeFloatBE(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeDouble
     * @param {number} data - The double to write.
     */
    public writeDouble(data: number) {
        const size = FileMapping.getVarTypeSize(VarType.double)
        const tmpBuffer = Buffer.alloc(size)
        this._endian === Endian.Little ? tmpBuffer.writeDoubleLE(data) : tmpBuffer.writeDoubleBE(data)
        this.appendBuffer(tmpBuffer)
    }

    /**
     * @name writeBool
     * @param {boolean} data - The boolean to write.
     */
    public writeBool(data: boolean) {
        const size = FileMapping.getVarTypeSize(VarType.bool)
        return this.writeNumber(data ? 1 : 0, size, true)
    }
}

export default BufferWriter