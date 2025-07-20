import { Request, Response } from 'express';
import * as bookService from '../services/book.service';
import { createBookSchema, updateBookSchema } from '../validators/book.schema';
import Book from '../models/Book';


export async function createBook(req: Request, res: Response): Promise<void> {
  try {
      //If valid, parsedResult.data is of type BookCreationDto — guaranteed 
      const parseResult = createBookSchema.safeParse(req.body); //zod validates req.body with schema
      if( !parseResult.success ){
        res.status(400).json({ errors: parseResult.error.flatten().fieldErrors });
        return;
      }

      const newBook = await bookService.createBook(parseResult.data);
      res.status(201).json({success: true, data: newBook});
      return;
  } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to create book" });
      return;
  }
}

export async function updateBook(req: Request, res: Response): Promise<void> {
  try { 
    const { bookId } = req.params;
    const parsedResult = updateBookSchema.safeParse(req.body); 
    if( !parsedResult.success ){
      res.status(400).json({success: false, errors: parsedResult.error.flatten().fieldErrors });
      return;
    }

    const updatedBook = await bookService.updateBook(bookId,parsedResult.data);
    res.status(200).json({ success: true, data: updatedBook});
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update book" });
    return;
  }
}

export async function deleteBook(req: Request, res: Response){
  try {
    const { id } = req.params;
    const deletedBook = await bookService.deleteBook(id);
    if (!deletedBook) {
      res.status(404).json({ message: "deletion of book failed" });
      return;
    }
    res.status(200).json({ success: true, data: deletedBook});   
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
}

export async function deleteAllBooks(req: Request, res: Response){
  try {
    const query =req.query;
    const deletedBook = await bookService.deleteAllBooks(query);
    if (!deletedBook) {
      res.status(404).json({ success: false, message: "deletion of all book failed" });
      return;
    }
    res.status(200).json({success: true, data: deletedBook});   
  } catch (error: any) {
    res.status(500).json({ error: error.message }); 
    return;
  }
}

//find book based on query and return count
export async function getBooksCount(req: Request, res: Response): Promise<void>  {
  try {
    const  query = req.query;
    const book = await bookService.countBooks(query);
    if(!book){
     res.status(404).json({ success: false, message: "No books found" });
    }
    res.status(200).json({ success: true, data: book});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//find single book with id and return book
export async function getBook(req: Request, res: Response): Promise<void>  {
  try {
    const book = await bookService.findBook(req.params.id);
    if(!book){
     res.status(404).json({ success: false, message: "No books found" });
    }
    res.status(200).json({ success: true, data: book});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getBooksWithFilters(req: Request, res: Response): Promise<void>  {
  try {
    //for now not using zod validation schema for this 
    const {
        genre,
        status,
        keyword,
        sortBy = "createdAt",
        order = "asc",   
        page = "1",
        limit = "10",
    } = req.query;

    const pageNumber = parseInt(page as string, 10 );
    const limitNumber = parseInt(limit as string, 10);
    const skipPage = (pageNumber-1) * limitNumber;
    
    const query: any = {};   //define empty
    
    if(keyword && typeof keyword === "string"){
      query.$text = { $search : keyword};
    }
    if(status && typeof status === "string"){
      query.status = status;
    }
    if(genre){
      if(Array.isArray(genre)){
        query.genre = { $in : genre}; //{ genre: { $in: [...] } } //mongoose needs this in array
      }else{
        query.genre = genre; //{ genre: "fiction" }// this in string ok
      }
    }
    

    //sort by what
    //sortBy createdAt updatedAt readCount title 
    //defines the way to sort this 
    //order defines asc or desc 
    // eg sortBy createdAt in asc -> gives oldest books
    // eg sortBy createdAt in desc -> gives new books
    // eg sortBy title in desc -> gives books from Z-a

    const sort: any = {};    //define empty 
    if(sortBy && typeof sortBy === "string"){
      sort[sortBy] = order === "asc" || order === "ascending" ? 1 : -1;
      //sort["readCount"(sortBy)] = asc(order); 
      //sort["readCount"] = 1 ; same as //sort = { readCount: 1 } 
    }
    
    const books = await Book.find(query)//returns in array so
      .sort(sort) //.sort({ readCount: 1 }); 
      .skip(skipPage)
      .limit(limitNumber);
   
    if(books.length === 0){//
     res.status(404).json({ message: "No books found" });
    }
    res.status(200).json({success: true, data: books});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


