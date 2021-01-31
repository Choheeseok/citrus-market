import { Request } from "express";

const isLogined = (req: Request): boolean | undefined => {
  return req.session.isLogined;
};

const getNickname = (req: Request): string | undefined => {
  return req.session.nickname;
};

const getUserId = (req: Request): string | undefined => {
  return req.session.userId;
};

export = {
  isLogined,
  getNickname,
  getUserId,
};
