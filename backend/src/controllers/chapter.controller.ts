import { Request, Response } from 'express';
import * as chapterService from '../services/chapter.service';
import { createChapterSchema, updateChapterSchema } from '../validators/chapter.schema';
import Chapter from '../models/Chapter';

// Create a chapter for a specific book by bookId
export async function createChapter(req: Request, res: Response): Promise<void>  {
  try {
    const { bookId } = req.params;
    const parsedResult = createChapterSchema.safeParse(req.body);
    if( !parsedResult.success){
      res.status(400).json({success: false, errors: parsedResult.error.flatten().fieldErrors });
      return;
    }

    const savedChapter = await chapterService.createChapter(bookId, parsedResult.data);
    if( !savedChapter){
      res.status(404).json({success: false, message: 'book creation failed '});
      return;
    }

    res.status(201).json({success: true, data: savedChapter});
  } catch (error: any) {
    res.status(500).json({success: false, error: error.message });
  }
}

// Update a chapter by bookId and chapterId
export async function updateChapter(req: Request, res: Response): Promise<void>  {
  try {
    const { bookId, chapterId } = req.params;
    const parsedResult = updateChapterSchema.safeParse(req.body);
    if( !parsedResult.success){
      res.status(400).json({success: false, errors: parsedResult.error.flatten().fieldErrors });
      return;
    }

    const updated = await chapterService.updateChapter(bookId, chapterId, parsedResult.data);
    if (!updated) {
      res.status(404).json({success: false, message: 'Chapter not found or book mismatched' });
      return;
    }

    res.status(200).json({success: true, data: updated});
  } catch (error: any) {
    res.status(500).json({success: false, error: error.message });
  }
}

// Count total chapters of a book
export async function countChaptersByBookId(req: Request, res: Response): Promise<void>  {
  try {
    const { bookId } = req.params;
    const count = await chapterService.countChaptersByBookId(bookId);
    res.status(200).json({success: true, totalChapters: count });
  } catch (error: any) {
    res.status(500).json({success: false, error: error.message });
  }
}

// Delete one chapter by bookId and chapterId
export async function deleteChapter(req: Request, res: Response): Promise<void>  {
  try {
    const { bookId, chapterId } = req.params;
    const deleted = await chapterService.deleteChapter(bookId, chapterId);
    if (!deleted){
      res.status(404).json({success: false, message: 'Chapter not found or book mismatched' });
      return;
    } 

    res.status(200).json({success: true, data: deleted});
  } catch (error: any) {
    res.status(500).json({success: false, error: error.message });
  }
}

// Delete all chapters by bookId
export async function deleteAllChapters(req: Request, res: Response): Promise<void>  {
  try {
    const { bookId } = req.params;
    const result = await chapterService.deleteAllChapters(bookId);

    res.status(200).json({success: true, data: result});
  } catch (error: any) {
    res.status(500).json({success: false, error: error.message });
  }
}

//like preview 
//find all chapters //but only _id title chapterNumber
export async function getChaptersByBookId(req: Request, res: Response): Promise<void>  {
  try {
    const { bookId } = req.params;
    const chapters = await chapterService.findAllChaptersByBookId(bookId);
    res.status(200).json({success: true, data: chapters});
  } catch (error: any) {
    res.status(500).json({success: false, error: error.message });
  }
}

//  $lt ->  less than
//  $gt ->  greater than 
// $lte ->  less than or equal
// $gte	->  greater or equal

// Get current chapter
// Get previous and next chapters by order field
export async function getChapterWithNavigation(req: Request, res: Response): Promise<void>  {
  try {
    const { bookId, chapterId } = req.params;

    const current = await Chapter.findOne({ _id: chapterId, bookId });
    if (!current){
      res.status(404).json({success: false, message: 'Chapter not found' });
      return;
    } 

    const previous = await Chapter.findOne(//Get exactly one by query 
      {
      bookId,
      order: { $lt: current.order } //find order less than current order -> prev chap
      }
    ).sort({ order: -1 });         //-1-> desc to asc //picks highest(-1) less than //eg if current -> 5 then 4 if 4 exist

    const next = await Chapter.findOne(
      {
      bookId,
      order: { $gt: current.order } //find order reater than current order -> next chap
      }
    ).sort({ order: 1 });          //1-> asc to desc //picks smallest(1) greater than

    res.status(200).json({success: true, current, previous, next });
  } catch (error: any) {
    res.status(500).json({success: false, error: error.message });
  }
}
