import { IsString, IsNumber, Min, Max, Length, IsIn } from 'class-validator';
import { CURRENCY_SYMBOLS } from '../constants';

export class CurrencyConversionDto {
  @IsString()
  @IsIn(Object.keys(CURRENCY_SYMBOLS), {
    message: 'Invalid currency code',
  })
  @Length(3, 3, { message: 'Currency code must be exactly 3 characters' })
  from!: string;

  @IsString()
  @IsIn(Object.keys(CURRENCY_SYMBOLS), {
    message: 'Invalid currency code',
  })
  @Length(3, 3, { message: 'Currency code must be exactly 3 characters' })
  to!: string;

  @IsString()
  amount!: number;
}
