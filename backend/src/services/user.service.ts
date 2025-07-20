import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Chapter from "../models/Chapter.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";

export async function changeUserRole( id: string, role: string) {
    const allowedRoles = ['admin', 'reader'];

    if (!allowedRoles.includes(role)) {
      throw new Error(`Invalid role needs to  be'admin' or 'reader'`);
    }
    const user = await User.findByIdAndUpdate(
        id,         //id of user to be changed
      { role },     //update to be made in object
      { new: true } //returns update docs instead of old(default)
    );
    return user;
}

export async function likeOrUnlikeBook(userId: string, bookId: string) {
  const user = await User.findById(userId);
  const book = await Book.findById(bookId);
  if(!user || !book ){
    throw new Error('User or Book not found by likeOrUnlikeBook');
  }

  //if already liked pull or filter out like
  //if not liked then push or add
  const alreadyLiked =  user?.likedBooks.some(id=> id.equals(bookId));
  if(alreadyLiked){
    (user.likedBooks as any).pull(bookId);  // pull fn of mongoose 
    // user.likedBooks = user.likedBooks.filter( id => !id.equals(bookId)); //ts safe removal 
  }else{
    user.likedBooks.push(new mongoose.Types.ObjectId(bookId) );  // add
  } 
  return await user.save();  
}

export async function likeOrUnlikeChapter(userId: string, chapterId: string) {
  const user = await User.findById(userId);
  const chapter = await Chapter.findById(chapterId);
  if(!user || !chapter){
    throw new Error('User or chapter not found by likeOrUnlikeChapter');
  }

  const alreadyLiked =  user?.favouriteChapters.some(id => id.equals(chapterId));
  if(alreadyLiked){
    (user.favouriteChapters as any).pull(chapterId);  // Remove
  }else{
    user.favouriteChapters.push(new mongoose.Types.ObjectId(chapterId) );  // add
  } 
  return await user.save(); 
}

export async function likeOrUnlikeComment(userId: string, commentId: string) {
  const user = await User.findById(userId);
  const comment = await Comment.findById(commentId);
  if(!user || !comment) {
    throw new Error('User or comment not found by likeOrUnlikeComment');
  }
  if(comment.isDeleted){
    throw new Error('Comment already deleted cannott like');
  }

  //updating like for every req not making new one
  const alreadyLiked =  comment.likes?.some(id => id.equals(userId));
  if(alreadyLiked){
    (comment.likes as any).pull(userId);  // Remove userId from comment likes
  }else{
    comment.likes.push(new mongoose.Types.ObjectId(userId) );  // add userId from comment likes
  } 
  await comment.save(); 
  return comment;
}

