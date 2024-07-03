import { beforeEach, describe, expect, test } from "@jest/globals";
import { BufferWriter } from "./BufferWriter.js";
import { BufferReader } from "./BufferReader.js";
import { FileMapping } from "./FileMapping.js";
import { VarType } from "../enums/VarType.js";
import { Char } from "./Char.js";

let writer: BufferWriter | null = null;
beforeEach(() => {
  writer = new BufferWriter();
});

describe("Test the BufferReader class", () => {
  test("Validate the readChar method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.char);
    const data = new Char(Math.floor(Math.random() * 100));
    writer?.writeChar(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readChar().toString()).toBe(data.toString());
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readChar16 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.char16_t);
    const data = new Char(Math.floor(Math.random() * 100));
    writer?.writeChar16(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readChar16().toString()).toBe(data.toString());
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readChar32 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.char32_t);
    const data = new Char(Math.floor(Math.random() * 100));
    writer?.writeChar32(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readChar32().toString()).toBe(data.toString());
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readWideChar method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.wchar_t);
    const data = new Char(Math.floor(Math.random() * 100));
    writer?.writeWideChar(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readWideChar().toString()).toBe(data.toString());
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUnsignedChar method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_char);
    writer?.writeUnsignedChar(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readUnsignedChar()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readShortInt method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.short_int);
    writer?.writeShortInt(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readShortInt()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readInt method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.int);
    writer?.writeInt(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readInt()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readLongInt method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.long_int);
    writer?.writeLongInt(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(Number(reader.readLongInt())).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readLongLongInt method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = BigInt(Math.floor(Math.random() * 100));
    const size = FileMapping.getVarTypeSize(VarType.long_long_int);
    writer?.writeLongLongInt(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readLongLongInt()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUnsignedShortInt method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_short_int);
    writer?.writeUnsignedShortInt(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readUnsignedShortInt()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUnsignedInt method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_int);
    writer?.writeUnsignedInt(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readUnsignedInt()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUnsignedLongInt method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_long_int);
    writer?.writeUnsignedLongInt(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(Number(reader.readUnsignedLongInt())).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUnsignedLongLongInt method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = BigInt(Math.floor(Math.random() * 100));
    const size = FileMapping.getVarTypeSize(VarType.unsigned_long_long_int);
    writer?.writeUnsignedLongLongInt(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readUnsignedLongLongInt()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readInt8 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.int8_t);
    writer?.writeInt8(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readInt8()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readInt16 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.int16_t);
    writer?.writeInt16(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readInt16()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readInt32 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.int32_t);
    writer?.writeInt32(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readInt32()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readInt64 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = BigInt(Math.floor(Math.random() * 100));
    const size = FileMapping.getVarTypeSize(VarType.int64_t);
    writer?.writeInt64(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readInt64()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUInt8 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.uint8_t);
    writer?.writeInt8(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readUInt8()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUInt16 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.uint16_t);
    writer?.writeUInt16(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readUInt16()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUInt32 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100);
    const size = FileMapping.getVarTypeSize(VarType.uint32_t);
    writer?.writeUInt32(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readUInt32()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readUInt64 method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = BigInt(Math.floor(Math.random() * 100));
    const size = FileMapping.getVarTypeSize(VarType.uint64_t);
    writer?.writeUInt64(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readUInt64()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readFloat method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100) + 0.1;
    const size = FileMapping.getVarTypeSize(VarType.float);
    writer?.writeFloat(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readFloat().toFixed(1)).toBe(data.toFixed(1));
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readDouble method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.floor(Math.random() * 100) + 0.1;
    const size = FileMapping.getVarTypeSize(VarType.double);
    writer?.writeDouble(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readDouble().toFixed(1)).toBe(data.toFixed(1));
    expect(reader.getSize()).toBe(0);
  });

  test("Validate the readBool method", () => {
    // Write example buffer
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const data = Math.random() === 1;
    const size = FileMapping.getVarTypeSize(VarType.bool);
    writer?.writeBool(data);
    expect(writer?.getSize()).toBe(size);

    // Check weather reader sees the example buffer
    const reader = new BufferReader(writer?.getBuffer() as Buffer);
    expect(reader.getSize()).toBe(size);
    expect(reader.readBool()).toBe(data);
    expect(reader.getSize()).toBe(0);
  });
});
