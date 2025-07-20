import { BookCreationDto, BookUpdateDto,  } from "../validators/book.schema";
import Book from "../models/Book";
import Chapter from "../models/Chapter";

export async function createBook(data: BookCreationDto){

    const newBook = new Book({...data});
    const savedBook = await newBook.save();
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
    const deletedBook = await Book.findByIdAndDelete( id );
    return deletedBook;
}

//may delete all chapters not may be based on query
export async function deleteAllBooks(query: any = {} ) {
    const deletedChapter = await Chapter.deleteMany();
    const deletedBook =await Book.deleteMany(query);
    return deletedBook;
}

export async function countBooks(query:any = {}) {
  return await Book.countDocuments(query);
}

export async function findBook(id: string) {
   const result = await Book.findOne( {_id: id} );
    return result;
}
