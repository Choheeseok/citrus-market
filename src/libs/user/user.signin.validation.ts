import { Request, Response } from "express";
import UserSigninForm from "../../models/user/user.signin";
import userSignin from "./user.signin.check";

const validateSignin = async (req: Request, res: Response): Promise<any> => {
  const data: UserSigninForm = req.body;
  const omission = userSignin.checkOmission(data);

  if (omission) {
    res.render("admin/signin.html", {
      warningMessage: `${omission}을(를) 입력해주세요`,
      user: data,
    });
    return;
  }

  const user = await userSignin.checkPassword(data);
  if (!user) {
    res.render("admin/signin.html", {
      warningMessage: `아이디, 비밀번호를 확인해주세요`,
      user: data,
    });
    return;
  }

  return user;
};

export default validateSignin;
