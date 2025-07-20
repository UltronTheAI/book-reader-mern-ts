import { z } from 'zod';

//zod uses this at runtime to validate incoming user data
//Can be used to derive a TypeScript type
export const RoleEnum = z.enum(["admin", "reader"]);//creates a Zod enum

//using zod enum to derive ts type
//in compile time we can get 
//this gives ts union type //  type Role = "admin" | "reader"  
export type Role = z.infer<typeof RoleEnum>;


export  const userCreateSchema = z.object({
    username: z.string().optional(),
    email: z.string(),
    password: z.string(),
    // role: RoleEnum.optional().default("reader"), //not taking from input
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export  const userResponseSchema = z.object({
    username: z.string().optional(),
    email: z.string(),
    role: RoleEnum.optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type userCreateDto = z.infer<typeof userCreateSchema>;
export type userResponseDto = z.infer<typeof userResponseSchema>;