import { Request, Response } from "express";
import multer from "multer";
import { type } from "os";
import auth from "../../libs/auth";
import { checkOmission } from "../../libs/product/product.check";
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

interface multerFile {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

const post_products_write = async (req: Request, res: Response) => {
  let filenames: string[] = [];
  if (req.files.constructor == Array) {
    filenames = req.files.map((file) => file.filename);
  }
  const product: ProductWriteForm = { ...req.body, images: filenames };
  console.log(product);
  const omission: string = checkOmission(req.body);
  if (omission) {
    res.render("products/write.html", {
      warningMessage: `${omission}은 필수입니다`,
      product,
    });
  } else {
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
  res.render("products/detail.html", { product });
};

export = {
  get_products,
  get_products_write,
  post_products_write,
  get_products_detail,
};
