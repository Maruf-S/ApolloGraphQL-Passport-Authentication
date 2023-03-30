import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Application } from 'express';
import ApiServer from './src/index';
const app: Application = express();
const server: ApiServer = new ApiServer(app);
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
app
  .listen(port, function () {
    console.info(`Express Server running on http://localhost:${port}`);
    console.info(`GraphQL Server running on http://localhost:${port}/graphql`);
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('server startup error: address already in use');
    } else {
      console.log(err);
    }
    process.exit(1);
  });
