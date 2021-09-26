import dao from '../db/dao';
import Ride from '../models/ride';

type PaginatedRides = {
  page: number;
  data: Ride[];
  totalCount: number;
};

export default class {
  static async getRidesTotalCount(): Promise<number> {
    const result = await dao.getCount(['rides']);
    return Number(result);
  }

  static async getPaginatedRides({ limit, skip }): Promise<PaginatedRides> {
    const rides = await dao.all(
      'SELECT * FROM rides ORDER BY created DESC limit ? OFFSET ?',
      [limit, skip]
    );
    return <PaginatedRides>rides;
  }

  static async getRideById(id: number): Promise<Ride> {
    const ride = await dao.get('SELECT * FROM rides WHERE rideID = ?', [id]);
    return <Ride>ride;
  }

  static async clearTable(): Promise<Ride> {
    const ride = await dao.run('DELETE from rides ', []);
    return <Ride>ride;
  }

  static async dropTable(): Promise<boolean> {
    try {
      await dao.run('DROP table Rides ', []);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async createTable(): Promise<boolean> {
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

  static async insertRide(ride: Ride): Promise<boolean> {
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
