import { Router } from "express";
import home from "./home";
import login from "./admin";
import products from "./products";
import mypage from "./mypage";

const router = Router();

router.use("/", home);
router.use("/admin", login);
router.use("/products", products);
router.use("/mypage", mypage);

export default router;
