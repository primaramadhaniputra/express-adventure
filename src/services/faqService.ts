import {desc, eq, ilike} from "drizzle-orm";
import pool, {db} from "../config/db.ts";
import {faqs} from "../db/schema.ts";
import {type IFaq} from "../models/faqsModel.ts";

export const createFaq = async (faqData: IFaq) => {
  const {question, answer} = faqData;

  // const query = `
  //   insert into faqs (question, answer)
  //   values ($1, $2)
  //   returning *;
  // `;

  // const result = await pool.query(query, [question, answer]);
  const drizzleResult = await db
    .insert(faqs)
    .values({
      question: question,
      answer: answer,
    })
    .returning();
  return drizzleResult[0];
};

export const getListFaq = async (
  search: string,
  limit: number,
  offset: number
) => {
  // const dataQuery = `
  // select * from faqs
  // where question ilike $1
  // order by created_at desc
  // limit $2 offset $3
  // `;

  // const countQuery = `
  // select count(*) from faqs
  // where question ilike $1
  // `;

  // const searchParams = `%${search}%`;

  // const [dataResult, countResult] = await Promise.all([
  //   pool.query(dataQuery, [searchParams, limit, offset]),
  //   pool.query(countQuery, [searchParams]),
  // ]);

  const [dataDrizzleResult, countDrizzleResult] = await Promise.all([
    db
      .select()
      .from(faqs)
      .where(ilike(faqs.question, `%${search}%`))
      .orderBy(desc(faqs.createdAt))
      .limit(limit)
      .offset(offset),
    db.$count(faqs, ilike(faqs.question, `%${search}%`)),
  ]);

  return {
    rows: dataDrizzleResult,
    total: countDrizzleResult,
  };
};

export const deleteFaq = async (id: number): Promise<any[]> => {
  // const query = `
  //   delete from faqs
  //   where id = $1;
  // `;

  // const result = await pool.query(query, [id]);

  const drizzleResult = await db
    .delete(faqs)
    .where(eq(faqs.id, id))
    .returning();

  return drizzleResult;
};
