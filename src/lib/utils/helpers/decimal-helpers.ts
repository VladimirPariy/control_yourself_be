import {Decimal} from 'decimal.js';

export function toFixedD(number: Decimal, precision: number = 2): Decimal {
  return number
    .mul(10 ** precision)
    .round()
    .div(10 ** precision);
}
