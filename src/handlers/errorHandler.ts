import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export function unCaughtErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  logger.error(JSON.stringify(err));
  res.end({ error: err });
}

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  message: string
) {
  res.status(500).json({ error: message });
  console.log(err);
  const error: object = { Message: message, Request: req, Stack: err };
  logger.error(error);
}
