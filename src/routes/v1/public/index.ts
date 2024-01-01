import express from 'express';
const router = express.Router();
import rateRoute from './rate.route';

router.use('/rates', rateRoute);

export default router;
