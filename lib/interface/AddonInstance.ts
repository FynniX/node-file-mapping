export interface AddonInstance {
  create(): void;
  open(): void;
  read(): Buffer;
  write(buffer: Buffer): void;
  close(): void;
}
