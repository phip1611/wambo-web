import BigNumber from 'bignumber.js';
import {
  bigNumberAsDoubleToIntegerHexBits,
  bigNumberAsFloatToIntegerHexBits,
  bigNumberWholePartBitsToF32Value
} from './ieee754-convert.util';

describe('ieee754-convert', () => {

  it('should convert to f32 value', () => {
    const bitStr = '0x40a00000';
    const num = new BigNumber(bitStr);
    const value = bigNumberWholePartBitsToF32Value(num);
    expect(value.toString()).toEqual('5');
  });

  it('should convert decimal value to f32 integer bits', () => {
    const num1 = new BigNumber(5);
    const bitStr1 = bigNumberAsFloatToIntegerHexBits(num1);
    expect(bitStr1).toEqual('0x40a00000');


    const num2 = new BigNumber(-3.141);
    const bitStr2 = bigNumberAsFloatToIntegerHexBits(num2);
    expect(bitStr2).toEqual('0xc0490625');

    const num3 = new BigNumber(NaN);
    const bitStr3 = bigNumberAsFloatToIntegerHexBits(num3);
    // this depends on implementation in JavaScript
    // f32 has thousands of NaN values
    // from 0x7fc00000 to 0x7fffffff
    expect(bitStr3).toEqual('0x7fc00000');
  });

  it('should convert decimal value to f32 integer bits', () => {
    const num1 = new BigNumber(5);
    const bitStr1 = bigNumberAsDoubleToIntegerHexBits(num1);
    expect(bitStr1).toEqual('0x4014000000000000');

    const num2 = new BigNumber(-3.141);
    const bitStr2 = bigNumberAsDoubleToIntegerHexBits(num2);
    expect(bitStr2).toEqual('0xc00920c49ba5e354');

    const num3 = new BigNumber(NaN);
    const bitStr3 = bigNumberAsDoubleToIntegerHexBits(num3);
    // this depends on implementation in JavaScript
    // f64 has thousands of NaN values
    // from 0x7ff8000000000000 to 0x7FFFFFFFFFFFFFFF
    expect(bitStr3).toEqual('0x7ff8000000000000');
  });


});
