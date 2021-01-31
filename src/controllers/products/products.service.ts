import { Request, Response } from "express";
import auth from "../../libs/auth";
import { checkOmission } from "../../libs/product";
import ProductModel from "../../models/product/product";
import ProductWriteForm from "../../models/product/product.write";

const get_products = async (req: Request, res: Response) => {
  const isLogined = auth.isLogined(req);
  const products = await ProductModel.find();
  res.render("products/index.html", { isLogined, products });
};

const get_products_write = async (req: Request, res: Response) => {
  if (auth.isLogined(req)) {
    res.render("products/write.html");
  } else {
    res.redirect("/admin/signin");
  }
};

const post_products_write = async (req: Request, res: Response) => {
  const product: ProductWriteForm = req.body;
  const omission: string = checkOmission(req.body);
  if (omission) {
    res.render("products/write.html", {
      warningMessage: `${omission}은 필수입니다`,
      product,
    });
  } else {
    const data = {
      ...req.body,
      ownerId: auth.getUserId(req),
      ownerNickname: auth.getNickname(req),
    };
    const ret = await ProductModel.create(data);
    console.log(ret);
    res.redirect("/products");
  }
};

export = {
  get_products,
  get_products_write,
  post_products_write,
};
