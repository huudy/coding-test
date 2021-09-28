export class RideModel {
  constructor(
    driverName: string,
    riderName: string,
    driverVehicle: string,
    startLat: number,
    startLong: number,
    endLat: number,
    endLong: number
  ) {
    this.driverName = driverName;
    this.riderName = riderName;
    this.driverVehicle = driverVehicle;
    this.startLat = startLat;
    this.startLong = startLong;
    this.endLat = endLat;
    this.endLong = endLong;
  }

  id!: number;
  driverName!: string;
  riderName!: string;
  driverVehicle!: string;
  startLat!: number;
  startLong!: number;
  endLat!: number;
  endLong!: number;
}
