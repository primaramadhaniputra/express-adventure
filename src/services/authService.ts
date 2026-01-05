import {and, eq, gt, sql} from "drizzle-orm";
import pool, {db} from "../config/db.ts";
import {users} from "../db/schema.ts";
import {type IAuth} from "../models/authModel.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const register = async (createData: IAuth) => {
  const {username, email, password} = createData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // const query = `
  // insert into users(username, email, password)
  // values($1, $2, $3)
  // returning id, username, email, created_at;
  // `;
  // const result = await pool.query(query, [username, email, hashedPassword]);

  const drizzleResult = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      username: users.username,
      emai: users.email,
      created_at: users.createdAt,
    });

  return drizzleResult[0];
};

export const getListUsers = async () => {
  // const query = `
  // select * from users
  // `;
  // // const result = await pool.query(query);

  const resultDrizzle = await db
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

  return resultDrizzle;
};

export const getUserByEmail = async (email: string) => {
  // const query = `
  // select * from users
  // where email = $1
  // limit 1
  // `;

  // const result = await pool.query(query, [email]);
  // return result.rows[0];

  const resultDrizzle = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      password: users.password,
      role: users.role,
      profilePicture: users.profilePicture,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.email, email));

  return resultDrizzle[0];
};

export const forgotPassword = async (email: string) => {
  // generate token random
  const resetToken = crypto.randomBytes(32).toString("hex");

  // has token (agar jika db bocor, hacker tidak bisa lansung pakai tokennya)
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set kadaluarsa 15 menit
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  // const query = `
  // update users
  // set reset_password_token = $1,
  //     reset_password_expires = $2
  // where email = $3
  // returning id;
  // `;

  // const result = await pool.query(query, [hashedToken, expires, email]);
  // if (result.rows.length === 0) throw new Error("User not found");

  const resultDrizzle = await db
    .update(users)
    .set({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: expires,
    })
    .where(eq(users.email, email))
    .returning({id: users.id});
  if (resultDrizzle.length === 0) throw new Error("User not found");

  return resetToken;
};

export const resetPassword = async (token: string, newPassword: string) => {
  // has token yang datang agar bisa di cocokan dengan di db
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // ambil token yang belum expired

  const query = `
  select id from users
  where reset_password_token = $1
  and reset_password_expires > now();
  `;

  // const userResult = await pool.query(query, [hashedToken]);

  const drizzleUserResult = await db
    .select({id: users.id})
    .from(users)
    .where(
      and(
        eq(users.resetPasswordToken, hashedToken),
        gt(users.resetPasswordExpires, sql`now()`)
      )
    );

  if (!drizzleUserResult.length) throw new Error("Token expired");

  const userId = drizzleUserResult[0]!.id;

  // has password baru
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  // update password

  // const updateQuery = `
  // update users
  // set password = $1,
  //       reset_password_token = null,
  //       reset_password_expires = null
  // where id = $2
  // `;

  // await pool.query(updateQuery, [hashedPassword, userId]);

  await db
    .update(users)
    .set({
      password: hashedPassword,
      resetPasswordExpires: null,
      resetPasswordToken: null,
    })
    .where(eq(users.id, userId));
  return {success: true};
};
