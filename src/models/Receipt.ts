import mongoose from 'mongoose';

export interface IReceipt {
  date: string;
  serialNo: string;
  tag: string;
}

const receiptSchema = new mongoose.Schema(
  {
    date: String,
    serialNo: String,
    tag: {
      ref: 'Tag',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { versionKey: false }
);

const ReceiptModel = mongoose.model<IReceipt & mongoose.Document>(
  'Receipt',
  receiptSchema
);

export default ReceiptModel;
