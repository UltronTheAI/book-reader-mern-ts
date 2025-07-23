import mongoose from "mongoose";
import { Role, RoleEnum } from "../validators/user.schema";

//this is for ts 
export interface IUser extends mongoose.Document{
    _id: mongoose.Types.ObjectId,
    username?: string,
    email: string,
    password: string,
    role: Role, //ts needs this //  type  "admin" | "reader" // or Role  
    likedBooks: mongoose.Types.ObjectId[],
    favouriteChapters: mongoose.Types.ObjectId[],

    isEmailVerified: boolean,    //email verification
    verificationToken?: string;  
    verificationTokenExpires?: Date,
    
    createdAt?:Date,
    updatedAt?:Date,
}

const UserSchema = new mongoose.Schema<IUser>({
 username:{
        type: String,
        trim: true,
        default: "reader name"//this or can generate random default names
    },
    email:{
        type: String,
        required : true,
        trim: true,
    },
    password:{
        type: String,
        required : true,
    },

    //mongoose needs js values at runtime not ts types//
    // we expect to store  a single string, either "admin" or "reader"
    // enum: Role //  doesn't exist at runtime
    // enum: RoleEnum //  RoleEnum is a Zod object, not a string array
    // RoleEnum.options is an array of strings
    //enum: RoleEnum.options,   // this works!
    //enum: ["admin", "reader"],// this works!
    role:{
        type: String,
        required : true,
        enum: RoleEnum.options, 
        default: "reader",
    },
     likedBooks:[ //[] -> array to store users liked Books
        {  
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        }
    ],
    favouriteChapters:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
        }
    ],

    //email verification
    isEmailVerified:{type: Boolean, default: false,},
    verificationToken: {type: String},
    verificationTokenExpires: { type: Date },

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;


