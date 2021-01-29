import { Router } from "express";

const router = Router();

router.get("/signup", async (_, res) => {
  res.render("admin/signup.html");
});

router.get("/signin", async (_, res) => {
  res.render("admin/signin.html");
});

export default router;
