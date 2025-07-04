import mongoose from 'mongoose';
import { Genre, bookStatus } from '../validators/book.schema';

export interface IBook extends mongoose.Document{
    _id: mongoose.Types.ObjectId,
    title: string,
    author: string,
    coverImage: string,
    description: string,
    genre: Genre | Genre[], //accept one enum or many array enum
    status: bookStatus,
    readCount: number,
    createdAt?:Date,
    updatedAt?:Date,
}

const bookSchema = new mongoose.Schema<IBook>({
    title: {    
       type: String,
       required: true,
       trim: true,
       maxLength: 50,
    },
    author: {  
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxLength: 200,
        default: "No description provided",
    },
    genre:[
        {
            type: String,
            enum: ["fiction", "horror", "action", "adventure"], //enum 
            default:"horror",
        }
    ],  
    status: {
        type: String,
        enum: ["completed", "ongoing", "drafted" ], //enum 
        default: "drafted",
    }, 
    coverImage: {
        type: String,
        default: "https://ocohjxbhun.ufs.sh/f/tusHOP3SRakyc8FLA65voD3SOBrVwQq1d6LJjy9GW8T5bnHF",
    },      
    readCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

// Indexes for better query performance
bookSchema.index( { genre: 1});
bookSchema.index( { status: 1});
bookSchema.index( { readCount: -1});
bookSchema.index( { createdAt: -1});
bookSchema.index( { title: "text", description: "text" });

const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
