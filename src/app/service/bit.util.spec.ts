import BigNumber from 'bignumber.js';
import { bignumberWholePartToUnsignedBitStringOfLength, BitLength, fixedLengthBitStringByteArrayLE } from './bit.util';

describe('bit.util', () => {

  it('bignumberWholePartToBitStringOfLength', () => {
    expect(
      bignumberWholePartToUnsignedBitStringOfLength(new BigNumber(128), BitLength.B8)
    ).toEqual('0b10000000');

    expect(
      bignumberWholePartToUnsignedBitStringOfLength(new BigNumber(0x100), BitLength.B8)
    ).toEqual('0b00000000');

    expect(
      bignumberWholePartToUnsignedBitStringOfLength(new BigNumber(0x100), BitLength.B16)
    ).toEqual('0b0000000100000000');
  });

  it('fixedLengthBitStringByteArray', () => {
    const input0 = new BigNumber(0xfe);
    const bitStr0 = bignumberWholePartToUnsignedBitStringOfLength(input0, BitLength.B8);
    expect(
      fixedLengthBitStringByteArrayLE(bitStr0)
    ).toEqual([0xfe]);

    const input1 = new BigNumber(0xffee);
    const bitStr1 = bignumberWholePartToUnsignedBitStringOfLength(input1, BitLength.B16);
    expect(
      fixedLengthBitStringByteArrayLE(bitStr1)
    ).toEqual([0xee, 0xff]);

    const input2 = new BigNumber(0x12345678);
    const bitStr2 = bignumberWholePartToUnsignedBitStringOfLength(input2, BitLength.B32);
    expect(
      fixedLengthBitStringByteArrayLE(bitStr2)
    ).toEqual([0x78, 0x56, 0x34, 0x12]);

  });


});
