import {z} from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    email: z.email("Format email tidak valid"),
    password: z.string().min(1, "Password wajib di isi"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Format email tidak valid"),
    password: z.string().min(1, "Password wajib diisi"),
  }),
});
