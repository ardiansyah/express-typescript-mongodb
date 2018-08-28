import mongoose = require('mongoose');

mongoose.Promise = global.Promise;


class DBConnection {
  static mongooseInstance: any;
  static mongooseConnection: mongoose.Connection;

  constructor() {
    DBConnection.connect();
  }

  static connect() {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = mongoose.connection;
    this.mongooseConnection.once('open', () => {
      console.log('Connected to mongodb');
    });

    this.mongooseInstance = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
    });
    return this.mongooseInstance;
  }
}

export default DBConnection;