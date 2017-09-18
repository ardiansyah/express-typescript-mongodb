import Mongoose = require('mongoose');


class DBConnection {
  static mongooseInstance: any;
  static mongooseConnection: Mongoose.Connection;

  constructor() {
    DBConnection.connect();
  }

  static connect() {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = Mongoose.connection;
    // this.mongooseConnection.once('open', () => {
    //   console.log('Connected to mongodb');
    // });

    this.mongooseInstance = Mongoose.connect('mongodb://localhost/warriors');
    return this.mongooseInstance;
  }
}

export default DBConnection;