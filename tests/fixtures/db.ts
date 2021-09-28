import { RideRepository } from './../../src/repositories/ride.repository';
export const rideOne = {
  driverName: 'Andrew',
  riderName: 'Bob',
  driverVehicle: 'Andrew',
  startLat: '43.66',
  startLong: '43.66',
  endLat: '46.66',
  endLong: '46.66',
};
export const rideNoDriver = {
  riderName: 'Bob',
  driverVehicle: 'Andrew',
  startLat: '43.66',
  startLong: '43.66',
  endLat: '46.66',
  endLong: '46.66',
};
const rideRepo = new RideRepository();
export const deleteRides = () => {
  rideRepo.clearTable();
};

export const buildSchemas = () => {
  rideRepo.createTable();
};

export const dropRidesTable = () => {
  rideRepo.dropTable();
};
