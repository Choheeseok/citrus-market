import { Request, Response } from "express";

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

const get_signin = async (_: Request, res: Response) => {
  res.render("admin/signin.html");
};

const post_signin = async (req: Request, res: Response) => {
  const auth = req.body;
  // get user
  if (auth.email === "joys1234@gmail.com" && auth.pwd === "1234") {
    req!.session!.isLogined = true;
    req!.session!.nickname = "Joys";
    req!.session!.userId = "dummy id";
    res.redirect("/");
  } else {
    res.send("login failed");
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
  get_signin,
  post_signin,
  get_signout,
};
