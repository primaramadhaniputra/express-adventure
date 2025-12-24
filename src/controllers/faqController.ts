import {type Request, type Response} from "express";
import * as faqService from "../services/faqService.ts";

export const createFaq = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required",
      });
    }

    const {question, answer} = req.body;

    // Validasi sederhana
    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required",
      });
    }

    const newFaq = await faqService.createFaq({question, answer});

    res.status(200).json({
      success: true,
      message: "Success create faq",
      data: newFaq,
    });
  } catch (error: any) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};
