import { RideModel } from '../models/ride';
import {
  PaginatedRides,
  RideRepository,
} from '../repositories/ride.repository';

export class RideService {
  rideRepo: RideRepository;
  constructor(rideRepository) {
    this.rideRepo = rideRepository;
  }
  async getPaginatedRides(body: any): Promise<PaginatedRides> {
    return this.rideRepo.getPaginatedRides(body);
  }
  async getTotalCount(): Promise<number> {
    return this.rideRepo.getRidesTotalCount();
  }
  async getRideById(id: number): Promise<RideModel> {
    return this.rideRepo.getRideById(id);
  }

  async createRide(ride: RideModel): Promise<boolean> {
    return this.rideRepo.insertRide(ride);
  }
}
