import { Request, Response } from 'express';

export default class {
  static async getHealth(req: Request, res: Response, next: Function) {
    return res.send('healthy');
  }
}
