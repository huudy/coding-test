import { RideController } from './../controllers/rides.controller';
import * as express from 'express';
const router = express.Router();
import { pagination } from '../middlewares/pagination';
import {
  getRideQueryParamsValid,
  getSingleRideParamsValid,
  createRideInputValid,
  validate,
} from '../utils/validator';
import rideSevice from '../di/di';

const ridesController = new RideController(rideSevice);

router.post('/', createRideInputValid(), validate, ridesController.createRide);
router.get(
  '/',
  getRideQueryParamsValid(),
  validate,
  pagination,
  ridesController.getPaginatedRides
);
router.get(
  '/:id',
  getSingleRideParamsValid(),
  validate,
  ridesController.getRideById
);

export default router;
