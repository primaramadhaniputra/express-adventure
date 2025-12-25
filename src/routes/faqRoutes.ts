import express, {Router} from "express";
import * as faqController from "../controllers/faqController.ts";
import {authMiddleWare} from "../middleware/authMiddleware.ts";

const router: Router = express.Router();

router.get("/", authMiddleWare, faqController["getListFaq"]);
router.post("/", faqController["createFaq"]);
router.delete("/:id", faqController["deleteFaq"]);

export default router;
