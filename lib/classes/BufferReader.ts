import { Endian } from "../enums/Endian.js";
import { FileMapping } from "./FileMapping.js";
import { VarType } from "../enums/VarType.js";
import { Char } from "./Char.js";

/**
 * @class
 * BufferReader
 * A buffer reader.
 */
export class BufferReader {
  private _buffer: Buffer;
  private readonly _endian: Endian;

  /**
   * BufferReader
   * @param buffer - The buffer.
   * @param {Endian} [endian=Endian.Little] - The endianness.
   */
  constructor(buffer: Buffer, endian: Endian = Endian.Little) {
    this._buffer = buffer;
    this._endian = endian;
  }

  private readNumber(size: number, unsigned: boolean) {
    let value;
    switch (size) {
      case 1:
        value = unsigned ? this.readUInt8() : this.readInt8();
        break;
      case 2:
        value = unsigned ? this.readUInt16() : this.readInt16();
        break;
      case 4:
        value = unsigned ? this.readUInt32() : this.readInt32();
        break;
      case 8:
        value = unsigned ? this.readUInt64() : this.readInt64();
        break;
      default:
        throw new Error("Invalid variable size");
    }

    return value;
  }

  private checkSize(size: number) {
    // Check weather we have enough data
    if (this._buffer.length < size)
      throw new Error("Not enough data to read a number");
  }

  private remove(size: number) {
    this._buffer = this._buffer.subarray(size);
  }

  /**
   * getBuffer
   * @returns The buffer.
   */
  public getBuffer() {
    return this._buffer;
  }

  /**
   * getSize
   * @returns {number} - The size of the buffer.
   */
  public getSize() {
    return this._buffer.length;
  }

  /**
   * getEndian
   * @returns {Endian} - The endianness.
   */
  public getEndian() {
    return this._endian;
  }

  /**
   * readChar
   * @returns A char.
   */
  public readChar() {
    const size = FileMapping.getVarTypeSize(VarType.char);
    return new Char(Number(this.readNumber(size, false)));
  }

  /**
   * readChar16
   * @returns A char16_t.
   */
  public readChar16() {
    const size = FileMapping.getVarTypeSize(VarType.char16_t);
    return new Char(Number(this.readNumber(size, true)));
  }

  /**
   * readChar32
   * @returns A char32_t.
   */
  public readChar32() {
    const size = FileMapping.getVarTypeSize(VarType.char32_t);
    return new Char(Number(this.readNumber(size, true)));
  }

  /**
   * readWideChar
   * @returns A wchar_t.
   */
  public readWideChar() {
    const size = FileMapping.getVarTypeSize(VarType.wchar_t);
    return new Char(Number(this.readNumber(size, false)));
  }

  /**
   * readUnsignedChar
   * @returns A unsigned char.
   */
  public readUnsignedChar() {
    const size = FileMapping.getVarTypeSize(VarType.unsigned_char);
    return Number(this.readNumber(size, true));
  }

  /**
   * readShortInt
   * @returns A short int.
   */
  public readShortInt() {
    const size = FileMapping.getVarTypeSize(VarType.short_int);
    return Number(this.readNumber(size, false));
  }

  /**
   * readInt
   * @returns A int.
   */
  public readInt() {
    const size = FileMapping.getVarTypeSize(VarType.int);
    return Number(this.readNumber(size, false));
  }

  /**
   * readLongInt
   * @returns A long int.
   */
  public readLongInt() {
    const size = FileMapping.getVarTypeSize(VarType.long_int);
    return this.readNumber(size, false);
  }

  /**
   * readLongLongInt
   * @returns A long long int.
   */
  public readLongLongInt() {
    const size = FileMapping.getVarTypeSize(VarType.long_long_int);
    return BigInt(this.readNumber(size, false));
  }

  /**
   * readUnsignedShortInt
   * @returns A unsigned short int.
   */
  public readUnsignedShortInt() {
    const size = FileMapping.getVarTypeSize(VarType.unsigned_short_int);
    return Number(this.readNumber(size, true));
  }

  /**
   * readUnsignedInt
   * @returns A unsigned int.
   */
  public readUnsignedInt() {
    const size = FileMapping.getVarTypeSize(VarType.unsigned_int);
    return Number(this.readNumber(size, true));
  }

  /**
   * readUnsignedLongInt
   * @returns A unsigned long int.
   */
  public readUnsignedLongInt() {
    const size = FileMapping.getVarTypeSize(VarType.unsigned_long_int);
    return this.readNumber(size, true);
  }

  /**
   * readUnsignedLongLongInt
   * @returns A unsigned long long int.
   */
  public readUnsignedLongLongInt() {
    const size = FileMapping.getVarTypeSize(VarType.unsigned_long_long_int);
    return BigInt(this.readNumber(size, true));
  }

  /**
   * readInt8
   * @returns A int8_t.
   */
  public readInt8() {
    this.checkSize(1);
    const value = this._buffer.readInt8();
    this.remove(1);
    return value;
  }

  /**
   * readInt16
   * @returns A int16_t.
   */
  public readInt16() {
    this.checkSize(2);
    const value =
      this._endian === Endian.Little
        ? this._buffer.readInt16LE()
        : this._buffer.readInt16BE();
    this.remove(2);
    return value;
  }

  /**
   * readInt32
   * @returns A int32_t.
   */
  public readInt32() {
    this.checkSize(4);
    const value =
      this._endian === Endian.Little
        ? this._buffer.readInt32LE()
        : this._buffer.readInt32BE();
    this.remove(4);
    return value;
  }

  /**
   * readInt64
   * @returns A int64_t.
   */
  public readInt64() {
    this.checkSize(8);
    const value =
      this._endian === Endian.Little
        ? this._buffer.readBigInt64LE()
        : this._buffer.readBigInt64BE();
    this.remove(8);
    return value;
  }

  /**
   * readUInt8
   * @returns A uint8_t.
   */
  public readUInt8() {
    this.checkSize(1);
    const value = this._buffer.readUInt8();
    this.remove(1);
    return value;
  }

  /**
   * readUInt16
   * @returns A uint16_t.
   */
  public readUInt16() {
    this.checkSize(2);
    const value = Endian.Little
      ? this._buffer.readUInt16LE()
      : this._buffer.readUInt16BE();
    this.remove(2);
    return value;
  }

  /**
   * readUInt32
   * @returns A uint32_t.
   */
  public readUInt32() {
    this.checkSize(4);
    const value = Endian.Little
      ? this._buffer.readUInt32LE()
      : this._buffer.readUInt32BE();
    this.remove(4);
    return value;
  }

  /**
   * readUInt64
   * @returns A uint64_t.
   */
  public readUInt64() {
    this.checkSize(8);
    const value = Endian.Little
      ? this._buffer.readBigUint64LE()
      : this._buffer.readBigUint64BE();
    this.remove(8);
    return value;
  }

  /**
   * readFloat
   * @returns A float.
   */
  public readFloat() {
    this.checkSize(4);
    const value =
      this._endian === Endian.Little
        ? this._buffer.readFloatLE()
        : this._buffer.readFloatBE();
    this.remove(4);
    return value;
  }

  /**
   * readDouble
   * @returns A double.
   */
  public readDouble() {
    this.checkSize(8);
    const value =
      this._endian === Endian.Little
        ? this._buffer.readDoubleLE()
        : this._buffer.readDoubleBE();
    this.remove(8);
    return value;
  }

  /**
   * readBool
   * @returns A bool.
   */
  public readBool() {
    const size = FileMapping.getVarTypeSize(VarType.bool);
    return this.readNumber(size, true) === 1;
  }
}

export default BufferReader;
