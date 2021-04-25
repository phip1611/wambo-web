import BigNumber from 'bignumber.js';
import { bignumberWholePartToUnsignedBitStringOfLength, BitLength } from './bit.util';

/**
 * Converts a {@link BigNumber} to the value it would have
 * if the unsigned integer bits (of the whole part) would
 * be interpreted as signed int of 8 bit.
 * @param num input number {@link BigNumber}
 * @return Returns a {@link BigNumber} that holds the value that a signed 8 bit int
 *         interpretation of the original input (whole part only) would have.
 */
export function toSInt8(num: BigNumber): BigNumber {
  const u8 = toUInt8(num);
  return truncateIfSignBitIsSet(u8, BitLength.B8);
}

/**
 * Converts a {@link BigNumber} to the value it would have
 * if the unsigned integer bits (of the whole part) would
 * be interpreted as signed int of 16 bit.
 * @param num input number {@link BigNumber}
 * @return Returns a {@link BigNumber} that holds the value that a signed 16 bit int
 *         interpretation of the original input (whole part only) would have.
 */
export function toSInt16(num: BigNumber): BigNumber {
  const u16 = toUInt16(num);
  return truncateIfSignBitIsSet(u16, BitLength.B16);
}

/**
 * Converts a {@link BigNumber} to the value it would have
 * if the unsigned integer bits (of the whole part) would
 * be interpreted as signed int of 32 bit.
 * @param num input number {@link BigNumber}
 * @return Returns a {@link BigNumber} that holds the value that a signed 32 bit int
 *         interpretation of the original input (whole part only) would have.
 */
export function toSInt32(num: BigNumber): BigNumber {
  const u32 = toUInt32(num);
  return truncateIfSignBitIsSet(u32, BitLength.B32);
}

/**
 * Converts a {@link BigNumber} to the value it would have
 * if the unsigned integer bits (of the whole part) would
 * be interpreted as signed int of 64 bit.
 * @param num input number {@link BigNumber}
 * @return Returns a {@link BigNumber} that holds the value that a signed 64 bit int
 *         interpretation of the original input (whole part only) would have.
 */
export function toSInt64(num: BigNumber): BigNumber {
  const u64 = toUInt64(num);
  return truncateIfSignBitIsSet(u64, BitLength.B64);
}

/**
 * Takes a {@link BigNumber} from the corresponding toUInt*()-function and
 * interprets it as signed integer of the given length (8, 16, 32, or 64 bit).
 * @param unsignedInt a {@link BigNumber} from the corresponding toUInt*()-function
 * @param bitLength 8, 16, 32, or 64. Determines whats the most significant bit (=sign) is.
 * @return Returns a {@link BigNumber} that holds the value that a signed X bit int
 *         interpretation of the original input (whole part only) would have.
 */
function truncateIfSignBitIsSet(unsignedInt: BigNumber, bitLength: BitLength): BigNumber {
  const unsignedIntegerBitStr = bignumberWholePartToUnsignedBitStringOfLength(unsignedInt, bitLength);

  const prefix = '0b';
  // bit string contains for example '0b10000000' => MSB is 1 for i8 => sign
  const hasSign = unsignedIntegerBitStr[prefix.length] === '1';
  if (hasSign) {
    // in this case: subtract 2^bitLength from value
    // see Two's Complement on wikipedia
    return unsignedInt.minus(new BigNumber(2).pow(bitLength));
  } else {
    return unsignedInt;
  }
}

/**
 * Converts a {@link BigNumber} to the value it would have
 * if the unsigned integer bits (of the whole part) would
 * be interpreted as signed int of 8 bit.
 * @param num input number {@link BigNumber}
 * @return Returns a {@link BigNumber} that holds the value that a unsigned 8 bit int
 *         interpretation of the original input (whole part only) would have.
 */
export function toUInt8(num: BigNumber): BigNumber {
  const bitStr = bignumberWholePartToUnsignedBitStringOfLength(num, BitLength.B8);
  // BigNumber can handle '0b'-prefix
  return new BigNumber(bitStr);
}

/**
 * Converts a {@link BigNumber} to the value it would have
 * if the unsigned integer bits (of the whole part) would
 * be interpreted as signed int of 16 bit.
 * @param num input number {@link BigNumber}
 * @return Returns a {@link BigNumber} that holds the value that a unsigned 16 bit int
 *         interpretation of the original input (whole part only) would have.
 */
export function toUInt16(num: BigNumber): BigNumber {
  const bitStr = bignumberWholePartToUnsignedBitStringOfLength(num, BitLength.B16);
  // BigNumber can handle '0b'-prefix
  return new BigNumber(bitStr);
}

/**
 * Converts a {@link BigNumber} to the value it would have
 * if the unsigned integer bits (of the whole part) would
 * be interpreted as signed int of 32 bit.
 * @param num input number {@link BigNumber}
 * @return Returns a {@link BigNumber} that holds the value that a unsigned 32 bit int
 *         interpretation of the original input (whole part only) would have.
 */
export function toUInt32(num: BigNumber): BigNumber {
  const bitStr = bignumberWholePartToUnsignedBitStringOfLength(num, BitLength.B32);
  // BigNumber can handle '0b'-prefix
  return new BigNumber(bitStr);
}

/**
 * Converts a {@link BigNumber} to the value it would have
 * if the unsigned integer bits (of the whole part) would
 * be interpreted as signed int of 64 bit.
 * @param num input number {@link BigNumber}
 * @return Returns a {@link BigNumber} that holds the value that a unsigned 64 bit int
 *         interpretation of the original input (whole part only) would have.
 */
export function toUInt64(num: BigNumber): BigNumber {
  const bitStr = bignumberWholePartToUnsignedBitStringOfLength(num, BitLength.B64);
  // BigNumber can handle '0b'-prefix
  return new BigNumber(bitStr);
}
