import { Request, Response } from "express";
import UserLoggedInForm from "../../models/user/user.loggedIn";
import UserModel from "../../models/user/user";
import validateSignup from "../../libs/user/user.signup.validation";
import validateSignin from "../../libs/user/user.signin.validation";

declare module "express-session" {
  interface SessionData {
    isLogined: boolean;
    nickname: string;
    userId: string;
  }
}

const get_signup = async (_: Request, res: Response) => {
  res.render("admin/signup.html");
};

const post_signup = async (req: Request, res: Response) => {
  await validateSignup(req, res);

  const data = { ...req.body };
  await UserModel.create(data);
  res.redirect("/");
};

const get_signin = async (_: Request, res: Response) => {
  res.render("admin/signin.html");
};

const post_signin = async (req: Request, res: Response) => {
  const user = await validateSignin(req, res);

  if (user) {
    const userData: UserLoggedInForm = user;
    req!.session!.isLogined = true;
    req!.session!.nickname = userData.nickname;
    req!.session!.userId = userData._id;
    res.redirect("/");
  }
};

const get_signout = async (req: Request, res: Response) => {
  req!.session!.destroy((err) => {
    console.error(err);
    res.redirect("/");
  });
};

export = {
  get_signup,
  post_signup,
  get_signin,
  post_signin,
  get_signout,
};
