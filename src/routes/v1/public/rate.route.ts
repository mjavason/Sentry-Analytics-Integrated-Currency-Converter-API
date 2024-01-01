import { Router } from 'express';
import { rateController } from '../../../controllers';
import { validateBodyDTO } from '../../../middleware/body.validation.middleware';
import { CurrencyConversionDto } from '../../../validation/rate.validation';
import { validateQueryDTO } from '../../../middleware/query.validation.middleware';

const router = Router();

router.get('/', rateController.getLatestRates);
router.get('/symbols', rateController.getAllSymbols);
router.get(
  '/convert',
  validateQueryDTO(CurrencyConversionDto),
  rateController.convert
);

export default router;
