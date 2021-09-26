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
    it('should return newly created ride', (done) => {
      request(app).post('/rides').send(rideOne).expect(200, done);
    });
    it('should return bad request error when no driver name provided', (done) => {
      let { driverName, ...rideInputNoDriver } = rideOne;
      request(app).post('/rides').send(rideInputNoDriver).expect(400, done);
    });
    it('should return bad request error when no rider name provided', (done) => {
      let { riderName, ...rideInputNoRider } = rideOne;
      request(app).post('/rides').send(rideInputNoRider).expect(400, done);
    });
    it('should return bad request error when starting lat out of range', (done) => {
      let rideWrongStartLat = { ...rideOne, startLat: 190.0 };

      request(app).post('/rides').send(rideWrongStartLat).expect(400, done);
    });
    it('should return bad request error when starting long out of range', (done) => {
      let rideWrongStartLong = { ...rideOne, startLong: 190.0 };

      request(app).post('/rides').send(rideWrongStartLong).expect(400, done);
    });
    it('should return bad request error when end longitude out of range', (done) => {
      let rideWrongEndLong = { ...rideOne, endLong: 190.0 };

      request(app).post('/rides').send(rideWrongEndLong).expect(400, done);
    });
    it('should return bad request error when end latitude out of range', (done) => {
      let rideWrongEndLat = { ...rideOne, endLat: 190.0 };

      request(app).post('/rides').send(rideWrongEndLat).expect(400, done);
    });
  });
  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app).get('/health').expect(200, done);
    });
  });
  describe('GET /rides/{id}', () => {
    it('should return 200 if rides present in the DB', (done) => {
      request(app).get('/rides/1').expect(200, done);
    });
    it('should return 404 if rides not present in the DB', (done) => {
      request(app).get('/rides/300').expect(404, done);
    });
  });
  describe('GET /rides', () => {
    it('should return 200 if rides present in the DB', (done) => {
      request(app).get('/rides?page=1&limit=10').expect(200, done);
    });
    it('should return 400 if rides page query param is wrong', (done) => {
      request(app).get('/rides?page=zz&limit=10').expect(400, done);
    });
    it('should return 400 if rides limit query param is wrong', (done) => {
      request(app).get('/rides?page=1&limit=ww').expect(400, done);
    });
    it('should return 404 if requested page does not exist', (done) => {
      request(app).get('/rides?page=3&limit=10').expect(404, done);
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
      it('should return 404', (done) => {
        request(app).get('/rides?page=1&limit=10').expect(404, done);
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
      it('and trying to get paginated result should return 500', (done) => {
        request(app).get('/rides?page=1&limit=10').expect(500, done);
      });

      it('and trying to get single record should return 500', (done) => {
        request(app).get('/rides/1').expect(500, done);
      });
    });
  });
});
