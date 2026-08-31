import BigNumber from 'bignumber.js';
import {
  toSInt16,
  toSInt32,
  toSInt64,
  toSInt8,
  toUInt16,
  toUInt32,
  toUInt64,
  toUInt8,
} from './int-convert.util';

describe('int-convert', () => {
  it('should cut value to uint8', () => {
    // note: we don't assign here directly bits into memory
    // 0b100000000 is just like "+ 128"
    const num1 = new BigNumber(0b10000000);
    const conv1 = toUInt8(num1);
    expect(conv1.toString()).toEqual('128');

    const num2 = new BigNumber(256);
    const conv2 = toUInt8(num2);
    expect(conv2.toString()).toEqual('0');
  });

  it('should cut value to uint16', () => {
    const num1 = new BigNumber(0b10000000000000000);
    const conv1 = toUInt16(num1);
    expect(conv1.toString()).toEqual('0');

    const num2 = new BigNumber(256);
    const conv2 = toUInt16(num2);
    expect(conv2.toString()).toEqual('256');
  });

  it('should cut value to uint32', () => {
    const num1 = new BigNumber('0x1ffffffff');
    const conv1 = toUInt32(num1);
    expect(conv1.toString()).toEqual((0xffffffff).toString());

    const num2 = new BigNumber(256);
    const conv2 = toUInt32(num2);
    expect(conv2.toString()).toEqual('256');
  });

  it('should handle signed values correctly', () => {
    expect(toUInt8(new BigNumber(255)).toString()).toEqual('255');
    expect(toSInt8(new BigNumber(128)).toString()).toEqual('-128');
    expect(toSInt8(new BigNumber(255)).toString()).toEqual('-1');
    expect(toSInt8(new BigNumber(256)).toString()).toEqual('0');
    expect(toSInt16(new BigNumber('0xffff')).toString()).toEqual('-1');
    expect(toSInt32(new BigNumber('0xffffffff')).toString()).toEqual('-1');
    expect(toUInt64(new BigNumber('0xffffffffffffffff')).toString(16)).toEqual(
      'ffffffffffffffff',
    );
    expect(toSInt64(new BigNumber('0xffffffffffffffff')).toString()).toEqual(
      '-1',
    );
  });
});
