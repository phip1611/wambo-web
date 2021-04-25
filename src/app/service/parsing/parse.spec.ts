import BigNumber from 'bignumber.js';
import { parseNumberInput } from './parse';

describe('parse test', () => {

  it('should not accept input', () => {
    let threwError;
    const inputs = [
      'faf',
      '  ',
      '131,141',
      '131..1414',
      '131.14.14',
      '-...',
      '-1.3.3.4',
      '-1.3.'
    ];
    inputs.forEach(input => {
      // expect().toThrowError() doesn't work :(
      try {
        parseNumberInput(input);
        threwError = false;
      } catch (e) {
        threwError = true;
      }
      expect(threwError).toBeTrue();
    });
  });

  it('properly should parse input', () => {
    const res1 = parseNumberInput('-0x3.14');
    expect(res1).not.toBeNull();
    expect(res1.sign).toBeTrue();
    expect(res1.signedNumericValue).toEqual(new BigNumber('-0x3.14'));
    expect(res1.unsignedNumericValue).toEqual(new BigNumber('0x3.14'));
    expect(res1.unsignedWholePart).toEqual(new BigNumber(0x3));
    expect(res1.unsignedNumericValue).toEqual(new BigNumber('0x3.14'));
    expect(res1.unsignedFractionPart).toEqual(new BigNumber('0x0.14'));
  });




});
