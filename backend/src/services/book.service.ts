import { BookCreationDto, BookUpdateDto,  } from "../validators/book.schema";
import Book from "../models/Book";
import Chapter from "../models/Chapter";

export async function createBook(data: BookCreationDto){

    const newBook = new Book({...data});
    const savedBook = await newBook.save();
    if( !savedBook ){
        throw new Error("Book not saved");
    }
    return savedBook;   
}

export async function updateBook(bookId:string, data: BookUpdateDto){
    const existingBook = await Book.findById( bookId );
    if( !existingBook ){
        throw new Error("Book not found");
    }
    const updatedBook = await Book.findByIdAndUpdate(bookId, {...data}, {new: true});
    if ( !updatedBook ) {
        throw new Error("Book not found or updated");
    }
    return updatedBook;   
}

export async function deleteBook(id: string) {
    const deletedChapter = await Chapter.deleteMany({ bookId: id });
    const result = await Book.findByIdAndDelete( id );
    if (!result) {
        throw new Error("Book not found");
    }
    return result;
}

//may delete all chapters not may be based on query
export async function deleteAllBooks(query: any = {} ) {

    const deletedChapter = await Chapter.deleteMany();
    if ( deletedChapter.deletedCount === 0) {
        throw new Error("No Chapters matched the criteria for deletion.");
    }
    const result =await Book.deleteMany(query);
    if ( result.deletedCount === 0) {
        throw new Error("No books matched the criteria for deletion.");
    }
    return result;
}

export async function findBook(id: string) {
    const result = await Book.findById(id);
    if (!result) {
        throw new Error("Book not found");
    }
    return result;
}

export async function countBooks(query:any = {}) {
  return await Book.countDocuments(query);
}


//returns 
//books-> name id image  
//and its three latest chapters
//  with their name chapterNo createdAt
export async function findBooks(pageNo: number) {

    const limit = 20;
    const skip = ( pageNo - 1 ) * limit; //e.g. for 3rd page // 3-1 * 10 => 20 books

    const books = await Book.find()
        .sort({order: -1})
        .skip(skip)
        .limit(limit)
        .lean();    //this helps when adding custom fields manually
    
    for (const book of books) {
        const chapters = await Chapter.find({ bookId: book._id})
            .sort({order: -1})  //same order as books
            .limit(3)           //gives 3 chapters
            .select("name chapterNumber createdAt")
            .lean();    
        (book as any).latestChapters = chapters; //treats as plain js object and adds latestChapters to it 
    };  
    return books;
}
