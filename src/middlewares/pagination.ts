import { Request, Response } from 'express';

export const pagination = (req: Request, res: Response, next: Function) => {
  const { page, limit } = req.query;
  let skip = (Number(page) - 1) * Number(limit);
  req.body = {
    page,
    limit,
    skip,
  };
  next();
};
