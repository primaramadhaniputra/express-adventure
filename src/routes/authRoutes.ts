import express, {Router} from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.send("yahooo");
});

export default router;
