import mongoose from 'mongoose';

export interface ITag {
  name: string;
}

const tagSchema = new mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const tagModel = mongoose.model<ITag & mongoose.Document>('Tag', tagSchema);

export default tagModel;
