import { Request, Response, NextFunction } from 'express';
// import CourseRepo from './../repositories/CoursesRepo';
import { apiErrorHandler } from '../handlers/errorHandler';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import AuthRepository from '../repositories/AuthRepository';
import { jwtSecret } from '../config';
import { hashPassword } from '../utils/auth';
export default class AuthController {
  constructor() {}

  async LoginUser(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const user = await AuthRepository.getUserByName(name);
    // Check if user exists or if the password is valid
    if (
      !user ||
      !(await AuthRepository.comparePassword(password, user.password))
    ) {
      return res.status(401).json({ error: 'Invalid Credentials!' });
    } else {
      const token = sign(
        {
          id: user.id,
          name: user.name,
        },
        jwtSecret!,
        { expiresIn: '7 days' }
      );
      const result = {
        token: `Bearer ${token}`,
        expiryDate: moment().add(168, 'hours'),
        id: user.id,
        name: user.name,
      };
      return res.status(200).json({
        ...result,
        error: undefined,
      });
    }
  }
  async RegisterUser(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const userExists = await AuthRepository.getUserByName(name);
    // Check if user by that name already exists
    if (userExists) {
      return res.status(401).json({ error: 'Username already taken!' });
    } else {
      await AuthRepository.createUser({
        name,
        password: await hashPassword(password),
      });
      return res.status(200).json({
        message: 'Registered successfully!',
        error: undefined,
      });
    }
  }

  async GetCurrentUser(req: any, res: Response, next: NextFunction) {
    const user = req.user as any;
    const result = {
      id: user.id,
      name: user.name,
    };
    return res.status(200).json(result);
  }

  async ChangePassword(req: any, res: Response, next: NextFunction) {
    const { oldPassword, newPassword } = req.body;
    const user = await AuthRepository.getUserById(req.user.id, undefined);
    // Check if password matches
    if (!(await AuthRepository.comparePassword(oldPassword, user.password))) {
      return res.status(401).json({ error: 'Invalid Credentials!' });
    } else {
      AuthRepository.changePassword({
        id: user.id,
        password: newPassword,
      });
      return res.status(201).json({ message: 'Password changed successfully' });
    }
  }
}
