import { Request, Response } from "express";
import auth from "../../libs/auth";

const get_mypage = async (req: Request, res: Response) => {
  const nickname: string | undefined = auth.isLogined(req)
    ? auth.getNickname(req)
    : undefined;
  res.render("mypage/index.html", { nickname });
};

export = {
  get_mypage,
};
