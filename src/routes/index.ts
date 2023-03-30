import { Application } from 'express';
import AuthRoutes from './AuthRoutes';
// import lessonRouter from './LessonRoutes';
import userAuth from '../middlewares/user.auth.middleware';
import * as path from 'path';
export default class Routes {
  constructor(app: Application) {
    app.use('/api/auth', AuthRoutes);
    // app.get('*', (req, res) => {
    //   res.sendFile(
    //     path.join(__dirname, '../../../../frontend/build/index.html')
    //   );
    // });
  }
}
