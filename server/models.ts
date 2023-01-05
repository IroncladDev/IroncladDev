import mongoose from 'mongoose';

export interface IDataCollection extends mongoose.Document {
  timeUpdated: number;
  timeCreated: number;
  content: {
    [key: string]: any
  }
}

export const DataCollectionSchema = new mongoose.Schema({
  timeUpdated: { type: Number, default: Number(Date.now()) },
  timeCreated: { type: Number, default: Number(Date.now()) },
  content: { type: Object, default: {} }
});

const DataCollection = mongoose.models.DataCollection || mongoose.model<IDataCollection>("DataCollection", DataCollectionSchema);
export default DataCollection;