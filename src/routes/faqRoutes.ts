import express, {Router} from "express";
import * as faqController from "../controllers/faqController.ts";

const router: Router = express.Router();

router.post("/", faqController["createFaq"]);
router.get("/", faqController["getListFaq"]);

export default router;
