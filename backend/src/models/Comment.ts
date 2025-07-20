import mongoose from "mongoose";

export interface IComment extends mongoose.Document{
    _id: mongoose.Types.ObjectId,
    content: string,
    userId: mongoose.Types.ObjectId,
    chapterId: mongoose.Types.ObjectId,
    parentCommentId: mongoose.Types.ObjectId | null,
    likes: mongoose.Types.ObjectId[],
    isDeleted: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

const commentSchema = new mongoose.Schema<IComment>({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

commentSchema.index( {createdAt: 1} );
commentSchema.index( {likes: -1} );
const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;