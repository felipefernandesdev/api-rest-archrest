import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const routes = Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Welcome: Microservice of Users | Api is running!' });
  next();
});

export { routes };
