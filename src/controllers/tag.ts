import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import TagModel, { ITag } from '../models/Tag';
import TagNotFoundException from '../exceptions/TagNotFoundException';
import IdIsNotValidException from '../exceptions/IdIsNotValidException';
import TagExistedException from '../exceptions/TagExistedException';

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags: ITag[] = await TagModel.find();
    res.send(tags);
  } catch (e) {
    next(e);
  }
};

export const getTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(new IdIsNotValidException(id));
  } else {
    const tag: ITag | null = await TagModel.findById(id);
    if (tag) {
      res.send(tag);
    } else {
      next(new TagNotFoundException(id));
    }
  }
};

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tag: ITag = req.body;
  const isExist = await TagModel.exists({ name: tag.name });
  if (isExist) {
    next(new TagExistedException(tag.name));
  } else {
    const newTag = new TagModel(tag);
    const saveTag = await newTag.save();
    res.send(saveTag);
  }
};

export const updateTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    next(new IdIsNotValidException(_id));
  } else {
    const newTag: ITag = req.body;
    const updateTag = await TagModel.updateOne({ _id }, newTag);
    if (updateTag.n < 1) {
      next(new TagNotFoundException(_id));
    } else {
      res.send('ok');
    }
  }
};

export const deleteTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(new IdIsNotValidException(id));
  } else {
    const tag = await TagModel.findByIdAndDelete(id);
    if (tag) {
      res.send(tag);
    } else {
      next(new TagNotFoundException(id));
    }
  }
};
