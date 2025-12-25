import {z} from "zod";

export const creataeFaqSchema = z.object({
  body: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});
