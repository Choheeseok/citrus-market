import { Router } from "express";

const router = Router();

router.get("/", async (_, res) => {
  res.render("products/index.html");
});

export default router;
