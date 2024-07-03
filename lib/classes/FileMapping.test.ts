import { afterEach, describe, expect, test } from "@jest/globals";
import { FileMapping } from "./FileMapping.js";
import BufferWriter from "./BufferWriter.js";
import BufferReader from "./BufferReader.js";

const fileMapping = new FileMapping("test", 4);
afterEach(() => {
  fileMapping.close();
});

describe("Test the FileMapping class", () => {
  test("Try to open a file mapping", () => {
    const fileMappingOrigin = new FileMapping("test", 4);
    expect(() => fileMappingOrigin.create()).not.toThrow();
    expect(() => fileMapping.open()).not.toThrow();
  });

  test("Try to create a file mapping", () => {
    expect(() => fileMapping.create()).not.toThrow();
  });

  test("Try to read a file mapping", () => {
    // Write demo data
    const fileMappingOrigin = new FileMapping("test", 4);
    expect(() => fileMappingOrigin.create()).not.toThrow();
    const writer = new BufferWriter();
    const data = Math.floor(Math.random() * 100);
    writer.writeInt(data);
    expect(() => fileMappingOrigin.write(writer.getBuffer())).not.toThrow();

    // Read from mapping
    expect(() => fileMapping.open()).not.toThrow();
    let buffer: Buffer = Buffer.alloc(0);
    expect(() => {
      buffer = fileMapping.read();
    }).not.toThrow();

    expect(buffer).not.toBeNull();
    expect(buffer.length).toBe(4);

    // Is the data the same
    const reader = new BufferReader(buffer);
    expect(reader.readInt()).toBe(data);
  });

  test("Try to write a file mapping", () => {
    // Write to mapping
    expect(() => fileMapping.create()).not.toThrow();
    const writer = new BufferWriter();
    const data = Math.floor(Math.random() * 100);
    writer.writeInt(data);
    expect(() => fileMapping.write(writer.getBuffer())).not.toThrow();
  });

  test("Try to close a file mapping", () => {
    expect(() => fileMapping.create()).not.toThrow();
    expect(() => fileMapping.close()).not.toThrow();
  });
});
