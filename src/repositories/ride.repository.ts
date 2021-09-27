import dao from '../db/dao';
import { RideModel } from '../models/ride';

export type PaginatedRides = {
  page: number;
  data: RideModel[];
  totalCount: number;
};

export class RideRepository {
  async getRidesTotalCount(): Promise<number> {
    const result = await dao.getCount(['rides']);
    return Number(result);
  }

  async getPaginatedRides({ limit, skip }): Promise<PaginatedRides> {
    const rides = await dao.all(
      'SELECT * FROM rides ORDER BY created DESC limit ? OFFSET ?',
      [limit, skip]
    );
    return <PaginatedRides>rides;
  }

  async getRideById(id: number): Promise<RideModel> {
    const ride = await dao.get('SELECT * FROM rides WHERE rideID = ?', [id]);
    return <RideModel>ride;
  }

  async clearTable(): Promise<RideModel> {
    const ride = await dao.run('DELETE from rides ', []);
    return <RideModel>ride;
  }

  async dropTable(): Promise<boolean> {
    try {
      await dao.run('DROP table Rides ', []);
      return true;
    } catch (error) {
      return false;
    }
  }

  async createTable(): Promise<boolean> {
    try {
      await dao.run(
        `CREATE TABLE Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        ) `,
        []
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async insertRide(ride: RideModel): Promise<boolean> {
    const stmt =
      'INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';
    try {
      await dao.run(stmt, [
        ride.startLat,
        ride.startLong,
        ride.endLat,
        ride.endLong,
        ride.riderName,
        ride.driverName,
        ride.driverVehicle,
      ]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
