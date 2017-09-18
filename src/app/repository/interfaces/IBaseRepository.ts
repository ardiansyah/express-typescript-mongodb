import * as mongoose from 'mongoose';

interface IBaseRepository<T> {
  retrieve: (callback: (error: any, result: T) =>  void) => void;
  findById: (_id: string, callback: (error: any, result: T) => void) => void;
  create: (item: T, callback: (error: any, result: any ) => void) => void;
  update: (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void ;
  // update:(_id: string, item: T, callback: (error: any, result: any)=> void) => void ;
  delete: (_id: string, callback: (error: any, result: any) => void) => void;
}

export default IBaseRepository;