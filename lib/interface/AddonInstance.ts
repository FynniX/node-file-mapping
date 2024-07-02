export interface AddonInstance {
    create(): void
    open(): void
    read(): Buffer | undefined
    write(buffer: Buffer): void
    close(): void
}