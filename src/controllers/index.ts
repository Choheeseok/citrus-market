import { Router } from "express";
import home from "./home";
import login from "./admin";
import products from "./products";

const router = Router();

router.use("/", home);
router.use("/admin", login);
router.use("/products", products);

export default router;
