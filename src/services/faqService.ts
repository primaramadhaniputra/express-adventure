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

export const getListFaq = async (): Promise<IFaq[]> => {
  const query = `select * from faqs`;

  const result = await pool.query(query);
  return result.rows;
};
