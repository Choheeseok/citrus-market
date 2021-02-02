import { Router } from "express";
import ctrl from "./products.service";
import upload from "../../libs/product/product.file";

const router = Router();

router.get("/", ctrl.get_products);

router.get("/write", ctrl.get_products_write);

router.post("/write", upload.array("images"), ctrl.post_products_write);

// router.post(
//   "/write",
//   upload.array("img"),
//   (req, res) => {
//     console.log(req.files);
//     ctrl.post_products_write(req, res);
//   },
//   ctrl.post_products_write
// );

router.get("/:id", ctrl.get_products_detail);

export default router;
