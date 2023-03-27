import { Application, urlencoded, json, static as estatic } from 'express';
// import * as morgan from 'morgan';

import * as fs from 'fs';
import { WriteStream } from 'fs';
import * as path from 'path';

import rateLimiter from './middlewares/rateLimit';
import { unCaughtErrorHandler } from './handlers/errorHandler';
import Routes from './routes';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';
import logger from './logger';
import cors from 'cors';
import helmet = require('helmet');
import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from './graphql';
import { expressMiddleware } from '@apollo/server/express4';
// import { typeDefs, resolvers } from '@/graphql/index';

export default class Server {
  constructor(app: Application) {
    this.initialize(app);
  }

  async initialize(app) {
    await this.config(app);
    // new Routes(app);
  }

  public async config(app: Application): Promise<void> {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // const logPath = path.join(__dirname, '../logs');
    // if (!fs.existsSync(logPath)) {
    //   fs.mkdirSync(logPath);
    // }
    // const accessLogStream: WriteStream = fs.createWriteStream(
    //   path.join(logPath, 'access.log'),
    //   {
    //     flags: 'a+',
    //   }
    // );
    // app.use(morgan('combined', { stream: accessLogStream }));
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: true }));
    // app.use('/', estatic(path.join(__dirname, '../../../frontend/build')));
    // app.use(helmet());
    app.use(rateLimiter()); //  apply to all requests
    // app.use(passport.initialize());

    // passportMiddleware(passport);
    app.use('/graphql', expressMiddleware(server));
    // app.use(unCaughtErrorHandler);
  }
}

process.on('beforeExit', function (err) {
  logger.error(JSON.stringify(err));
  console.error(err);
});
