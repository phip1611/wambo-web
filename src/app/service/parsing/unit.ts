import { BigNumber } from 'bignumber.js';

export enum Unit {
  Base,
  Kilo,
  Mega,
  Giga,
  Tera,
  Kibi,
  Mibi,
  Gibi,
  Tebi,
}

export function parseUnitFromString(unitString: string | null): Unit {
  switch (unitString) {
    case undefined:
    case null:
    case '': {
      return Unit.Base;
    }
    case 'k':
    case 'kb': {
      return Unit.Kilo;
    }
    case 'm':
    case 'mb': {
      return Unit.Mega;
    }
    case 'g':
    case 'gb': {
      return Unit.Giga;
    }
    case 't':
    case 'tb': {
      return Unit.Tera;
    }

    case 'ki':
    case 'kib': {
      return Unit.Kibi;
    }
    case 'mi':
    case 'mib': {
      return Unit.Mibi;
    }
    case 'gi':
    case 'gib': {
      return Unit.Gibi;
    }
    case 'ti':
    case 'tib': {
      return Unit.Tebi;
    }
    default: {
      throw new Error(`illegal/unknown unit string '${unitString}'`);
    }
  }
}

export function fromUnitToBase(unit: Unit, num: BigNumber): BigNumber {
  switch (unit) {
    case Unit.Base: {
      return new BigNumber(num);
    }
    case Unit.Kilo: {
      return num.multipliedBy(1e3);
    }
    case Unit.Mega: {
      return num.multipliedBy(1e6);
    }
    case Unit.Giga: {
      return num.multipliedBy(1e9);
    }
    case Unit.Tera: {
      return num.multipliedBy(1e12);
    }
    case Unit.Kibi: {
      return num.multipliedBy(1024);
    }
    case Unit.Mibi: {
      return num.multipliedBy(1024 ** 2);
    }
    case Unit.Gibi: {
      return num.multipliedBy(1024 ** 3);
    }
    case Unit.Tebi: {
      return num.multipliedBy(1024 ** 4);
    }
    default: {
      throw new Error(`illegal/unknown unit '${unit}'`);
    }
  }
}

export function fromBaseToUnit(unit: Unit, num: BigNumber): BigNumber {
  switch (unit) {
    case Unit.Base: {
      return new BigNumber(num);
    }
    case Unit.Kilo: {
      return num.dividedBy(1e3);
    }
    case Unit.Mega: {
      return num.dividedBy(1e6);
    }
    case Unit.Giga: {
      return num.dividedBy(1e9);
    }
    case Unit.Tera: {
      return num.dividedBy(1e12);
    }
    case Unit.Kibi: {
      return num.dividedBy(1024);
    }
    case Unit.Mibi: {
      return num.dividedBy(1024 ** 2);
    }
    case Unit.Gibi: {
      return num.dividedBy(1024 ** 3);
    }
    case Unit.Tebi: {
      return num.dividedBy(1024 ** 4);
    }
    default: {
      throw new Error(`illegal/unknown unit '${unit}'`);
    }
  }
}
