import {type Request, type Response} from "express";
import * as faqService from "../services/faqService.ts";
import {catchAsync} from "../utils/catchAsync.ts";

export const createFaq = async (req: Request, res: Response) => {
  const {question, answer} = req.body;

  const newFaq = await faqService.createFaq({question, answer});

  res.status(200).json({
    success: true,
    message: "Success create faq",
    data: newFaq,
  });
};

export const getListFaq = async (req: Request, res: Response) => {
  const search = (req.query.search as string) || "";
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;

  const offset = (page - 1) * perPage;

  const {rows, total} = await faqService.getListFaq(search, perPage, offset);

  const totalPages = Math.ceil(total / perPage);

  res.status(200).json({
    success: true,
    message: "Success get list faqs",
    data: rows,
    meta: {
      page: page,
      perPage: perPage,
      totalPage: totalPages,
      totalData: total,
    },
  });
};

export const deleteFaq = async (req: Request, res: Response) => {
  const id = req.params.id;

  await faqService.deleteFaq(Number(id));

  res.status(200).json({
    success: true,
    message: "Success delete faq",
  });
};
