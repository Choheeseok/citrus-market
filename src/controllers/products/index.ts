import { Router } from "express";
import ctrl from "./products.ctrl";

const router = Router();

router.get("/", ctrl.get_products);

export default router;
