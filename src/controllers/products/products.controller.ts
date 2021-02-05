import { Router } from "express";
import ctrl from "./products.service";
import upload from "../../libs/product/file";

const router = Router();

router.get("/", ctrl.get_products);

router.get("/write", ctrl.get_products_write);

router.post("/write", upload.array("images"), ctrl.post_products_write);

router.get("/:id", ctrl.get_products_detail);

router.get("/update/:id", ctrl.get_products_update);

router.post("/update/:id", upload.array("images"), ctrl.post_proudcts_update);

export default router;
