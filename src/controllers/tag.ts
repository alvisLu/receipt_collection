import { Request, Response, NextFunction } from 'express';
import TagModel, { ITag } from '../models/Tag';

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await TagModel.find();
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
  try {
    const {id} = req.params;
    const tag = await TagModel.findById(id);
    res.send(tag);
  } catch (e) {
    next(e);
  }
};

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tag: ITag = req.body;
    const isExist = await TagModel.exists({ name: tag.name });
    if (isExist) {
      res.send('the tag is is exists.');
    } else {
      const newTag = new TagModel(tag);
      const saveTag = await newTag.save();
      res.send(saveTag);
    }
  } catch (e) {
    next(e);
  }
};

export const updateTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const newTag: ITag = req.body;
    const updateTag = await TagModel.findByIdAndUpdate(id, newTag);
    if (updateTag) {
      res.send(`update success`);
    } else {
      res.send(`update failed`);
    }
  } catch (e) {
    next(e);
  }
};

export const deleteTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const tag = await TagModel.findByIdAndDelete(id);
    if (tag) {
      res.send(`delete success`);
    } else {
      res.send(`delete failed`);
    }
  } catch (e) {
    next(e);
  }
};
