import BigNumber from 'bignumber.js';
import { NumeralSystem } from './ns';
import { Unit } from './unit';

export interface ParseResult {
  // Unit of input
  unit: Unit;
  // Numeral System of input
  ns: NumeralSystem;
  // Always unsigned (positive)
  unsignedNumericValue: BigNumber;
  // negative, if property "sign" is true
  // otherwise positive and equal to
  // property "unsignedNumericValue"
  signedNumericValue: BigNumber;
  // wholePart of `numericValue`
  unsignedWholePart: BigNumber;
  // optional fraction part of `numericValue`
  // TODO should be okay if this is just a boolean: hasFraction
  unsignedFractionPart: BigNumber | null;
  // true: negative, false: positive
  sign: boolean;
}
