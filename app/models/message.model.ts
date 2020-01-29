import * as mongoose from "mongoose";
import { AbstractModel } from 'app/interfaces/abstract-model.interface';
import { SchemaTimestampsConfig } from "mongoose";
import { IUser, usersModel } from 'app/models/users.model';

export interface IMessage extends SchemaTimestampsConfig {
  message: string;
  participant: IUser;
}

export interface IMessageModel extends IMessage, mongoose.Document {}

export const MessageSchema = new mongoose.Schema({
  message: String,
  participant: [{ type : mongoose.Schema.Types.ObjectId, ref: usersModel.name}]
}, { timestamps: true });

class MessageModel extends AbstractModel {
  public name = 'Message';
  public model: mongoose.Model<IMessageModel> = mongoose.model<IMessageModel>(this.name, MessageSchema);
}

export const messageModel = new MessageModel();
