import BigNumber from 'bignumber.js';

const FRACTION_SEPARATOR = '.';

/**
 * Splits a big number into its whole part and maybe its fraction part.
 * The original object is not changed.
 *
 * Examples:
 *   BigNumber(3.14) => [BigNumber(3), BigNumber(0.14)]
 *   BigNumber(7) => [BigNumber(7), null]
 * @param num bignumber that may or may not include a fraction part
 */
export function splitBigNumberToWholeAndMaybeFractionPart(
  num: BigNumber,
): [BigNumber, BigNumber | null] {
  // BigNumber(3.141) => "3.141"
  const numString = num.toString();
  const split = numString.split(FRACTION_SEPARATOR);
  const wholePartString = split[0];
  const fractionPartString = split[1]
    ? `0${FRACTION_SEPARATOR}${split[1]}`
    : null;
  const wholePart = new BigNumber(wholePartString);
  const maybeFractionPart = fractionPartString
    ? new BigNumber(fractionPartString)
    : null;
  return [wholePart, maybeFractionPart];
}
