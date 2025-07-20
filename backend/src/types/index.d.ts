// types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";


//define our custom JWT payload type 
export interface MyJwtPayload {
  id: string;
  email: string;
  role: "admin" | "reader";
}

//why define our custom JWT payload type //
// interface JwtPayload {
//   [key: string]: any;
// }
//That’s too loose — it doesn’t know about your id, email, or role


//Ensure tsconfig.json includes the custom types
//{
//   "compilerOptions": {
//     "typeRoots": ["./node_modules/@types", "./types"]
//   }
// }

//adding  new properties to Express.Request
//By default, Express.Request has no user property.
//but we want req.user =user //
//after this,  we can use
//req.user?.email
//req.user?.role
declare global {
  namespace Express {
    interface Request {
     user?: MyJwtPayload;
    }
  }
}
