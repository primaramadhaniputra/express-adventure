import express, {Router} from "express";
import {validate} from "../middleware/validateMiddleware.ts";
import {
  createBlogSchema,
  deleteBlogSchema,
} from "../validations/blogValidation.ts";
import * as BlogController from "../controllers/blogController.ts";
import {catchAsync} from "../utils/catchAsync.ts";
import {roleMiddleWare} from "../middleware/roleMiddleware.ts";

const router: Router = express.Router();

router.post(
  "/",
  validate(createBlogSchema),
  catchAsync(BlogController["createBlog"])
);
router.get(
  "/",
  roleMiddleWare("admin"),
  catchAsync(BlogController["getUserBlog"])
);
router.delete(
  "/:id",
  validate(deleteBlogSchema),
  catchAsync(BlogController["deleteBlog"])
);

export default router;
