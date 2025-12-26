import {z} from "zod";

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title wajib di isi"),
    description: z.string().min(1, "Description wajib di isi"),
    content: z.string().min(1, "Content wajib di isi"),
  }),
});
export const deleteBlogSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Title wajib di isi"),
  }),
});
