import 'dotenv/config';
import mongoose from 'mongoose';
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import ReceiptModel, { IReceipt } from '../models/Receipt';
import TagModel from '../models/Tag';
import IdIsNotValidException from '../exceptions/IdIsNotValidException';
import TagNotFoundException from '../exceptions/TagNotFoundException';
import ReceiptNotFoundException from '../exceptions/ReceiptNotFoundException';
import WrongQueryItemException from '../exceptions/WrongQueryItemException';

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

export const createReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receipt: IReceipt = req.body;
  if (!mongoose.Types.ObjectId.isValid(receipt.tag)) {
    next(new IdIsNotValidException(receipt.tag));
  } else {
    const isTagExist = await TagModel.exists({ _id: receipt.tag });
    if (!isTagExist) {
      next(new TagNotFoundException(receipt.tag));
    } else {
      const newReceipt = new ReceiptModel(receipt);
      const saveReceipt = await newReceipt.save();
      res.send(saveReceipt);
    }
  }
};

export const updateReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;
  const {tag} = req.body;

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
