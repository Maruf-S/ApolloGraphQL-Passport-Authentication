import { Router } from 'express';
import { asyncMiddleware } from '../middlewares/async.handler.middleware';
import userAuth from '../middlewares/user.auth.middleware';
class AuthRoutes {
  router = Router();
  constructor() {}
}

export default new AuthRoutes().router;
