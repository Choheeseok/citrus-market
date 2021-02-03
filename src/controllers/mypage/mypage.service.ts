import { Request, Response } from "express";
import auth from "../../libs/auth";
import ProductModel from "../../models/product/product";
import getTimeFormatProducts from "../../libs/product/dateFormat";

const get_mypage = async (req: Request, res: Response) => {
  const nickname: string | undefined = auth.isLogined(req)
    ? auth.getNickname(req)
    : undefined;

  const dbProducts = await ProductModel.find({ ownerId: auth.getUserId(req) });
  const products = getTimeFormatProducts(dbProducts);
  res.render("mypage/index.html", { nickname, products });
};

export = {
  get_mypage,
};
