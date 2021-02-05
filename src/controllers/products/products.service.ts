import { Request, Response } from "express";
import auth from "../../libs/auth";
import date from "../../libs/date";
import getTimeFormatProducts from "../../libs/product/dateFormat";
import validatePostProduct from "../../libs/product/post.validation";
import ProductModel from "../../models/product/product";
import ProductWriteForm from "../../models/product/product.write";
import { deleteFiles } from "../../libs/product/file";

const get_products = async (req: Request, res: Response) => {
  const isLogined = auth.isLogined(req);
  const dbProducts = await ProductModel.find();
  const products = getTimeFormatProducts(dbProducts);
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

const get_products_update = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);

  if (auth.isLogined(req)) {
    res.render("products/write.html", { product });
  } else {
    res.redirect("/admin/signin");
  }
};

const post_proudcts_update = async (req: Request, res: Response) => {
  let filenames: string[] = [];
  if (req.files.constructor === Array) {
    filenames = req.files.map((file) => file.filename);
  }
  const product: ProductWriteForm = { ...req.body, images: filenames };

  const productImages = await ProductModel.findById(req.params.id);
  deleteFiles(productImages.images);

  if (validatePostProduct(res, product)) {
    const data = {
      ...product,
      ownerId: auth.getUserId(req),
      ownerNickname: auth.getNickname(req),
    };
    await ProductModel.findByIdAndUpdate(req.params.id, data);
    res.redirect("/mypage");
  }
};

export = {
  get_products,
  get_products_write,
  post_products_write,
  get_products_detail,
  get_products_update,
  post_proudcts_update,
};
