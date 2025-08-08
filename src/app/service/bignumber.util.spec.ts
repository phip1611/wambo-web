import BigNumber from 'bignumber.js';
import { splitBigNumberToWholeAndMaybeFractionPart } from './bignumber.util';

describe('splitBigNumberToWholeAndMaybeFractionPart', () => {
  it('bignumber with whole party only', () => {
    const inputBN = new BigNumber(7);
    const expectedBN = new BigNumber(7);

    const [wholePartBN, maybeFractionPartBN] =
      splitBigNumberToWholeAndMaybeFractionPart(inputBN);
    expect(wholePartBN).toEqual(expectedBN);
    expect(maybeFractionPartBN).toBeNull();
  });

  it('bignumber with fraction part', () => {
    expect(
      splitBigNumberToWholeAndMaybeFractionPart(new BigNumber(3.141)),
    ).toEqual([new BigNumber(3), new BigNumber(0.141)]);
  });
});
