import {eq} from "drizzle-orm";
import pool, {db} from "../config/db.ts";
import {users} from "../db/schema.ts";

export const getListUsers = async () => {
  // const query = `
  // select * from users
  // `;
  // const result = await pool.query(query);

  // we moving using drizzle dude

  const result = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      password: users.password,
      role: users.role,
      profilePicture: users.profilePicture,
      createdAt: users.createdAt,
    })
    .from(users);

  return result;
};
export const updatePhotoProfile = async (photoProfile: string, id: number) => {
  // const query = `
  // update users
  // set profile_picture = $1
  // where id = $2
  // `;
  // // const result = await pool.query(query, [photoProfile, id]);

  const resutDrizzle = await db
    .update(users)
    .set({profilePicture: photoProfile})
    .where(eq(users.id, id));

  return resutDrizzle.rows;
};
