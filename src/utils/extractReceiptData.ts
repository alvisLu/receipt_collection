import { readFileSync } from 'fs';
import ReceiptModel, { IDetail } from '../models/Receipt';

interface IInclusiveAndGST {
  gst: string;
  inclusive: string;
}

interface ITenderAndChange {
  tender: number;
  change: number;
}

const fmtData = (line: string): Date => {
  const lineItem = line.split(' ');
  const dateOrg = lineItem[0].split(':')[1];
  const dArray = dateOrg.split('.');
  const year = parseInt(dArray[2], 10);
  const month = parseInt(dArray[1], 10) - 1;
  const day = parseInt(dArray[0], 10);

  const tArray = lineItem[2].split(':');
  const hour = parseInt(tArray[1], 10);
  const minute = parseInt(tArray[2], 10);
  const second = parseInt(tArray[3], 10);
  return new Date(year, month, day, hour, minute, second);
};

const extractSerialNo = (line: string): string => {
  const lineItem = line.split(':');
  const id = lineItem[1].split(' ')[0];
  return id;
};

const extractTelOrGSTReg = (line: string): string => line.split(':')[1];

const extractTotal = (line: string): string => {
  const lineItem = line.split(':');
  const tArray = lineItem[1].split(' ');
  const total = tArray[tArray.length - 1];
  return total;
};

const extractInclusiveAndGST = (line: string): IInclusiveAndGST => {
  const lineItem = line.split(' ');
  const result: IInclusiveAndGST = {
    gst: lineItem[lineItem.length - 1],
    inclusive: lineItem[1],
  };
  return result;
};

const extractTenderAndChange = (line: string): ITenderAndChange => {
  const lineItem = line.split(' ');
  const result: ITenderAndChange = {
    tender: parseInt(lineItem[1], 10),
    change: parseInt(lineItem[lineItem.length - 1], 10),
  };
  return result;
};

const extractReceiptData = async (path: string): Promise<any> => {
  const data = readFileSync(path, {
    encoding: 'utf8',
  });
  const lines = data.split(/\r?\n/);

  let receipt: any = {
    store: lines[0],
    tel: extractTelOrGSTReg(lines[1]),
    gstReg: extractTelOrGSTReg(lines[1]),
    date: fmtData(lines[4]),
    serialNo: extractSerialNo(lines[5]),
    details: [],
    payments: '',
    subTotal: '',
    tender: 0,
    change: 0,
    qty: 0,
    total: 0,
    inclusive: '',
    gst: 0,
  };

  let paymentsLine = 0;
  const detailsStartLine = 7;
  for (let i = detailsStartLine; i < lines.length - 1; i += 2) {
    if (lines[i].length === 0) {
      paymentsLine = i + 1;
      break;
    }

    const iArray = lines[i + 1].split(' ');
    const items = `${iArray[0]}${iArray[1]}${iArray[2]}`;
    const amount = parseInt(`${iArray[iArray.length - 1]}`, 10);
    const detail: IDetail = {
      item: `${lines[i]} ${items}`,
      amount,
    };
    receipt.details = [...receipt.details, detail];
    receipt.qty += parseInt(iArray[0], 10);
  }

  for (let i = paymentsLine; i < lines.length - 1; i += 1) {
    const sub = lines[paymentsLine].split(' ');
    const pIndex = 0;
    receipt.payments = sub[pIndex];
    receipt.subTotal = sub[sub.length - 1];

    const tenderRule = /^TENDER/g;
    if (lines[i].match(tenderRule)) {
      receipt = { ...receipt, ...extractTenderAndChange(lines[i]) };
    }

    const totalRule = /^Total :/g;
    if (lines[i].match(totalRule)) {
      receipt.total = extractTotal(lines[i]);
    }

    const gstRule = /GST/g;
    if (lines[i].match(gstRule)) {
      receipt = { ...receipt, ...extractInclusiveAndGST(lines[i]) };
    }
  }
  return new ReceiptModel(receipt);
};
export default extractReceiptData;
