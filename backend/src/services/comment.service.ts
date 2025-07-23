import Chapter, { IChapter } from "../models/Chapter";
import Comment, { IComment } from "../models/Comment";
import User from "../models/User";
import {nestedComments} from "../utils/comment.utils";

export async function addNewComment(userId: string, chapterId: string, parentCommentId: string, content: string) {
  const user = await User.findById(userId);
  const chapter = await Chapter.findById(chapterId);
  if(!user || !chapter) {
    throw new Error('User or chapter not found by addNewComment');
  }
  //even if parentCommentId isDeleted true or false, u can add comment to it 
  //so dont need to check // parentCommentId isDeleted true nor false//

  //if parentComment is null no need to check
  //parentcomment if not null then parentcomment should be present in same chapter
  if(parentCommentId != null){
    const parentComment = await Comment.findById(parentCommentId);
    if(!parentComment){
      throw new Error('Parent Comment doesnot exists');
    }
    //compare chapterId value not their instances so//
    if(parentComment.chapterId?.toString() !== chapterId.toString()){
      throw new Error('Parent Comment doesnot exist on same chapter, cannot reply');
    }
  }
  const newComment = new Comment({
    content: content,
    userId: userId,
    chapterId: chapterId,
    parentCommentId: parentCommentId
  });
 
  await newComment.save(); 
  return newComment;
}

//updating comment //
//check if same user comment 
//if comment isDeleted true then cannot update content
//if comment isDeleted false then update content only
//parentComponentId will not be updated nor commentId
export async function updateComment(userId: string, commentId: string, content: string) {
  const user = await User.findById(userId);
  const comment = await Comment.findById(commentId);
  if(!user || !comment) {
    throw new Error('User or comment not found by updateComment');
  }
  if(comment.userId?.toString() !== userId.toString()){
    throw new Error('unauthorized: comment doesnot belong to user');
  }

  if(comment.isDeleted){
    throw new Error('Comment already deleted cannot update');
  }

  const updatedComment = await Comment.findByIdAndUpdate(commentId, {content}, {new: true});
  if(!updatedComment){
    throw new Error('Comment not found by updateComment');
  }
  return updatedComment;
}

export async function countComments(chapterId: string){
  const chapter = await Chapter.findById(chapterId);
  if(!chapter) {
    throw new Error('Chapter not found by countComments');
  }
  //counting all comments of chapter which has isDeleted: false
  const count = await Comment.countDocuments( {chapterId, isDeleted: false} );
  return count;
}

//not used
//this will display comments randomly no threading 
export async function readComments(chapterId: string){
  const comments = await Comment.find({ chapterId })
    .sort({ sortBy: -1 })       // newest is big in time
    .populate('userId', 'email');//populate with username userId avatar //standard
  return comments;
}

//this willmake proper structure for comments
export async function readCommentsStructured(chapterId: string, sortBy: "createdAt" | "likes"){
  const comments = await Comment.find({ chapterId })
    .sort({ sortBy: -1 }) // newest is big in time
    .populate('userId', 'email');
  return nestedComments(comments, sortBy);//calling utils 
}


//soft delete 
export async function deleteCommentsContent(userId: string, commentId: string) {
  const user = await User.findById(userId);
  if(!user) {
    throw new Error('User not found by deleteComment');
  }

  const comment = await Comment.findById(commentId);
  if(!comment){
    throw new Error('Comment not found by deleteComment');
  }
  if(comment.isDeleted){
    throw new Error('Comment already deleted cannot delete again');
  }
  if(comment.userId?.toString() !== userId.toString()){//dont need to check for child comments 
    throw new Error('unauthorized: comment doesnot belong to user');
  }
  const updatedComment = await Comment.findByIdAndUpdate(commentId, {content: "deleted", isDeleted: true}, {new: true});
  return updatedComment;
}

//hard delete
export async function deleteComment(userId: string, commentId: string) {
  const user = await User.findById(userId);
  if(!user) {
    throw new Error('User or chapter not found by deleteComment');
  }

  const comment = await Comment.findById(commentId);
  if(!comment){
    throw new Error('Comment not found by deleteComment');
  }
  if(comment.userId?.toString() !== userId.toString()){//dont need to check for child comments 
    throw new Error('unauthorized: comment doesnot belong to user');
  }
  await deleteCommentAndReplies(commentId);//deleting all linked comments
  return comment;
}

// Recursively delete comment and all its child replies
export async function deleteCommentAndReplies(commentId: string) {
  // Get all direct children which has same Id as this commentId
  const childComments = await Comment.find({ parentCommentId: commentId });
  
  // For each child, delete its children too
  for (const child of childComments) {
    await deleteCommentAndReplies(child._id.toString());
  }
  // Delete the current comment
  await Comment.findByIdAndDelete(commentId);
}



// export async function findCommentsWithFilters({
//     query = {},
//     sort = {},
//     page = 1,
//     limit = 10
//   } = {}) {
//   const skip = (page - 1) * limit;

//   const comments = await Comment.find(query)
//     .sort(sort)
//     .skip(skip)
//     .limit(limit)
//     .populate('userId', 'email'); 

//   return comments;
// }


