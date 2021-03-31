import 'dotenv/config';
import mongoose from 'mongoose';
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { createReadStream } from 'fs';
import readline from 'readline';

import ReceiptModel, { IReceipt } from '../models/Receipt';
import TagModel from '../models/Tag';
import IdIsNotValidException from '../exceptions/IdIsNotValidException';
import TagNotFoundException from '../exceptions/TagNotFoundException';
import ReceiptNotFoundException from '../exceptions/ReceiptNotFoundException';
import WrongQueryItemException from '../exceptions/WrongQueryItemException';
import NotUploadReceiptFileException from '../exceptions/NotUploadReceiptFileException';

const extractReceiptData = async (path: string): Promise<any> => {
  const receipt: any = {
    date: new Date(),
    serialNo: '0',
    amounts: '0',
  };

  const rl = readline.createInterface({
    input: createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  const dateRule = /^Date:[\d]/g;
  const receiptIdRule = /^Receipt ID:/g;
  const totalRule = /^Total :/g;

  for await (const line of rl) {
    const findDate = line.match(dateRule);
    const findReceiptId = line.match(receiptIdRule);
    const findTotal = line.match(totalRule);

    if (findDate) {
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
      receipt.date = new Date(year, month, day, hour, minute, second);
    }

    if (findReceiptId) {
      const lineItem = line.split(':');
      const id = lineItem[1].split(' ')[0];
      receipt.serialNo = id;
    }

    if (findTotal) {
      const lineItem = line.split(':');
      const tArray = lineItem[1].split(' ');
      const total = tArray[tArray.length - 1];
      receipt.amounts = total;
    }
  }

  return new ReceiptModel(receipt);
};

export const uploadReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const receiptFiles: any = req.files;
    if (_.isEmpty(receiptFiles)) {
      next(new NotUploadReceiptFileException());
    } else {
      let saveReceipts: any[] = [];

      for (const file of receiptFiles) {
        const receipt = await extractReceiptData(file.path);
        receipt.save();
        saveReceipts = [...saveReceipts, receipt];
      }
      res.send(saveReceipts);
    }
  } catch (e) {
    next(e);
  }
};

export const searchReceipts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (_.isUndefined(req.query.tag)) {
    next(new WrongQueryItemException());
  } else {
    const queryData = req.query.tag as string;
    const tagNames = queryData.split(',');
    const tagIdsObj = await TagModel.find({ name: { $in: tagNames } }).select(
      '-name'
    );
    const isSearchAll = _.isEmpty(queryData);

    if (isSearchAll || tagIdsObj) {
      const tagIds = tagIdsObj.map(t => t._id);
      const findParams = isSearchAll ? {} : { tag: { $in: tagIds } }; // empty object mean find all
      const receipts: IReceipt[] = await ReceiptModel.find(findParams).populate(
        'tag',
        '-_id'
      );
      res.send(receipts);
    }
  }
};

export const updateReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;
  const { tag } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    next(new IdIsNotValidException(_id));
  } else if (!mongoose.Types.ObjectId.isValid(tag)) {
    next(new IdIsNotValidException(tag));
  } else {
    const isTagExist = await TagModel.exists({ _id: tag });
    if (!isTagExist) {
      next(new TagNotFoundException(tag));
    } else {
      const receipt = await ReceiptModel.updateOne({ _id }, { tag });
      if (receipt.n < 1) {
        next(new ReceiptNotFoundException(_id));
      } else {
        res.send('ok');
      }
    }
  }
};
