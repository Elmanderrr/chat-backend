import * as Mongo from 'mongodb';
import * as mongoose from 'mongoose';

export class DbController {
  constructor() {
    this.connect()
  }

  public db: Mongo.Db;
  private dbName = 'mydb';
  private dbAdress = process.env.DB_HOST || '127.0.0.1';
  private dbPort = process.env.DB_PORT || 27017;

  public connect () {

    // const db = new Mongo.MongoClient(`mongodb://${this.dbAdress}/${this.dbPort}`);

    mongoose.connect(`mongodb://${this.dbAdress}/${this.dbPort}`).then((db: mongoose.Mongoose) => {
      // console.log(db)
    })
  }
}


