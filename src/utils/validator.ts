import { query, validationResult } from 'express-validator';
export const getRideParamsValid = () => {
  return [query('page').isInt(), query('limit').isInt()];
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
