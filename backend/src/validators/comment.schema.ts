import { z } from 'zod';

export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export  const commentCreateSchema = z.object({
    content: z.string(),
    userId: objectIdSchema,
    chapterId: objectIdSchema,
    parentCommentId: objectIdSchema.optional().nullable(),
    likes: z.array(objectIdSchema).optional(),
});

export type commentCreateDto = z.infer<typeof commentCreateSchema>;