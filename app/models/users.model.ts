import * as mongoose from "mongoose";
import { DialogSchema, IDialog } from 'app/models/dialog.model';
import { AbstractModel } from 'app/interfaces/abstract-model.interface';
import { SchemaTimestampsConfig } from "mongoose";

export interface IUser extends SchemaTimestampsConfig {
  name: string
  email: string;
  dialogs?: Array<IDialog>;
  isLogged?: boolean;
}

export interface IUserModel extends IUser, mongoose.Document {}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isLogged: { type: Boolean, required: false, default: false },
  dialogs: [DialogSchema]
}, { timestamps: true });

class UsersModel extends AbstractModel {
  public name = 'User';
  public model: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(this.name, UserSchema);
}

export const usersModel = new UsersModel();
