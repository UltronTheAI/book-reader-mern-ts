import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config'
import { randomBytes } from "crypto";

const jwtSecretKey =process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

//generate random jwt tokne
export async function generateToken(id: string, email: string, role: string, isEmailVerified: boolean) {
    
    if( !jwtSecretKey || typeof jwtSecretKey !== "string"){
    throw new Error("jwt is not defined or not string");
    }
    const token = jsonwebtoken.sign(
        {id, email, role, isEmailVerified}, //id email and role and isEmailVerified-> payload as object
        jwtSecretKey,                       //secretOrPrivateKey -> string
        {expiresIn: '30h'},                 //options?: SignOptions -> expiresIn
    ) 
    return token;
}


//random code generator 
export function generateRandomCode(): string{
    return randomBytes(16).toString("hex");
}

// export function generateRandomString(): string{
//     const strings ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let result ="";
//     for(let i =0; i<length; i++){
//         let randomIndex = Math.floor(Math.random()*strings.length);
//         result = result + strings.charAt(randomIndex);
//     }
//     return result;
// }