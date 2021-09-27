import { Request, Response } from 'express';
import { RideModel } from '../models/ride';
import { RideService } from '../services/ride.service';
import logger from '../utils/logger';

export class RideController {
  public rideService: RideService;
  constructor(rideSvc) {
    this.rideService = rideSvc;
  }

  getPaginatedRides = async (req: Request, res: Response, next: Function) => {
    try {
      const { page, limit } = req.body;
      const totalCount = await this.rideService.getTotalCount();
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
      let data = await this.rideService.getPaginatedRides(req.body);
      return res.send({ page, totalCount, totalPages, data });
    } catch (error) {
      logger.error(`Something went wrong. Details ${error}`);
      return res.status(500).send(error);
    }
  };

  getRideById = async (req: Request, res: Response, next: Function) => {
    try {
      const { id } = req.params;
      let ride = await this.rideService.getRideById(Number(id));
      if (!ride) {
        logger.error(`Could not find ride with id ${id}`);
        return res.status(404).send(`Could not find ride with id ${id}`);
      }
      return res.send({ ride });
    } catch (error) {
      logger.error(`Something went wrong. Details ${error}`);
      return res.status(500).send(error);
    }
  };

  createRide = async (req: Request, res: Response, next: Function) => {
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
      const newRide = new RideModel(
        driverName,
        riderName,
        driverVehicle,
        startLat,
        startLong,
        endLat,
        endLong
      );
      await this.rideService.createRide(newRide);
      return res.send(newRide);
    } catch (error) {
      logger.error(`Something went wrong. Details ${error}`);
      return res.send(error);
    }
  };
}
