import pool from "../config/db.ts";
import type {IAuth} from "../models/authModel.ts";

export const getUserByEmail = async (email: string): Promise<IAuth> => {
  const query = `
  select * from users
  where email = $1
  limit 1
  `;

  const result = await pool.query(query, [email]);

  if (!result.rows.length) throw new Error("User not found");

  return result.rows[0];
};
export const createBlog = async (
  id: number,
  title: string,
  description: string,
  content: string
) => {
  const query = `
  insert into blogs(id_user, title, description, content)
  values($1, $2, $3, $4)
  `;

  const result = await pool.query(query, [id, title, description, content]);

  if (!result.rowCount) throw new Error("User not found");
};

export const getUserBlog = async (userId: number) => {
  const query = `
  select id, title, description, content from blogs
  where id_user = $1
  `;

  const result = await pool.query(query, [userId]);

  if (!result.rows.length) throw new Error("Blog not found");

  return result.rows;
};

export const deleteBlog = async (blogId: number, userId: number) => {
  const query = `
  delete from blogs
  where id = $1 and id_user = $2
  `;

  const result = await pool.query(query, [blogId, userId]);

  if (!result.rowCount) throw new Error("Blog not found");

  return result.rows;
};
