import { Request, Response } from "express";
import UserSignupForm from "../../models/user/user.signup";
import UserSigninForm from "../../models/user/user.signin";
import UserLoggedIn from "../../models/user/user.loggedIn";
import userSignUp from "../../libs/user/user.signup";
import userSignIn from "../../libs/user/user.signin";
import UserModel from "../../models/user/user";

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
  const user: UserSignupForm = req.body;
  const omission: string = userSignUp.checkOmission(user);
  const sameUser: string = await userSignUp.checkSameData(user);
  const confirmPassword: string = userSignUp.checkConfirmPassword(user);

  if (omission) {
    res.render("admin/signup.html", {
      warningMessage: `${omission}은 필수입니다`,
      user,
    });
  } else if (sameUser) {
    res.render("admin/signup.html", {
      warningMessage: `${sameUser}는 이미 있습니다`,
      user,
    });
  } else if (confirmPassword) {
    res.render("admin/signup.html", {
      warningMessage: `${confirmPassword}를 확인해주세요`,
      user,
    });
  } else {
    const data = { ...req.body };
    await UserModel.create(data);
    res.redirect("/");
  }
};

const get_signin = async (_: Request, res: Response) => {
  res.render("admin/signin.html");
};

const post_signin = async (req: Request, res: Response) => {
  const data: UserSigninForm = req.body;
  const omission = userSignIn.checkOmission(data);

  if (omission) {
    res.render("admin/signin.html", {
      warningMessage: `${omission}을(를) 입력해주세요`,
      user: data,
    });
  } else {
    const user = await userSignIn.checkPasswordFindOne(data);
    if (!user) {
      res.render("admin/signin.html", {
        warningMessage: `아이디, 비밀번호를 확인해주세요`,
        user: data,
      });
    } else {
      const userData: UserLoggedIn = user;
      req!.session!.isLogined = true;
      req!.session!.nickname = userData.nickname;
      req!.session!.userId = userData._id;
      res.redirect("/");
    }
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
