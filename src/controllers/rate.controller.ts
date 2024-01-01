import { Request, Response } from 'express';
import { rateService } from '../services'; // Import your rate service
import {
  SuccessResponse,
  InternalErrorResponse,
  BadRequestResponse,
} from '../helpers/response.helper';
import { CURRENCY_SYMBOLS } from '../constants';
import { Console } from 'winston/lib/winston/transports';

class RateController {
  async getAllSymbols(req: Request, res: Response) {
    let result: any = {};
    try {
      result = req.cookies.symbols;

      if (!result) {
        result = await rateService.getAllSymbols();

        if (!result) return InternalErrorResponse(res, 'Symbols not found');
        // Set the cookie with a maxAge of one day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
        res.cookie('symbols', result, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
      }
      return SuccessResponse(res, result);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  async getLatestRates(req: Request, res: Response) {
    let result: any = {};

    try {
      result = req.cookies.rates;

      if (!result) {
        result = await rateService.getLatestRates();

        if (!result) return InternalErrorResponse(res, 'Rates not found');
        // Set the cookie with a maxAge of one day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
        res.cookie('rates', result, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
      }
      return SuccessResponse(res, result);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  async convert(req: Request, res: Response) {
    console.log('Inside convert');
    let result: any = {};
    const { amount, to, from } = req.query;

    if (!amount || !to || !from)
      return BadRequestResponse(res, 'Missing Variables');

    try {
      result = req.cookies[`rates-${from.toString()}`];

      if (!result) {
        result = await rateService.getLatestRates();

        if (!result) return InternalErrorResponse(res, 'Rates not found');
        // Set the cookie with a maxAge of one day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
        res.cookie(`rates-${from.toString()}`, result, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
      }

      const fromRate = result.rates[from.toString()];
      const toRate = result.rates[to.toString()];

      if (!fromRate || !toRate)
        return InternalErrorResponse(res, 'Invalid currency codes');

      const convertedAmount = (parseInt(amount.toString()) * toRate) / fromRate;

      return SuccessResponse(res, {
        amount: convertedAmount,
      });
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }
}

export const rateController = new RateController(); // Instantiate your rate service
