import { Router } from "express";
import home from "./home/home.controller";
import login from "./admin/admin.controllers";
import products from "./products/products.controller";
import mypage from "./mypage/mypage.controller";

const router = Router();

router.use("/", home);
router.use("/admin", login);
router.use("/products", products);
router.use("/mypage", mypage);

export default router;
