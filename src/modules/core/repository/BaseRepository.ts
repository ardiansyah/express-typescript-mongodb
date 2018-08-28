import IBaseRepository from '../interfaces/IBaseRepository';
import { Document, Model, Types } from 'mongoose';

export default class BaseRepository<T extends Document> implements IBaseRepository<T> {
  public _model: Model<Document>;

  constructor(SchemaModel: Model<Document>) {
    this._model = SchemaModel;
  }

  create(item: Object) {
    return this._model.create(item);
  }

  async update(_id: Types.ObjectId, item: T) {
    const user = await this._model.findById(_id);
    user.set(item);
    return user.save();
  }

  delete(_id: string) {
    return this._model.remove({
      _id: this.toObjectId(_id),
    });
  }

  async retrieve() {
    return this._model.find({}).exec();
  }

  findById(_id: string) {
    return this._model.findById(_id).exec();
  }

  findByField(options: Object) {
    return this._model.findOne(options).exec();
  }

  private toObjectId (_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}
