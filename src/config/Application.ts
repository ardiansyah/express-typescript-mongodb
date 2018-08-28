import { ExpressConfig } from './Express';
import { logger } from '../modules/core/common/logging';
import DBConnection from './DBConnection';


export class Application {
  server: any;
  express: ExpressConfig;

  constructor() {
    this.express = new ExpressConfig();

    const port = process.env.PORT;

    DBConnection.connect();

    // Start Webserver
    this.server = this.express.app.listen(port, () => {
      logger.info(`
        ------------
        Server Started!
        Http: http://localhost:${port}
        Health: http://localhost:${port}/ping
        ------------
      `);
    });
  }
}