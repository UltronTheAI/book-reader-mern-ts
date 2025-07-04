import * as userService from '../services/user.service';
import { Request, Response } from 'express';

//by default role is set to reader in User model
//so changing the role 
export async function changeUserRole(req: Request, res: Response): Promise<void>  {
  try {
    const { role } = req.body;  
    const { id } = req.params;  //id of user whose role is to be changed
    const userId = req.user?.id;
    if(!userId) {
      res.json( {success: false, message: "internal request error"});
      return;
    } 

    if( !id) res.status(404).json({success: false, message: 'id cannot found'});

    if(userId.toString() === id.toString()){
      res.status(500).json({success: false,  message: 'You cannot change ur own role. change others only'});
    }

    const user = await userService.changeUserRole( id, role );
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
    } 
    res.status(201).json( { success: true, message: 'Role updated', changedUser: user });
  } catch (error: any) {
     res.status(500).json({ success: false, error: error.message });
  }
}

export async function likeOrUnlikeBook(req: Request, res: Response): Promise<void>  {
  try {
    const { bookId } = req.params;//get from params
    const userId = req.user?.id;
    if(!userId) {
      res.json( {success: false, message: "internal request error"});
      return;
    } 

    const user = await userService.likeOrUnlikeBook(userId, bookId);
    res.status(201).json({ success: true, user: user} );
  } catch (error: any) {
     res.status(500).json({ success: false, error: error.message });
  }
}

export async function likeOrUnlikeChapter(req: Request, res: Response): Promise<void>  {
  try {
    const { chapterId } = req.params;//get from params
    const userId = req.user?.id;
    if(!userId) {
      res.json( {success: false, message: "internal request error"});
      return;
    } 
    const user = await userService.likeOrUnlikeChapter(userId, chapterId);
    res.status(201).json({ success: true, user: user} );
  } catch (error: any) {
     res.status(500).json({ success: false, error: error.message });
  }
}

export async function likeOrUnlikeComment(req: Request, res: Response): Promise<void>  {
  try {
    const { commentId } = req.params;//get from params
    const userId = req.user?.id;
    if(!userId) {
      res.json( {success: false, message: "internal request error"});
      return;
    } 

    const comment = await userService.likeOrUnlikeComment(userId, commentId );
    res.status(201).json({ success: true, comment: comment } );
  } catch (error: any) {
     res.status(500).json({ success: false, error: error.message });
  }
}