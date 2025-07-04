import { z } from 'zod';

export  const createChapterSchema = z.object({
    title: z.string(),
    content: z.string(),
    chapterNumber: z.number(),
    order: z.number(), //later if not given we will make highest next number as order number
});

export const updateChapterSchema = createChapterSchema.partial().extend({
    id: z.string().min(1," Id must have min 1 character")//bookId 
})

export type ChapterCreationDto = z.infer<typeof createChapterSchema>;
export type ChapterUpdatenDto = z.infer<typeof updateChapterSchema>;