import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;

import { RideController } from '../src/controllers/rides.controller';
import { RideService } from '../src/services/ride.service';
import { rideNoDriver, rideOne } from './fixtures/db';

describe('Ridesontroller', function () {
  describe('create new', function () {
    let status, res, send, rideController, rideSevice;
    beforeEach((done) => {
      status = sinon.stub();
      send = sinon.stub();
      res = { status, send };
      status.returns(res);
      const rideRepo = sinon.spy();
      rideSevice = new RideService(rideRepo);
      done();
    });

    it('should call createRide with proper arguments', async () => {
      const req = {
        body: rideOne,
      };
      const stub = sinon.stub(rideSevice, 'createRide').returns(true);
      rideController = new RideController(rideSevice);

      await rideController.createRide(req, res);

      expect(stub.calledOnce).to.be.true;
      expect(send.args[0][0]).to.deep.equal(rideOne);
    });
  });

  describe('Get ride by ID', function () {
    let res, status, send, next, rideService, rideController;
    beforeEach((done) => {
      next = sinon.spy();
      const rideRepo = sinon.spy();
      status = sinon.stub();
      send = sinon.stub();
      res = { status, send };
      status.returns(res);
      rideService = new RideService(rideRepo);
      done();
    });

    it('should call getRideById() of RideService with proper arguments', async () => {
      const stubValue = rideOne;
      const req = {
        params: { id: 1 },
      };

      const stub = sinon.stub(rideService, 'getRideById').returns(stubValue);
      rideController = new RideController(rideService);
      await rideController.getRideById(req, res, next);

      expect(stub.calledOnce).to.be.true;
      expect(send.calledOnce).to.be.true;
      expect(send.args[0][0].ride).to.equal(stubValue);
    });
  });
  describe('Get paginated rides', function () {
    let res, status, send, next, rideService, rideController;
    beforeEach((done) => {
      next = sinon.spy();
      const rideRepo = sinon.spy();
      status = sinon.stub();
      send = sinon.stub();
      res = { status, send };
      status.returns(res);
      rideService = new RideService(rideRepo);
      done();
    });

    it('should call getPaginatedRides() of RideService with proper arguments', async () => {
      const paginatedRidesStubValue = {
        data: [
          {
            rideID: 5,
            startLat: 43.555,
            startLong: 43.66,
            endLat: 47.555,
            endLong: 44.66,
            riderName: 'fdsf',
            driverName: 'rre',
            driverVehicle: 'Toyota Yaris',
            created: '2021-09-27 16:28:10',
          },
          {
            rideID: 3,
            startLat: 43.555,
            startLong: 43.66,
            endLat: 47.555,
            endLong: 44.66,
            riderName: 'fdsf',
            driverName: 'rre',
            driverVehicle: 'Toyota Yaris',
            created: '2021-09-27 16:28:09',
          },
          {
            rideID: 4,
            startLat: 43.555,
            startLong: 43.66,
            endLat: 47.555,
            endLong: 44.66,
            riderName: 'fdsf',
            driverName: 'rre',
            driverVehicle: 'Toyota Yaris',
            created: '2021-09-27 16:28:09',
          },
          {
            rideID: 2,
            startLat: 43.555,
            startLong: 43.66,
            endLat: 47.555,
            endLong: 44.66,
            riderName: 'fdsf',
            driverName: 'rre',
            driverVehicle: 'Toyota Yaris',
            created: '2021-09-27 16:28:08',
          },
          {
            rideID: 1,
            startLat: 43.555,
            startLong: 43.66,
            endLat: 47.555,
            endLong: 44.66,
            riderName: 'fdsf',
            driverName: 'rre',
            driverVehicle: 'Toyota Yaris',
            created: '2021-09-27 16:28:07',
          },
        ],
      };

      const req = {
        body: { page: 1, limit: 7, skip: 0 },
      };
      const expetedResult = {
        page: 1,
        data: { ...paginatedRidesStubValue },
        totalCount: 10,
        totalPages: 2,
      };

      const getTotalCountStub = sinon
        .stub(rideService, 'getTotalCount')
        .returns(10);
      const getPaginatedRidesStub = sinon
        .stub(rideService, 'getPaginatedRides')
        .returns(paginatedRidesStubValue);
      rideController = new RideController(rideService);

      await rideController.getPaginatedRides(req, res, next);

      expect(getTotalCountStub.calledOnce).to.be.true;
      expect(getPaginatedRidesStub.calledOnce).to.be.true;
      expect(send.args[0][0]).to.deep.equal(expetedResult);
    });
  });
});
