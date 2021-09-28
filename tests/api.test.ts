import request from 'supertest';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

import app from '../src/app';
import {
  rideOne,
  deleteRides,
  buildSchemas,
  dropRidesTable,
} from './fixtures/db';
describe('API tests', () => {
  before((done) => {
    db.serialize((err: any) => {
      if (err) {
        return done(err);
      }

      buildSchemas();

      done();
    });
  });
  describe('POST /rides', () => {
    it('should return newly created ride', async () => {
      let res = await request(app).post('/rides').send(rideOne).expect(200);
    });
    it('should return bad request error when no driver name provided', async () => {
      let { driverName, ...rideInputNoDriver } = rideOne;
      await request(app).post('/rides').send(rideInputNoDriver).expect(400);
    });
    it('should return bad request error when no rider name provided', async () => {
      let { riderName, ...rideInputNoRider } = rideOne;
      await request(app).post('/rides').send(rideInputNoRider).expect(400);
    });
    it('should return bad request error when starting lat out of range', async () => {
      let rideWrongStartLat = { ...rideOne, startLat: 190.0 };

      await request(app).post('/rides').send(rideWrongStartLat).expect(400);
    });
    it('should return bad request error when starting long out of range', async () => {
      let rideWrongStartLong = { ...rideOne, startLong: 190.0 };

      await request(app).post('/rides').send(rideWrongStartLong).expect(400);
    });
    it('should return bad request error when end longitude out of range', async () => {
      let rideWrongEndLong = { ...rideOne, endLong: 190.0 };

      await request(app).post('/rides').send(rideWrongEndLong).expect(400);
    });
    it('should return bad request error when end latitude out of range', async () => {
      let rideWrongEndLat = { ...rideOne, endLat: 190.0 };

      await request(app).post('/rides').send(rideWrongEndLat).expect(400);
    });
    it('should escape string causing potential SQL injection and create new ride with driver name "DROP TABLE Rides; --"', async () => {
      let rideSQLInjectionDrop = {
        ...rideOne,
        driverName: 'DROP TABLE Rides; --',
      };
      console.log(rideSQLInjectionDrop);

      let res = await request(app)
        .post('/rides')
        .send(rideSQLInjectionDrop)
        .expect(200);
    });
  });
  describe('GET /health', () => {
    it('should return health', async () => {
      await request(app).get('/health').expect(200);
    });
  });
  describe('GET /rides/{id}', () => {
    it('should return 200 if rides present in the DB', async () => {
      await request(app).get('/rides/1').expect(200);
    });
    it('should return 404 if rides not present in the DB', async () => {
      await request(app).get('/rides/300').expect(404);
    });
  });
  describe('GET /rides', () => {
    it('should return 200 if rides present in the DB', async () => {
      await request(app).get('/rides?page=1&limit=10').expect(200);
    });
    it('should return 400 if rides page query param is wrong', async () => {
      await request(app).get('/rides?page=zz&limit=10').expect(400);
    });
    it('should return 400 if rides limit query param is wrong', async () => {
      await request(app).get('/rides?page=1&limit=ww').expect(400);
    });
    it('should return 404 if requested page does not exist', async () => {
      await request(app).get('/rides?page=3&limit=10').expect(404);
    });
    describe('when no records in the Rides table', () => {
      before((done) => {
        db.serialize((err: any) => {
          if (err) {
            return done(err);
          }
          deleteRides();
          done();
        });
      });
      it('should return 404', async () => {
        await request(app).get('/rides?page=1&limit=10').expect(404);
      });
    });
    describe('when Rides table not there', () => {
      before((done) => {
        db.serialize((err: any) => {
          if (err) {
            return done(err);
          }
          dropRidesTable();
          done();
        });
      });
      it('and trying to get paginated result should return 500', async () => {
        await request(app).get('/rides?page=1&limit=10').expect(500);
      });

      it('and trying to get single record should return 500', async () => {
        await request(app).get('/rides/1').expect(500);
      });
    });
  });
});
