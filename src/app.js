const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const logger = require('./utils/logger');

module.exports = (db) => {
  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', jsonParser, (req, res) => {
    const startLatitude = Number(req.body.startLat);
    const startLongitude = Number(req.body.startLong);
    const endLatitude = Number(req.body.endLat);
    const endLongitude = Number(req.body.endLong);
    const { riderName } = req.body;
    const { driverName } = req.body;
    const { driverVehicle } = req.body;

    if (
      startLatitude < -90 ||
      startLatitude > 90 ||
      startLongitude < -180 ||
      startLongitude > 180
    ) {
      logger.error(
        'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      );
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message:
          'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      });
    }

    if (
      endLatitude < -90 ||
      endLatitude > 90 ||
      endLongitude < -180 ||
      endLongitude > 180
    ) {
      logger.error(
        'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      );
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message:
          'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      });
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      logger.error('Rider name must be a non empty string');

      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      logger.error('Driver name must be a non empty string');

      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      logger.error('Vehicle name must be a non empty string');

      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      });
    }

    const values = [
      req.body.startLat,
      req.body.startLong,
      req.body.endLat,
      req.body.endLong,
      req.body.riderName,
      req.body.driverName,
      req.body.driverVehicle,
    ];

    const result = db.run(
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values,
      function (err) {
        if (err) {
          logger.error(`Could not insert ride into DB. Details:${err}`);

          console.status(500).log(err);
          return res.send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        db.all(
          'SELECT * FROM Rides WHERE rideID = ?',
          this.lastID,
          function (err, rows) {
            if (err) {
              logger.error(
                `Error when getting ride with id:${this.lastID}. Details:${err}`
              );
              return res.status(500).send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error',
              });
            }

            res.send(rows);
          }
        );
      }
    );
  });

  app.get('/rides', (req, res) => {
    db.all('SELECT * FROM Rides', (err, rows) => {
      if (err) {
        logger.error(`Error when getting rides from DB. Details:${err}`);

        return res.status(500).send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error',
        });
      }

      if (rows.length === 0) {
        logger.error(`No ride with id:${req.params.id} found in the DB`);

        return res.status(404).send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }

      res.send(rows);
    });
  });

  app.get('/rides/:id', (req, res) => {
    db.all(
      `SELECT * FROM Rides WHERE rideID='${req.params.id}'`,
      (err, rows) => {
        if (err) {
          logger.error(
            `Error when getting ride with id${req.params.id} from DB. Details:${err}`
          );
          return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        if (rows.length === 0) {
          logger.error(`No ride with id:${req.params.id} found in the DB`);

          return res.status(404).send({
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides',
          });
        }

        res.send(rows);
      }
    );
  });

  return app;
};
