import BigNumber from 'bignumber.js';
import {back_substr, stringToExactLengthFromRightOrPadZerosLeft} from './string.util';

export enum BitLength {
  B8 = 8,
  B16 = 16,
  B32 = 32,
  B64 = 64,
}

/**
 * Transforms BigNumber(1) for example into '0b00000001' or
 * BigNumber(0b100000000) into '0b00000000'. This also uses
 * the absolute value of the number. It doesn't know about
 * negative numbers and just handles everything as unsigned integer.
 * @param num bignumber without fraction part
 * @param len length in bits
 */
export function bignumberWholePartToUnsignedBitStringOfLength(num: BigNumber, len: BitLength): string {
  let bitStr = num.toString(2);
  return '0b' + stringToExactLengthFromRightOrPadZerosLeft(bitStr, len);
}


/**
 * Takes a bitstring and returns it into a byte array in little endian format.
 * This means the least significant bit is stored at the lowest memory location.
 * For example: Input of 0x1234 will become [0x34, 0x12]. 0x12 is the highest byte
 * and 0x23 the lowest.
 *
 * Its okay to return a array of numbers here because Javascript
 * numbers are doubles and can hold all integer values in our needed range without problems.
 * @param bitStr bitstring that has a length of 8, 16, 32, or 64 bit. Can have 0b prefix.
 */
export function fixedLengthBitStringByteArrayLE(bitStr: string): number[] {
  if (bitStr.startsWith('0b')) {
    bitStr = bitStr.substr(2);
  }

  if (bitStr.length % 8 !== 0) {
    throw new Error('Length must be a multiple of 8!');
  }

  const byteCount = bitStr.length / 8;

  const bytes = [];

  // we make the string byte by byte shorter at each iteration
  // we always remove the last 8 bites
  for (let i = 0; i < byteCount; i++) {
    const byteStr = back_substr(bitStr, bitStr.length, 8);
    bitStr = bitStr.substr(0, bitStr.length - 8);
    bytes[i] = +('0b' + byteStr);
  }

  return bytes;
}
