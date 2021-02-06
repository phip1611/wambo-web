/**
 * Like <pre>.substr()</pre> but backwards.
 * @param str Input string
 * @param from index in original string
 * @param len length to go backwards for substring
 */
export function back_substr(str: string, from: number, len: number): string {
  return str.substring(from, from - len);
}

/**
 * Takes a string and either shrinks it to the exact length from
 * the right or fills zeroes on the left side.
 *
 * @param str string
 * @param len length > 0
 */
export function stringToExactLengthFromRightOrPadZerosLeft(str: string, len: number): string {
  if (str.length < len) {
    str = '0'.repeat(len - str.length) + str;
  } else if (str.length > len) {
    str = back_substr(str, str.length, len);
  }

  return str;
}
