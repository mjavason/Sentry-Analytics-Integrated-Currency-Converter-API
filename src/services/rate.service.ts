import { EXCHANGE_RATES_API_KEY, MESSAGES } from '../constants';
import ApiService from '../helpers/api.helper';

class RateService {
  private apiService: ApiService = new ApiService(
    `http://api.exchangeratesapi.io/v1`
  );

  async getAllSymbols() {
    try {
      // GET request with bearer token in headers
      const responseData = await this.apiService.get<any>(
        `/symbols?access_key=${EXCHANGE_RATES_API_KEY}`
      );

      return responseData;
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  }

  async getLatestRates() {
    try {
      // GET request with bearer token in headers
      const responseData = await this.apiService.get<any>(
        `/latest?access_key=${EXCHANGE_RATES_API_KEY}`
      );

      return responseData;
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  }
}

export const rateService = new RateService();
