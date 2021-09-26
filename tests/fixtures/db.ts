import repo from '../../src/repositories/ride.repository';
export const rideOne = {
  driverName: 'Andrew',
  riderName: 'Bob',
  driverVehicle: 'Andrew',
  startLat: '43.66',
  startLong: '43.66',
  endLat: '46.66',
  endLong: '46.66',
};

export const deleteRides = () => {
  repo.clearTable();
};

export const buildSchemas = () => {
  repo.createTable();
};

export const dropRidesTable = () => {
  repo.dropTable();
};
