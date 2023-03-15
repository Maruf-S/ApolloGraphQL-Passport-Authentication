import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authTypes';

export class AuthValidator {
  constructor() {}
  validateLogin() {
    return this.validate(loginSchema);
  }
  validateRegister() {
    return this.validate(registerSchema);
  }
  validateChangePassword() {
    return this.validate(changePasswordSchema);
  }
  private validate(schema) {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
        const val = await schema.validateAsync(req.body);
        req.value = req.value ?? {};
        req.value.body = req.value.body ?? val;
        next();
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}

export const loginSchema = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
});
export const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
});
export const changePasswordSchema = Joi.object().keys({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});
