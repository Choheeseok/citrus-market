import { Response } from "express";
import productPost from "./post.check";
import ProductWriteForm from "../../models/product/product.write";

const validatePostProduct = (
  res: Response,
  product: ProductWriteForm
): boolean => {
  const omission = productPost.checkOmission(product);
  if (omission) {
    res.render("products/write.html", {
      warningMessage: `${omission}은 필수입니다`,
      product,
    });
    return false;
  }
  return true;
};

export default validatePostProduct;
