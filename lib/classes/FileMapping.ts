import { VarType } from "../enums/VarType.js";
import { AddonInstance } from "../interface/AddonInstance.js";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require("../../build/Release/node-file-mapping");

export class FileMapping {
  private readonly _addonInstance: AddonInstance;

  /**
   * bufferPath
   * The path of the buffer.
   */
  public readonly bufferPath: string;

  /**
   * bufferSize
   * The size of the buffer in bytes.
   */
  public readonly bufferSize: number = 0;

  /**
   * FileMapping
   * @param bufferPath The path of the buffer.
   * @param bufferSize The size of the buffer.
   */
  constructor(bufferPath: string, bufferSize: number) {
    if (bufferPath.length <= 0) throw new Error("bufferPath cannot be empty");

    if (bufferSize <= 0) throw new Error("bufferSize must be greater than 0");

    this.bufferPath = bufferPath;
    this.bufferSize = bufferSize;
    this._addonInstance = new addon.MappedBuffer(
      this.bufferPath,
      this.bufferSize,
    );
  }

  /**
   * create
   * Creates the buffer.
   */
  public create() {
    this._addonInstance.create();
  }

  /**
   * open
   * Opens the buffer.
   */
  public open() {
    this._addonInstance.open();
  }

  /**
   * read
   * Reads the buffer.
   * @returns The buffer.
   */
  public read() {
    return this._addonInstance.read();
  }

  /**
   * write
   * Writes to the buffer.
   * @param data The new buffer to overwrite the buffer.
   */
  public write(data: Buffer) {
    this._addonInstance.write(data);
  }

  /**
   * close
   * Closes the buffer.
   */
  public close() {
    this._addonInstance.close();
  }

  /**
   * Returns the size of the given variable type
   *
   * @param {VarType} varType - The variable type to get the size of.
   */
  public static getVarTypeSize(varType: VarType): number {
    return addon.getVarTypeSize(varType);
  }
}
