import { body, param, query, validationResult } from 'express-validator';
export const getRideQueryParamsValid = () => {
  return [query('page').isInt(), query('limit').isInt()];
};

export const getSingleRideParamsValid = () => {
  return [param('id').isInt()];
};

export const createRideInputValid = () => {
  return [
    body('riderName', 'Rider name was not provided')
      .exists()
      .isString()
      .notEmpty(),
    body('driverName', 'Driver name was not provided')
      .exists()
      .isString()
      .notEmpty(),
    body('driverVehicle', 'Vehicle name was not provided')
      .exists()
      .isString()
      .notEmpty(),
    body('startLat', 'Start latitude has to be between 90 and -90')
      .exists()
      .isFloat({ max: 90, min: -90 }),
    body('startLong', 'Start latitude has to be between 180 and -180')
      .exists()
      .isFloat({ max: 180, min: -180 }),
    body('endLat', 'End latitude has to be between 90 and -90')
      .exists()
      .isFloat({ max: 90, min: -90 }),
    body('endLong', 'End latitude has to be between 180 and -180')
      .exists()
      .isFloat({ max: 180, min: -180 }),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map((err) => {
    return { [err.param]: err.msg };
  });

  return res.status(400).json({
    errors: extractedErrors,
  });
};
