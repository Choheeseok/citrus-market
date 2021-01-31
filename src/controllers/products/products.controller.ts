import { Router } from "express";
import ctrl from "./products.service";

const router = Router();

router.get("/", ctrl.get_products);

router.get("/write", ctrl.get_products_write);

router.post("/write", ctrl.post_products_write);

export default router;
