import { describe, expect, test } from "@jest/globals";
import { Char } from "./Char.js";

describe("Test the char class", () => {
  test("Validate the char class with valid data", () => {
    const randomNumber = Math.floor(Math.random() * 100);
    const char = new Char(randomNumber);
    expect(char.toNumber()).toBe(randomNumber);
    expect(char.toString()).toBe(String.fromCharCode(randomNumber));
  });

  test("Validate the char class with invalid data", () => {
    expect(() => new Char(65536)).toThrow(Error);
  });
});
