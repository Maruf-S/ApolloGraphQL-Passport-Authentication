import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  value?: { body?: string };
}
