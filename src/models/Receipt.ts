import mongoose from 'mongoose';

export interface IDetail {
  item: string;
  amount: number;
}

export interface IReceipt {
  store: string;
  tel: string;
  gstReg: string;
  date: Date;
  serialNo: string;
  details: IDetail;
  payments: string;
  subTotal: number;
  tender: number;
  change: number;
  qty: number;
  total: number;
  inclusive: string;
  gst: number;
  tag?: string;
}

const receiptSchema = new mongoose.Schema(
  {
    store: String,
    tel: String,
    gstReg: String,
    date: Date,
    serialNo: String,
    details: Object,
    payments: String,
    subTotal: Number,
    tender: Number,
    change: Number,
    qty: Number,
    total: Number,
    gst: Number,
    inclusive: String,
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
