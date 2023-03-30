import RateLimit from 'express-rate-limit';
import { rateLimitTime, rateLimitRequest } from '../config';

const env = process.env.NODE_ENV || 'dev';

export default () => {
  if (env === 'production') {
    return new RateLimit({
      windowMs: rateLimitTime,
      max: rateLimitRequest, // limit each IP to "rateLimitRequest" requests per windowMs
      delayMs: 0,
      handler: 'Rate limit exceeded, please try again later some time.',
    });
  }
  return new RateLimit({
    windowMs: rateLimitTime,
    max: rateLimitRequest, // limit each IP to "rateLimitRequest" requests per windowMs
    delayMs: 0,
    handler: 'Rate limit exceeded, please try again later some time.',
  });
};
