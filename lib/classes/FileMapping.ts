import {VarType} from "../enums/VarType.js";
import {AddonInstance} from "../interface/AddonInstance.js";
import BufferWriter from "./BufferWriter.js";
import {Endian} from "../enums/Endian.js";
import BufferReader from "./BufferReader.js";

const addon = require('../../build/Release/mapped-buffer')

export class FileMapping {
    private readonly _addonInstance: AddonInstance

    /**
     * @name bufferPath
     * @description The path of the buffer.
     */
    public readonly bufferPath: string

    /**
     * @name bufferSize
     * @description The size of the buffer in bytes.
     */
    public readonly bufferSize: number = 0

    /**
     * @constructor
     * @name Addon
     * @param bufferPath The path of the buffer.
     * @param bufferSize The size of the buffer.
     */
    constructor(bufferPath: string, bufferSize: number) {
        if (bufferPath.length <= 0)
            throw new Error('bufferPath cannot be empty');

        if (bufferSize <= 0)
            throw new Error('bufferSize must be greater than 0');

        this.bufferPath = bufferPath
        this.bufferSize = bufferSize
        this._addonInstance = new addon.MappedBuffer(this.bufferPath, this.bufferSize)
    }

    /**
     * @name create
     * @description Creates the buffer.
     */
    public create() {
        this._addonInstance.create()
    }

    /**
     * @name open
     * @description Opens the buffer.
     */
    public open() {
        this._addonInstance.open()
    }

    /**
     * @name read
     * @description Reads the buffer.
     * @returns The buffer.
     */
    public read() {
        return this._addonInstance.read()
    }

    /**
     * @name write
     * @description Writes to the buffer.
     * @param data The new buffer to overwrite the buffer.
     */
    public write(data: Buffer) {
        this._addonInstance.write(data)
    }

    /**
     * @name getBufferReader
     * @param buffer - The buffer to read.
     * @param endian - The endianness of the buffer.
     */
    public static getBufferReader(buffer: Buffer, endian: Endian = Endian.Little) {
        return new BufferReader(buffer, endian)
    }

    /**
     * @name getBufferWrite
     * @param endian - The endianness of the buffer.
     */
    public static getBufferWrite(endian: Endian = Endian.Little) {
        return new BufferWriter(endian)
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

export default FileMapping