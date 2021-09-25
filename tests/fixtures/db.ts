export const rideOne = {
  driverName: 'Andrew',
  riderName: 'Bob',
  driverVehicle: 'Andrew',
  startLat: '43.66',
  startLong: '43.66',
  endLat: '46.66',
  endLong: '46.66',
};
export const deleteRides = (db) => {
  const clearRidesTable = `
        DELETE from rides;
    `;

  db.run(clearRidesTable);

  return db;
};
