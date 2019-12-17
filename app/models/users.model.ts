import * as mongoose from "mongoose";
const modelName = 'User';

export interface IUser extends mongoose.Document{
  name: string
}

export interface IUserModel extends IUser, Document {
  getAll(): Promise<Array<IUserModel>>;
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

class Test extends mongoose.Model {

}

UserSchema.loadClass(Test);

const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(modelName, UserSchema);

export { User, Test }
