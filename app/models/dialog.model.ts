import * as mongoose from "mongoose";
import { IUser } from 'app/models/users.model';
import { AbstractModel } from 'app/interfaces/abstract-model.interface';
import { SchemaTimestampsConfig } from "mongoose";


export interface IDialog extends SchemaTimestampsConfig {
  participants: Array<IUser>;
}

export interface IDialogModel extends IDialog, mongoose.Document {}

export const DialogSchema = new mongoose.Schema({
  participants: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: true });

class DialogModel implements AbstractModel {
  public name = 'Dialog';
  public model: mongoose.Model<IDialogModel> = mongoose.model<IDialogModel>(this.name, DialogSchema);

  /**
   *
   * @param participants
   */
  public newDialog (participants: Array<mongoose.Types.ObjectId>) {
    return new this.model({ participants })
  }
}

export const dialogModel = new DialogModel();

