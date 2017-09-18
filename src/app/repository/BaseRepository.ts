import * as mongoose from 'mongoose';
import IBaseRepository from './interfaces/IBaseRepository';
import { Document } from 'mongoose';

class BaseRepository<T extends mongoose.Document> implements IBaseRepository<T> {
  public _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  create(item: T, callback: (error: any, result: mongoose.Document[]) => void) {
    this._model.create(item, callback);
  }

  async update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    const user = await this._model.findById(_id);
    user.set(item);
    user.save(callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
      this._model.remove({
        _id: this.toObjectId(_id),
      }, (err) => callback(err, null));
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._model.find({}, callback);
  }

  findById(_id: string, callback: (error: any, result: any) => void) {
    this._model.findById(_id, callback);
  }

  private toObjectId (_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}

export default BaseRepository;