import UserSigninForm from "../../models/user/user.signin";
import UserModel from "../../models/user/user";

const checkOmission = (data: UserSigninForm): string => {
  let str: string = ``;

  if (!data.email) str += `'이메일'`;
  if (!data.password) str += `'비밀번호'`;
  return str;
};

const checkPasswordFindOne = async (data: UserSigninForm): Promise<any> => {
  const user = await UserModel.findOne({
    email: data.email,
    password: data.password,
  });

  return user;
};

export = { checkOmission, checkPasswordFindOne };
