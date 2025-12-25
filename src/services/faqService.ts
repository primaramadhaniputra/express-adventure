import pool from "../config/db.ts";
import {type IFaq} from "../models/faqsModel.ts";

export const createFaq = async (faqData: IFaq): Promise<IFaq> => {
  const {question, answer} = faqData;

  const query = `
    insert into faqs (question, answer)
    values ($1, $2)
    returning *;
  `;

  const result = await pool.query(query, [question, answer]);
  return result.rows[0];
};

export const getListFaq = async (
  search: string,
  limit: number,
  offset: number
) => {
  const dataQuery = `
  select * from faqs
  where question ilike $1
  order by created_at desc
  limit $2 offset $3
  `;

  const countQuery = `
  select count(*) from faqs
  where question ilike $1
  `;

  const searchParams = `%${search}%`;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [searchParams, limit, offset]),
    pool.query(countQuery, [searchParams]),
  ]);

  return {
    rows: dataResult.rows,
    total: parseInt(countResult.rows[0].count),
  };
};

export const deleteFaq = async (id: number): Promise<any[]> => {
  const query = `
    delete from faqs
    where id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows;
};
