import { RideRepository } from '../repositories/ride.repository';
import { RideService } from '../services/ride.service';

const rideRepo = new RideRepository();
const rideSevice = new RideService(rideRepo);
export default rideSevice;
