import { Router } from "express";
import ctrl from "./products.service";

const router = Router();

router.get("/", ctrl.get_products);

export default router;
