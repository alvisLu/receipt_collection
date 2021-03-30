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
  }

  const tag = await TagModel.findById(id);
  if (tag) {
    res.send(tag);
  } else {
    next(new TagNotFoundException(id));
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
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(new IdIsNotValidException(id));
  }

  const newTag: ITag = req.body;
  const updateTag = await TagModel.findByIdAndUpdate(id, newTag);
  if (updateTag) {
    res.send(updateTag);
  } else {
    next(new TagNotFoundException(id));
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
  }

  const tag = await TagModel.findByIdAndDelete(id);
  if (tag) {
    res.send(tag);
  } else {
    next(new TagNotFoundException(id));
  }
};
