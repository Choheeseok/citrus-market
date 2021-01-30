import { Request, Response } from "express";

const get_products = async (_: Request, res: Response) => {
  res.render("products/index.html");
};

export = {
  get_products,
};
