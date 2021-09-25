"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const app = require('../src/app')(db);
const schemas_1 = require("../src/schemas");
const { rideOne, deleteRides } = require('./fixtures/db');
describe('API tests', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }
            (0, schemas_1.buildSchemas)(db);
            done();
        });
    });
    describe('POST /rides', () => {
        it('should return newly created ride', (done) => {
            request(app).post('/rides').send(rideOne).expect(200, done);
        });
        it('should return bad request error when no driver name provided', (done) => {
            let { driverName } = rideOne, rideInputNoDriver = __rest(rideOne, ["driverName"]);
            request(app).post('/rides').send(rideInputNoDriver).expect(400, done);
        });
        it('should return bad request error when no rider name provided', (done) => {
            let { riderName } = rideOne, rideInputNoRider = __rest(rideOne, ["riderName"]);
            request(app).post('/rides').send(rideInputNoRider).expect(400, done);
        });
        it('should return bad request error when starting lat out of range', (done) => {
            let rideWrongStartLat = Object.assign(Object.assign({}, rideOne), { startLat: 190.0 });
            request(app).post('/rides').send(rideWrongStartLat).expect(400, done);
        });
        it('should return bad request error when starting long out of range', (done) => {
            let rideWrongStartLong = Object.assign(Object.assign({}, rideOne), { startLong: 190.0 });
            request(app).post('/rides').send(rideWrongStartLong).expect(400, done);
        });
        it('should return bad request error when end longitude out of range', (done) => {
            let rideWrongEndLong = Object.assign(Object.assign({}, rideOne), { endLong: 190.0 });
            request(app).post('/rides').send(rideWrongEndLong).expect(400, done);
        });
        it('should return bad request error when end latitude out of range', (done) => {
            let rideWrongEndLat = Object.assign(Object.assign({}, rideOne), { endLat: 190.0 });
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
            request(app).get('/rides').expect(200, done);
        });
        describe('when no records in the Rides table', () => {
            before((done) => {
                db.serialize((err) => {
                    if (err) {
                        return done(err);
                    }
                    deleteRides(db);
                    done();
                });
            });
            it('should return 404', (done) => {
                request(app).get('/rides').expect(404, done);
            });
        });
    });
});
