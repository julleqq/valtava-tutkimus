import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.enum(['julle', 'tatu']),
    topic: z.string(),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
