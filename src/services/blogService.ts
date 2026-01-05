import {and, eq} from "drizzle-orm";
import pool, {db} from "../config/db.ts";
import {blogs, users} from "../db/schema.ts";
import type {IAuth} from "../models/authModel.ts";

export const getUserByEmail = async (email: string) => {
  // const query = `
  // select * from users
  // where email = $1
  // limit 1
  // `;

  // const result = await pool.query(query, [email]);
  // if (!result.rows.length) throw new Error("User not found");
  // return result.rows[0];

  const drizzleResult = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!drizzleResult.length) throw new Error("User not found");
  return drizzleResult[0];
};
export const createBlog = async (
  id: number,
  title: string,
  description: string,
  content: string
) => {
  // const query = `
  // insert into blogs(id_user, title, description, content)
  // values($1, $2, $3, $4)
  // `;

  // const result = await pool.query(query, [id, title, description, content]);

  const drizzleResult = await db.insert(blogs).values({
    idUser: id,
    title: title,
    description: description,
    content: content,
  });

  if (!drizzleResult.rowCount) throw new Error("User not found");
};

export const getUserBlog = async (userId: number) => {
  // const query = `
  // select id, title, description, content from blogs
  // where id_user = $1
  // `;

  // const result = await pool.query(query, [userId]);

  // if (!result.rows.length) throw new Error("Blog not found");

  // return result.rows;

  const drizzleResult = await db
    .select()
    .from(blogs)
    .where(eq(blogs.idUser, userId));

  if (!drizzleResult.length) throw new Error("Blog not found");
  return drizzleResult;
};

export const deleteBlog = async (blogId: number, userId: number) => {
  // const query = `
  // delete from blogs
  // where id = $1 and id_user = $2
  // `;

  // const result = await pool.query(query, [blogId, userId]);

  // if (!result.rowCount) throw new Error("Blog not found");

  // return result.rows;

  const drizzleResult = await db
    .delete(blogs)
    .where(and(eq(blogs.id, blogId), eq(blogs.idUser, userId)));

  if (!drizzleResult.rowCount) throw new Error("Blog not found");

  return drizzleResult.rowCount;
};
