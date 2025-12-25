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
  const listFaq = await faqService.getListFaq();

  res.status(200).json({
    success: true,
    data: listFaq,
    message: "Success get list faqs",
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
