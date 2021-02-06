import BigNumber from 'bignumber.js';
import * as XRegExp from 'xregexp';

export enum NumeralSystem {
  Binary,
  Octal,
  Dec,
  Hex,
}


export function parseNumberStringAsNumeralSystem(ns: NumeralSystem, input: string, isFraction = false): BigNumber {
  if (isFraction) {
    input = input.split('.')[0];
  }
  switch (ns) {
    case NumeralSystem.Binary: {
      // at this point there can only be at maximum one "." in the string
      const REGEX = XRegExp(`^[01\.]+$`);
      const match = XRegExp.match(input, REGEX);
      if (!match) {
        throw new Error('Binary numbers must only contain digits 0 and 1!');
      }
      // big number has a string constructor that understands the
      // prefixes 0b, 0o, and 0x
      return new BigNumber(`0b${input}`);
    }
    case NumeralSystem.Octal: {
      const REGEX = XRegExp(`^[0-7\.]+$`);
      const match = XRegExp.match(input, REGEX);
      if (!match) {
        throw new Error('Octal numbers must only contain digits 0-7!');
      }
      // big number has a string constructor that understands the
      // prefixes 0b, 0o, and 0x
      return new BigNumber(`0o${input}`);
    }
    case NumeralSystem.Dec: {
      const REGEX = XRegExp(`^[0-9\.]+$`);
      const match = XRegExp.match(input, REGEX);
      if (!match) {
        throw new Error('Decimal numbers must only contain digits 0-9!');
      }
      // big number has a string constructor that understands the
      // prefixes 0b, 0o, and 0x
      return new BigNumber(input);
    }
    case NumeralSystem.Hex: {
      const REGEX = XRegExp(`^[0-9abcdef\.]+$`);
      const match = XRegExp.match(input, REGEX);
      if (!match) {
        throw new Error('Decimal numbers must only contain digits 0-9!');
      }
      // big number has a string constructor that understands the
      // prefixes 0b, 0o, and 0x
      return new BigNumber(`0x${input}`);
    }
  }
}

export function parseNumeralSystemFromString(input: string | null): NumeralSystem {
  switch (input) {
    case undefined:
    case null:
    case '': {
      return NumeralSystem.Dec;
    }
    case '0b': {
      return NumeralSystem.Binary;
    }
    case '0o': {
      return NumeralSystem.Octal;
    }
    case '0x': {
      return NumeralSystem.Hex;
    }
    default: {
      throw new Error(`illegal/unknown numeral system string '${input}'`);
    }
  }

}
