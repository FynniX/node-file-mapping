import { beforeEach, describe, expect, test } from "@jest/globals";
import { BufferWriter } from "./BufferWriter.js";
import { FileMapping } from "./FileMapping.js";
import { VarType } from "../enums/VarType.js";
import { Char } from "./Char.js";

let writer: BufferWriter | null = null;
beforeEach(() => {
  writer = new BufferWriter();
});

describe("Test the BufferWriter class", () => {
  test("Validate the writeChar method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.char);
    writer?.writeChar(new Char(Math.floor(Math.random() * 100)));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeChar16 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.char16_t);
    writer?.writeChar16(new Char(Math.floor(Math.random() * 100)));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeChar32 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.char32_t);
    writer?.writeChar32(new Char(Math.floor(Math.random() * 100)));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeWideChar method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.wchar_t);
    writer?.writeWideChar(new Char(Math.floor(Math.random() * 100)));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUnsignedChar method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_char);
    writer?.writeUnsignedChar(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeShortInt method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.short_int);
    writer?.writeShortInt(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeInt method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.int);
    writer?.writeInt(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeLongInt method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.long_int);
    writer?.writeLongInt(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeLongLongInt method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.long_long_int);
    writer?.writeLongLongInt(BigInt(Math.floor(Math.random() * 100)));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUnsignedShortInt method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_short_int);
    writer?.writeUnsignedShortInt(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUnsignedInt method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_int);
    writer?.writeUnsignedInt(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUnsignedLongInt method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_long_int);
    writer?.writeUnsignedLongInt(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUnsignedLongLongInt method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.unsigned_long_long_int);
    writer?.writeUnsignedLongLongInt(BigInt(Math.floor(Math.random() * 100)));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeInt8 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.int8_t);
    writer?.writeInt8(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeInt16 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.int16_t);
    writer?.writeInt16(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeInt32 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.int32_t);
    writer?.writeInt32(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeInt64 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.int64_t);
    writer?.writeInt64(BigInt(Math.floor(Math.random() * 100)));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUInt8 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.uint8_t);
    writer?.writeUInt8(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUInt16 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.uint16_t);
    writer?.writeUInt16(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUInt32 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.uint32_t);
    writer?.writeUInt32(Math.floor(Math.random() * 100));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeUInt64 method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.uint64_t);
    writer?.writeUInt64(BigInt(Math.floor(Math.random() * 100)));
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeFloat method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.float);
    writer?.writeFloat(Math.floor(Math.random() * 100) + 0.1);
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeDouble method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.double);
    writer?.writeDouble(Math.floor(Math.random() * 100) + 0.1);
    expect(writer?.getSize()).toBe(size);
  });

  test("Validate the writeBool method", () => {
    expect(writer).not.toBeNull();
    expect(writer?.getSize()).toBe(0);
    const size = FileMapping.getVarTypeSize(VarType.bool);
    writer?.writeBool(Math.random() === 1);
    expect(writer?.getSize()).toBe(size);
  });
});
