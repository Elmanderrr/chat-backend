import * as express from 'express';
import * as mongoose from "mongoose";
import * as chalk from 'chalk'
import { env } from 'app/env/environment';
import { RouterController } from 'app/interfaces/router-controller.interface';
import * as bodyParser from 'body-parser';


export class App {
  public app: express.Application;
  private routerControllers: Array<RouterController>;

  constructor(routerControllers: Array<RouterController>) {
    this.app = express();
    this.routerControllers = routerControllers;

    this.init();
  }

  public init() {

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.initializeControllers(this.routerControllers);
    this.connectToDB();
  }

  public listen() {
    this.app.listen(3010, () => {
      console.log(chalk.green('[LOG] Server listen on 3000 port'))
    });
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller: RouterController) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToDB() {
    mongoose.connect(`mongodb://${env.dbAdress}/${env.dbPort}`)
      .then((db: mongoose.Mongoose) => {
        console.log(chalk.blue('[LOG] Mongoose successfully connected to DB'))
      })
      .catch(error => {
        console.log(chalk.red(error))
      })
  }
}


