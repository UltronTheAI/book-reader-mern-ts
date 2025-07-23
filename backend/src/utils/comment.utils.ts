import { IComment } from "../models/Comment";

//this takes comments from mongoose Documents ->IComment
//and returns into threaded/nested structure
export function nestedComments(comments: IComment[], sortBy: "createdAt" | "likes"){
  //map to store key commentId and comment obj 
  //any is for loose typing 
  //if we use use Map<String, Object>() ts doesnot know comment._id comment.replies 
  const map = new Map<String, any>(); 
  const roots: any[]= [];            //to store all root comments obj

  comments.forEach(c=> {  //for each comments received from mongoose
    //we turn them into plain js objects and add replies to each comment
    const comment = { ...c.toObject(), replies: [] }; 
    //add each comment to map
    map.set(comment._id, comment);
  });
  //now we have all comments in map //but randomly


  //check if comment has parentCommentId its a child comment so
  // place current comment in parentcomment replies[]
  //if no parentCommentId of comment then it is root comment
  map.forEach(comment =>{
    const pcId = comment.parentCommentId?.toString();
    if(pcId){
      map.get(pcId).replies.push(comment);
    }else{
      roots.push(comment);
    }
  });

   // Recursively sort each level
  function sortReplies(list: any[]){

    // Sort the current level of comments based on likes or createdAt 
    list.sort((a,b) =>{
      if(sortBy.toString() === "likes") {
        return b.likes.length - a.likes.length;//more likes first
      } 
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();//newest-> greater time
    }); 
    
    list.forEach( item => {     
      if(item.replies?.length){ //sort if item has any replies in array
        sortReplies(item.replies);//recursive sortReplies of each comment
      }
    });
  }

  //sorting roots 
  sortReplies(roots);
  //returns nested comments
  return roots;
}

//this is js function not mongoose
// .sort() takes a function that returns a number.
// list.sort(sortFn);
// If negative → a before b
// If positive → b before a
// If 0 → same


// function sortFn(a: any, b: any){
//   if(sortBy.toString() === "likes"){
//     // return a.likes.length - b.likes.length; //asc 
//     return b.likes.length - a.likes.length; //desc 
//   }
//   // return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();//oldest first
//   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();//newest-> greater time
// }
