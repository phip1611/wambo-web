import { splitBigNumberToWholeAndMaybeFractionPart } from '../bignumber.util';
import { NumeralSystem, parseNumberStringAsNumeralSystem, parseNumeralSystemFromString } from './ns';
import { ParseResult } from './parse-result';
import { fromUnitToBase, parseUnitFromString, Unit } from './unit';

export const NUMBER_INPUT_REGEX = new RegExp([
  '^',                                      // string begin
  '(?<sign>-)?',                           // optional sign
  '(?<ns>0(?:b|o|x))?',                    // optional numeral system
  // '(?<whole_part>[0-9abcdef]+)',        // mandatory whole part
  // '(?<fraction_part>\\.[0-9abcdef]+)?', // optional fraction part
  '(?<numeric_value>',                      // optional numeric value
  '[0-9abcdef]+',
  '(?:\\.[0-9abcdef]+)?',
  ')?',
  '(?<unit>[a-z]{1,4})?',                  // optional unit
  '$',                                      // string end
].join(''));

// Parses the input. Expects normalized input without underscores,
// a maximum of one ".", no ",", and no "_".
export function parseNumberInput(normalizedParsingInput: string): ParseResult {
  console.log('normalized parsing input: ', normalizedParsingInput);

  const match = normalizedParsingInput.match(NUMBER_INPUT_REGEX);
  if (!match || !match.groups) {
    throw new Error(`Doesn't match RegEx`);
  }

  // here are only the values that need to be
  // further parsed (except sign because it is too basic)

  // sign is optional
  const sign: boolean = !!match.groups.sign;
  const optNsString: string | null = match.groups.ns ?? null;
  const numericValueString: string = match.groups.numeric_value;
  if (!numericValueString) {
    throw new Error(`Numeric Value is missing!`);
  }
  const optUnitString: string | null = match.groups.unit ?? null;

  const unit = parseUnitFromString(optUnitString);
  const ns = parseNumeralSystemFromString(optNsString);
  const numericValueBaseUnit = parseNumberStringAsNumeralSystem(ns, numericValueString);
  const unsignedNumericValue = fromUnitToBase(unit, numericValueBaseUnit);

  console.log(`ns=${NumeralSystem[ns]}, unit=${Unit[unit]}, normalized decimal value=${unsignedNumericValue.toString()}`);

  const [wholePart, fractionPart] = splitBigNumberToWholeAndMaybeFractionPart(unsignedNumericValue);

  // this is more like a unit test here.. actually I could move this out to a test
  if (unsignedNumericValue.isNegative()) {
    throw new Error('numeric value is negative! There must be an error in the code. We handle negative numbers via an extra flag! bignumber must be positive');
  }
  if (wholePart.isNegative()) {
    throw new Error('wholePart is negative! There must be an error in the code. We handle negative numbers via an extra flag! bignumber must be positive');
  }
  if (fractionPart?.isNegative()) {
    throw new Error('fractionPart is negative! There must be an error in the code. We handle negative numbers via an extra flag! bignumber must be positive');
  }

  // may be negative
  const signedNumericValue = sign ? unsignedNumericValue.negated() : unsignedNumericValue;

  return {
    sign,
    ns,
    unit,
    signedNumericValue,
    unsignedNumericValue,
    unsignedWholePart: wholePart,
    unsignedFractionPart: fractionPart,
  };
}
