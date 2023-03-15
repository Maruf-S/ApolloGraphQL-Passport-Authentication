import { Request, Response, NextFunction } from 'express';
import { apiErrorHandler } from '../handlers/errorHandler';

export const asyncMiddleware =
  (fn) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((error) =>
      apiErrorHandler(error, req, res, 'An error occurred.')
    );
