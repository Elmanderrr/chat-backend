import * as mongoose from "mongoose";


export abstract class AbstractModel {
  public name: string;
  abstract model: mongoose.Model<any>
}
