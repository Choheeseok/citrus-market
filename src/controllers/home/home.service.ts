import { Request, Response } from "express";
import auth from "../../libs/auth";

const get_home = async (req: Request, res: Response) => {
  const isLogined: boolean | undefined = auth.isLogined(req);
  const nickname: string | undefined = auth.getNickname(req);
  res.render("home/index.html", { isLogined, nickname });
};

export = {
  get_home,
};
