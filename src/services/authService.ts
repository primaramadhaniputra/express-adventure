import pool from "../config/db.ts";
import {type IAuth} from "../models/authModel.ts";
import bcrypt from "bcrypt";

export const register = async (createData: IAuth): Promise<IAuth> => {
  const {username, email, password} = createData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const query = `
  insert into users(username, email, password)
  values($1, $2, $3)
  returning id, username, email, created_at;
  `;

  const result = await pool.query(query, [username, email, hashedPassword]);

  return result.rows[0];
};

export const getListUsers = async (): Promise<IAuth[]> => {
  const query = `
  select * from users
  `;

  const result = await pool.query(query);

  return result.rows;
};

export const getUserByEmail = async (email: string): Promise<IAuth> => {
  const query = `
  select * from users
  where email = $1
  limit 1
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};
