import Book from "../models/Book";
import Chapter from "../models/Chapter";
import { ChapterCreationDto, ChapterUpdatenDto } from "../validators/chapter.schema";

//find book by id and create chapter 
export async function createChapter(bookId: string, data: ChapterCreationDto){
    const existingBook = await Book.findById(bookId);
    if( !existingBook ){
        throw new Error("Book not found");
    }
    
    const newChapter = new Chapter( { ...data, bookId} );
    const savedChapter = await newChapter.save();
    return savedChapter;   
}

//find book by bookId, chapterId and update that chapter 
export async function updateChapter(bookId: string, chapterId: string, data: ChapterUpdatenDto){
    const existingBook = await Book.findById(bookId);
    if( !existingBook ){
        throw new Error("Book not found");
    }

    const existingChapter = await Chapter.findById(chapterId);
    if( !existingChapter ){
        throw new Error("Chapter not found");
    }
    if(existingChapter?.bookId.toString() !== bookId.toString()){
        throw new Error("Chapter not found in Book ");
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, {...data}, {new:true})
    return updatedChapter;   
}


//total no of chapters by book 
export async function countChaptersByBookId(bookId: string) {
  return await Chapter.countDocuments({ bookId });
}

//delete all chapters by bookId
export async function deleteAllChapters(bookId: string) {
    const deletedChapter =await Chapter.deleteMany({ bookId });
    return deletedChapter;
}

//delete one chapter by bookId and chapterId
export async function deleteChapter(bookId: string, chapterId: string) {
    const deletedChapter = await Chapter.findOneAndDelete( {_id: chapterId, bookId  } );
    return deletedChapter;
}

//find all chapters //but only _id title chapterNumber
export async function findAllChaptersByBookId(bookId: string) {
    return await Chapter.find({ bookId })
        .select('_id title chapterNumber')
        .sort({ order: -1 });
}