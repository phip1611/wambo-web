import { back_substr, stringToExactLengthFromRightOrPadZerosLeft } from './string.util';

describe('string.util', () => {

  it('should return substring backwards', () => {
    expect(back_substr('hallo', 'hallo'.length, 3)).toEqual('llo');
    expect(back_substr('hallo', 'hallo'.length, 5)).toEqual('hallo');
    expect(back_substr('010000000', '010000000'.length, 8)).toEqual('10000000');
  });

  it('stringToExactLengthFromRightOrPadZerosLeft', () => {
    const actual1 = stringToExactLengthFromRightOrPadZerosLeft('0', 2);
    const actual2 = stringToExactLengthFromRightOrPadZerosLeft('ab', 1);
    expect(actual1).toEqual('00');
    expect(actual2).toEqual('b');
  });

});
