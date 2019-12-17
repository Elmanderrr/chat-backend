import * as express from 'express';
import { DbController } from 'app/controllers/db.controller';
import { RouterController } from 'app/interfaces/router-controller.interface';


export class App {
  public app: express.Application;
  private db: DbController;

  constructor(controllers: Array<RouterController>) {
    this.app = express();
    this.db = new DbController();

    this.initializeControllers(controllers)
  }

  public listen() {
    this.app.listen(3000, () => {});
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller: RouterController) => {
      this.app.use('/', controller.router);
    });
  }
}


