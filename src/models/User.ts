import mongoose from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { versionKey: false }
);

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);
export default userModel;
