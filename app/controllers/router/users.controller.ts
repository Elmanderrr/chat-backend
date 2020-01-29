import * as express from 'express';
import * as mongoose from "mongoose";
import { RouterController } from 'app/interfaces/router-controller.interface';
import { IUser, IUserModel, usersModel } from 'app/models/users.model';
import * as _ from 'lodash'
import { dialogModel, IDialog } from 'app/models/dialog.model';



export class UsersController implements RouterController {
  constructor() {
    this.initRoutes();
  }

  public router: express.Router = express.Router();

  private initRoutes() {
    this.router.post('/get-users', this.getAllUsers.bind(this));
    this.router.post('/create-user', this.createUser.bind(this));
    this.router.post('/join-dialog', this.joinDialog.bind(this));
    this.router.post('/create-dialog', this.createDialog.bind(this));
  }

  /**
   *
   * @param req
   * @param res
   */
  private createUser(req: express.Request, res: express.Response) {
    const { name, email, isLogged } = req.body;
    const newUserProps: IUser = { name, email, isLogged: _.isUndefined(isLogged) ? isLogged : false };
    const newUser = new usersModel.model(
      newUserProps
    );

    newUser.save()
      .then(res.json.bind(res))
      .catch(error => {
        res.json(error)
      })
  }

  /**
   *
   * @param req
   * @param res
   */
  private getAllUsers(req: express.Request, res: express.Response) {
    usersModel.model.find({}).then((users: Array<IUser>) => {
      res.json(users)
    });
  }

  /**
   *
   * @param req
   * @param res
   */
  private async joinDialog(req: express.Request, res: express.Response) {
    const { participantId, dialogId } = req.body;
    const dialog: IDialog = await dialogModel.model.findById(mongoose.Types.ObjectId(dialogId));

    if ( !dialog.participants.includes(participantId) ) {
      dialog.participants.push(participantId)
    }

    res.json(dialog)

    // user.save()
    //   .then(res.json.bind(res))

  }

  /**
   *
   * @param req
   * @param res
   */
  private createDialog(req: express.Request, res: express.Response) {
    const { participants } = req.body;

    usersModel.model.find({}).where('_id').in(participants.map(id => mongoose.Types.ObjectId(id)))
      .then((users: Array<IUserModel> = []) => {
        const dialog = dialogModel.newDialog(users.map(u => u._id));

        users.map(user => {
          user.dialogs.push(dialog);
          user.markModified('dialogs')
        });

        Promise.all(
          users.map(u => u.save())
        ).then(users => {
          res.json(users);
        });

      })
  }

}
