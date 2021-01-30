import { Request } from "express";

const isLogined = (req: Request): boolean | undefined => {
  return req.session.isLogined;
};

const getNickname = (req: Request): string | undefined => {
  return req.session.nickname;
};

export = {
  isLogined,
  getNickname,
};
