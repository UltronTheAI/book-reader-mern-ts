import { z } from 'zod';

export const genreEnum = z.enum(["fiction" , "horror" , "action" , "adventure"]);
export type Genre = z.infer<typeof genreEnum>;

export const bookStatusEnum = z.enum(["completed" , "ongoing" , "drafted"]); //this for zod validation
export type bookStatus = z.infer<typeof bookStatusEnum>;//this for mongoose

//used for zod validation of all incoming and outgoing data
export const createBookSchema = z.object({
    title: z.string(),
    author: z.string(),
    coverImage: z.string().url().optional(),
    description: z.string().max(200).optional(),
    genre: z.array(genreEnum).optional(),
    status: bookStatusEnum.optional(),
});

//this creates new update schema with all fields of createBookSchema optional
export const updateBookSchema = createBookSchema.partial();


//They are types which hold data in object, and are validated by Zod.
//Zod validates, then infers the object type for you.
export type BookCreationDto = z.infer<typeof createBookSchema>;
export type BookUpdateDto = z.infer<typeof updateBookSchema>;
