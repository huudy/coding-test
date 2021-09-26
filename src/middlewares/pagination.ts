import { Request, Response } from 'express';

export const pagination = (req: Request, res: Response, next: Function) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  let skip = (page - 1) * limit;
  req.body = {
    page,
    limit,
    skip,
  };
  next();
};
