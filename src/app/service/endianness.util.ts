import {BitLength} from './bit.util';

export enum Endianness {
  /**
   * Highest byte is stored at lowest address/lowest index.
   */
  BigEndian,
  /**
   * Lowest byte is stored at lowest address/lowest index.
   */
  LittleEndian,
}

/**
 * Returns the endianness of the javascript environment.
 * This is not necessarily the endianness of your processor
 * because the javascript runtime could do its own magic here.
 * But I'm not sure on this. This is probably somewhere
 * deep inside the javascript spac.
 */
export function getSystemEndianness(): Endianness {
  const arrayBuffer = new ArrayBuffer(2);
  const uint8Array = new Uint8Array(arrayBuffer);
  const uint16array = new Uint16Array(arrayBuffer);
  uint16array[0] = 0xaabb;
  // if lowest byte (0xbb) is stored first
  // then we have little Endian
  if (uint8Array[0] === 0xbb) {
    return Endianness.LittleEndian;
  } else /*if (uint8Array[0] === 0xAA)*/ {
    return Endianness.BigEndian;
  } /*else {
    // here be dragons
  }*/

}

/**
 * Swaps the endianness of the bytes inside the buffer.
 * @param buf ArrayBuffer
 */
export function swapEndianness(buf: ArrayBuffer): void {
  const u8Arr = new Uint8Array(buf);

  // nothing to do
  if (u8Arr.length === BitLength.B8 / 8) {
    return;
  }

  if (u8Arr.length === BitLength.B16 / 8
    || u8Arr.length === BitLength.B32 / 8
    || u8Arr.length === BitLength.B64 / 8) {
    for (let i = 0; i < u8Arr.length / 2; i++) {
      const tmp = u8Arr[i];
      u8Arr[i] = u8Arr[u8Arr.length - 1 - i];
      u8Arr[u8Arr.length - 1 - i] = tmp;
    }
  } else {
    throw new Error(`Only supports 1, 2, 4, or 8 byte.`);
  }
}
