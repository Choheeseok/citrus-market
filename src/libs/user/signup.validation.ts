import { Request, Response } from "express";
import UserSignupForm from "../../models/user/user.signup";
import userSignup from "./signup.check";

const validateSignup = async (req: Request, res: Response) => {
  const user: UserSignupForm = req.body;
  const omission: string = userSignup.checkOmission(user);
  const sameUser: string = await userSignup.checkSameData(user);
  const confirmPassword: string = userSignup.checkConfirmPassword(user);

  if (omission) {
    res.render("admin/signup.html", {
      warningMessage: `${omission}은 필수입니다`,
      user,
    });
    return;
  }
  if (sameUser) {
    res.render("admin/signup.html", {
      warningMessage: `${sameUser}는 이미 있습니다`,
      user,
    });
    return;
  }
  if (confirmPassword) {
    res.render("admin/signup.html", {
      warningMessage: `${confirmPassword}를 확인해주세요`,
      user,
    });
    return;
  }
};

export default validateSignup;
