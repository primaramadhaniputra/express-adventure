import pool from "../config/db.ts";

export const getListUsers = async () => {
  const query = `
  select * from users
  `;

  const result = await pool.query(query);

  return result.rows;
};
export const updatePhotoProfile = async (photoProfile: string, id: number) => {
  const query = `
  update users
  set profile_picture = $1
  where id = $2
  `;

  const result = await pool.query(query, [photoProfile, id]);

  return result.rows;
};
