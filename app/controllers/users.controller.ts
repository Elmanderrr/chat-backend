import * as express from 'express';
import { RouterController } from 'app/interfaces/router-controller.interface';
import { IUserModel, User } from 'app/models/users.model';




export class UsersController implements RouterController {
  constructor() {
    this.initRoutes();
  }

  public router: express.Router = express.Router();

  private initRoutes() {

    //
    // this.app.post('/create-user',  (req: express.Request, res: express.Response) => {
    //
    //   const user: IUserModel = new User();
    //
    //
    //
    //   // user.save().then(resp => {
    //   //   res.json(resp)
    //   // })
    //   //
    //   //
    //   // User.find({}).then(users => {
    //   //   console.log(users)
    //   // });
    //
    //
    // });
    //
    this.router.get('/get-users', this.getAllUsers.bind(this))
    
    
  }

  /**
   *
   * @param req
   * @param res
   */
  private getAllUsers(req: express.Request, res: express.Response) {
    User.find({}).then((users: Array<IUserModel>) => {
      res.json(users)
    });
  }

}
