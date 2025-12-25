import express, {Router} from "express";
import * as faqController from "../controllers/faqController.ts";
import {authMiddleWare} from "../middleware/authMiddleware.ts";
import {validate} from "../middleware/validateMiddleware.ts";
import {creataeFaqSchema} from "../validations/faqValidations.ts";
import {catchAsync} from "../utils/catchAsync.ts";

const router: Router = express.Router();

router.get("/", catchAsync(faqController["getListFaq"]));
router.post(
  "/",
  validate(creataeFaqSchema),
  catchAsync(faqController["createFaq"])
);
router.delete("/:id", catchAsync(faqController["deleteFaq"]));

export default router;
