import BigNumber from 'bignumber.js';
import { bignumberWholePartToUnsignedBitStringOfLength, BitLength, fixedLengthBitStringByteArrayLE } from './bit.util';
import { stringToExactLengthFromRightOrPadZerosLeft } from './string.util';

/**
 * Takes the first 32 bits from the whole part of the given bignumber.
 * It interprets them as f32 (float) and returns the value it would have in
 * f32 interpretation as BigNumber.
 * @param num bignumber
 */
export function bigNumberWholePartBitsToF32Value(num: BigNumber): BigNumber {
  // BigNumber of "3.141" would become a binary 32 bit long string of decimal "3"
  const wholePartBits = bignumberWholePartToUnsignedBitStringOfLength(num, BitLength.B32);
  // all bytes to a array of bit strings (WITHOUT 0b prefix)
  const bytes = fixedLengthBitStringByteArrayLE(wholePartBits);

  // assigns all bytes to the ArrayBuffer and returns it
  const buffer = putIntegerBytesIntoBuffer(bytes);
  const f32Arr = new Float32Array(buffer);
  // with the ArrayBuffer we have kind of raw mem access in javascript.
  // First we've put the bytes into the memory. Now we use Float32Array
  // to read four bytes as float (f32) IEEE-754 interpretation.

  // floatValue is a number, because a "number" (datatype) in Javascript is a double
  // (IEEE-754 64bit), therefore double can store float values.
  const floatValue: number = f32Arr[0];
  return new BigNumber(floatValue);
}

/**
 * Takes the first 32 bits from the whole part of the given bignumber.
 * It interprets them as f64 (double) and returns the value it would have in
 * f64 interpretation as BigNumber.
 * @param num bignumber
 */
export function bigNumberWholePartBitsToF64Value(num: BigNumber): BigNumber {
  // BigNumber of "3.141" would become a binary 64 bit long string of decimal "3"
  const wholePartBits = bignumberWholePartToUnsignedBitStringOfLength(num, BitLength.B64);
  // all bytes to a array of bit strings (WITHOUT 0b prefix)
  const bytes = fixedLengthBitStringByteArrayLE(wholePartBits);

  // assigns all bytes to the ArrayBuffer and returns it
  const buffer = putIntegerBytesIntoBuffer(bytes);
  const f64Arr = new Float64Array(buffer);
  // with the ArrayBuffer we have kind of raw mem access in javascript.
  // First we've put the bytes into the memory. Now we use Float32Array
  // to read four bytes as float (f32) IEEE-754 interpretation.

  // doubleValue is a double (f64), because a "number" (datatype) in Javascript is a double
  const doubleValue = f64Arr[0];
  return new BigNumber(doubleValue);
}

/**
 * Put bytes into a buffer. Each array element is only interpreted as u8, i.e. the lowest byte is taken.
 * If byte[0] is 0xffdd than only 0xdd is used.
 * @param bytes Byte-Array
 */
export function putIntegerBytesIntoBuffer(bytes: number[]): ArrayBuffer {
  // this will be 4 for f32 (float) or 8 for f64 (double)
  const len = bytes.length;

  // ArrayBuffer is kinda like a raw memory access in javascript
  const buffer = new ArrayBuffer(len);
  // We have an Uint8Array at the same location as the buffer
  // this way we can store data byte by byte
  const byteArray = new Uint8Array(buffer);

  // store all bytes in the memory
  for (let i = 0; i < len; i++) {
    byteArray[i] = bytes[i];
  }

  return buffer;
}

/**
 * Takes a big number including sign and fraction part.
 * Returns a 32 bit sting in hex format with 0x prefix that
 * holds the unsigned integer bits. The integer bits describe the closest
 * possible value in float compared to the original bignumber value.
 * There may be a loss due to single precision.
 * @param num bignumber
 */
export function bigNumberAsFloatToIntegerHexBits(num: BigNumber): string {
  // at this point the big number will be already truncated to f64 / double
  const double = num.toNumber();
  // Buffer is like a raw view into memory
  const buffer = new ArrayBuffer(BitLength.B32 / 4);
  // Float32Array: interpret bytes in the memory as f32 (IEEE-754) bits
  const float32Arr = new Float32Array(buffer);
  // UInt32Array: interpret bytes in the memory as unsigned integer bits.
  // Important that we use unsigned here, otherwise the MSB would be interpreted as sign
  const uint32Array = new Uint32Array(buffer);
  // will convert double to float during assignment
  float32Arr[0] = double;
  // now read the same memory as unsigned integer value
  const integerValue = uint32Array[0];
  // to hex string
  const integerBitsHex = integerValue.toString(16);
  // + hex prefix
  return '0x' + integerBitsHex;
}

/**
 * Takes a big number including sign and fraction part.
 * Returns a 64 bit sting in hex format with 0x prefix that
 * holds the unsigned integer bits. The integer bits describe the closest
 * possible value in double compared to the original bignumber value.
 * There may be a loss due to single precision.
 * @param num bignumber
 */
export function bigNumberAsDoubleToIntegerHexBits(num: BigNumber): string {
  // at this point the big number will be already truncated to f64 / double
  const double = num.toNumber();
  // Buffer is like a raw view into memory
  const buffer = new ArrayBuffer(BitLength.B64 / 4);
  // Float64Array: interpret bytes in the memory as f64 (IEEE-754 double precision) bits
  const float32Arr = new Float64Array(buffer);
  float32Arr[0] = double;

  // UInt32Array: interpret bytes in the memory as unsigned integer bits.
  // Important that we use unsigned here, otherwise the MSB would be interpreted as sign
  const uint32Array = new Uint32Array(buffer);

  // now read the same memory as unsigned integer value
  const u32Lower = uint32Array[0];
  const u32Upper = uint32Array[1];

  const bit32LenInHexDigits = 8;

  const u32LowerBitStr = stringToExactLengthFromRightOrPadZerosLeft(
    u32Lower.toString(16),
    bit32LenInHexDigits
  );
  const u32UpperBitStr = stringToExactLengthFromRightOrPadZerosLeft(
    u32Upper.toString(16),
    bit32LenInHexDigits
  );

  // + hex prefix
  return '0x' + u32UpperBitStr + u32LowerBitStr;
}


