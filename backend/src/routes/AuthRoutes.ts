import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { asyncMiddleware } from '../middlewares/asyncHandler';
import userAuth from '../middlewares/userAuth';
import { AuthValidator } from '../validators/authValidator';

class AuthRoutes {
  router = Router();
  authController = new AuthController();
  authValidator = new AuthValidator();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * /api/auth/login-user:
     *   post:
     *     summary: Login User
     *     tags: [Authentication]
     *     requestBody:
     *      required: true
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  required:
     *                      - name
     *                      - password
     *                  properties:
     *                      name:
     *                          type: string
     *                      password:
     *                          type: string
     *     responses:
     *       401:
     *         description: Name or password is incorrect
     *       200:
     *         description: Login success
     */
    this.router
      .route('/login-user')
      .post(
        this.authValidator.validateLogin(),
        asyncMiddleware(this.authController.LoginUser)
      );
    /**
     * /api/auth/register-user:
     *   post:
     *     summary: Register User
     *     tags: [Authentication]
     *     requestBody:
     *      required: true
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  required:
     *                      - name
     *                      - password
     *                  properties:
     *                      name:
     *                          type: string
     *                      password:
     *                          type: string
     *     responses:
     *       401:
     *         description: Name conflict occurred
     *       200:
     *         description: Register success
     */
    this.router
      .route('/register-user')
      .post(
        this.authValidator.validateRegister(),
        asyncMiddleware(this.authController.RegisterUser)
      );
    /**
     * /api/auth/current-user/:
     *   get:
     *     security:
     *        - bearerAuth: []
     *     summary: Get current user if logged in
     *     tags: [Authentication]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Current user
     */
    this.router
      .route('/current-user')
      .get(userAuth, asyncMiddleware(this.authController.GetCurrentUser));

    /**
     * /api/auth/change-password:
     *   post:
     *     security:
     *        - bearerAuth: []
     *     summary: Change Password
     *     tags: [Authentication]
     *     requestBody:
     *      required: true
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  required:
     *                      - oldPassword
     *                      - newPassword
     *                  properties:
     *                      oldPassword:
     *                          type: string
     *                      newPassword:
     *                          type: string
     *     responses:
     *       401:
     *         description: OldPassword is incorrect
     *       201:
     *         description: Password Changed
     */
    this.router
      .route('/change-password')
      .post(
        userAuth,
        this.authValidator.validateChangePassword(),
        asyncMiddleware(this.authController.ChangePassword)
      );
  }
}

export default new AuthRoutes().router;
