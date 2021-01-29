import { Router } from "express";

const router = Router();

router.get("/", async (_, res) => {
  // business logic

  res.render("home/index.html");
});

export default router;
