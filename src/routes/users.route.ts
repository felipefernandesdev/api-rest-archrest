import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DatabaseError } from '../models/errors/database.error.model';
import userRepository from '../repositories/user.repository';

const userRoute = Router();
const users = [
  {
    id: 'bcdc2472-d4c1-4be4-a0eb-d14e1727916d',
    name: 'Felipe Fernandes',
    userName: 'fesousadev',
  },
];

userRoute.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    return res.status(StatusCodes.OK).json({ users });
  },
);

userRoute.get(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await userRepository.findById(id);
      if (!user)
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });

      return res.status(StatusCodes.OK).json({ user });
    } catch (error) {
      return next(error);
    }
  },
);

userRoute.post(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'username and password are required' });

    const newUser = { username, password };

    const user = await userRepository.create(newUser);

    return res.status(StatusCodes.CREATED).json({ user });
  },
);

userRoute.put(
  '/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const modifiedUser = req.body;
    const user = await userRepository.findById(id);
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });

    modifiedUser.id = id;
    await userRepository.update(modifiedUser);
    return res.status(StatusCodes.OK).json({ msg: 'User modified' });
  },
);

userRoute.delete(
  '/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await userRepository.remove(id);
    return res.status(StatusCodes.OK).json({ msg: 'user deleted' });
  },
);

export { userRoute };

/**
 * get /users
 * get /users/:id
 * post /users
 * put /users/:id
 * delete /users/:id
 */
