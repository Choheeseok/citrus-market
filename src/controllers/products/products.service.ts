import { Request, Response } from "express";
import auth from "../../libs/auth";
import date from "../../libs/date";
import validatePostProduct from "../../libs/product/post.validation";
import ProductModel from "../../models/product/product";
import ProductWriteForm from "../../models/product/product.write";

const get_products = async (req: Request, res: Response) => {
  const isLogined = auth.isLogined(req);
  const dbProducts = await ProductModel.find();
  let products: any[] = [];
  if (dbProducts.constructor === Array) {
    const now = new Date();
    products = dbProducts.map((product) => {
      return {
        ...product._doc,
        timeDiff: date.timeDifference(now, product.createdAt),
      };
    });
  }

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
  let filenames: string[] = [];
  if (req.files.constructor === Array) {
    filenames = req.files.map((file) => file.filename);
  }
  const product: ProductWriteForm = { ...req.body, images: filenames };

  if (validatePostProduct(res, product)) {
    const data = {
      ...product,
      ownerId: auth.getUserId(req),
      ownerNickname: auth.getNickname(req),
    };
    await ProductModel.create(data);
    res.redirect("/products");
  }
};

const get_products_detail = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  const dateFormat = date.dateFormat(product.createdAt);
  res.render("products/detail.html", { product, dateFormat });
};

export = {
  get_products,
  get_products_write,
  post_products_write,
  get_products_detail,
};
