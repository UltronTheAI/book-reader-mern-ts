import * as userService from '../services/comment.service';
import { Request, Response } from 'express';


//to comment user needs to have verified email 
//otherwise cannot  comment 
//redirect them to verify email page 


//needs chapterId params
//needs userId content from body
export async function addNewComment(req: Request, res: Response): Promise<void>  {
  try {
    const { chapterId } = req.params;
    const { content, parentCommentId } = req.body;
    
    const userId = req.user?.id;
    if(!userId ) {
      res.json( {success: false, message: "User not loggedIn"});
      return;
    } 
    const comment = await userService.addNewComment(userId, chapterId, parentCommentId, content);
    res.json( {success: true, comment: comment} );
  } catch (error: any) {
     res.status(500).json({ error: error.message });
  }
}


export async function updateComment(req: Request, res: Response): Promise<void>  {
  try {
    const { commentId } = req.params;
    const { content } = req.body; 

    const userId = req.user?.id;
    if(!userId) {
      res.json( {success: false, message: "User not loggedIn or internal request error"});
      return;
    } 
    const comment = await userService.updateComment(userId, commentId, content );
    res.json( {success: true, comment: comment} );
  } catch (error: any) {
     res.status(500).json({ error: error.message });
  }
}

//soft delete for user 
export async function deleteCommentsContent(req: Request, res: Response): Promise<void>  {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;
    if(!userId) {
      res.json( {success: false, message: "internal request error"});
      return;
    } 

    const comment = await userService.deleteCommentsContent(userId, commentId);
    res.json( {success: true, comment: comment} );
  } catch (error: any) {
     res.status(500).json({ error: error.message });
  }
}

//after middleware to verify user role //
//hard deleting comments by admin// 
//deletes comments and their all child comments// 
export async function deleteComment(req: Request, res: Response): Promise<void>  {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;
    if(!userId) {
      res.json( {success: false, message: "internal request error"});
      return;
    } 

    const comment = await userService.deleteComment(userId, commentId);
    res.json( {message: 'success', comment: comment} );
  } catch (error: any) {
     res.status(500).json({ error: error.message });
  }
}

export async function readComments(req: Request, res: Response): Promise<void>  {
  try {
    const { chapterId } = req.params;
    const sortByQuery = req.query.sortBy;

    
    const sortBy = sortByQuery === "createdAt" ? "createdAt": "likes";
    const comments = await userService.readCommentsStructured(chapterId, sortBy);
    res.json( {success: true, comment: comments} );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function countComments(req: Request, res: Response): Promise<void>  {
  try {
    const { chapterId } = req.params;
    const count = await userService.countComments(chapterId);
    
    res.json( {success: true, total: count} );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// export async function readCommentsWithFilters(req: Request, res: Response): Promise<void>  {
//   try {
//     const { chapterId } = req.params;
//     const { sortBy, order, createdAt, likes, page, limit } = req.query;

//      const query = {};
//     if (chapterId) query.chapterId = chapterId;
//     if (createdAt) query.createdAt = { $gte: new Date(createdAt) };
//     if (likes) query.likes = { $in: [likes] }; //likes store userId not count so//

//     const sort = {};
//     if (sortBy === 'likes') {
//     } else if (sortBy) {
//       sort[sortBy] = order === 'asc' ? 1 : -1;
//     } else {
//       sort.createdAt = 1;
//     }
//      const comments = await userService.findCommentsWithFilters({
//       query,
//       sort,
//       page: parseInt(page) || 1,
//       limit: parseInt(limit) || 10
//     }); 

//     const total = await userService.countComments(query);//count comments

//     res.json( {success: true, comment: comments, total} );
//   } catch (error: any) {
//      res.status(500).json({ error: error.message });
//   }
// }