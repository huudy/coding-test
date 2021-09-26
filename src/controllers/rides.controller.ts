import ridesRepo from '../repositories/ride.repository';
import { Request, Response } from 'express';
import Ride from '../models/ride';
import logger from '../utils/logger';

export default class {
  static async getPaginatedRides(req: Request, res: Response, next: Function) {
    try {
      const { page, limit } = req.body;
      const totalCount = await ridesRepo.getRidesTotalCount();
      if (totalCount <= 0) {
        logger.error('No rides found in the DB');
        return res.status(404).send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: `No rides found in the DB`,
        });
      }
      const totalPages = Math.ceil(totalCount / limit);
      if (totalPages < page) {
        logger.error(`Page ${page} does not exist`);

        return res.status(404).send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: `Page ${page} does not exist`,
        });
      }
      let data = await ridesRepo.getPaginatedRides(req.body);
      return res.send({ page, totalCount, totalPages, data });
    } catch (error) {
      logger.error(`Something went wrong. Details ${error}`);
      return res.status(500).send(error);
    }
  }

  static async getRideById(req: Request, res: Response, next: Function) {
    try {
      const { id } = req.params;
      let ride = await ridesRepo.getRideById(Number(id));
      if (!ride) {
        logger.error(`Could not find ride with id ${id}`);
        return res.status(404).send(`Could not find ride with id ${id}`);
      }
      return res.send({ ride });
    } catch (error) {
      logger.error(`Something went wrong. Details ${error}`);
      return res.status(500).send(error);
    }
  }

  static async createRide(req: Request, res: Response, next: Function) {
    try {
      const {
        driverName,
        riderName,
        driverVehicle,
        startLat,
        startLong,
        endLat,
        endLong,
      } = req.body;
      const newRide = new Ride(
        driverName,
        riderName,
        driverVehicle,
        startLat,
        startLong,
        endLat,
        endLong
      );
      await ridesRepo.insertRide(newRide);
      return res.send(newRide);
    } catch (error) {
      logger.error(`Something went wrong. Details ${error}`);
      return res.status(500).send(error);
    }
  }
}
