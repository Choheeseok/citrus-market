import UserWriteForm from "../../models/user/user.signup";
import UserModel from "../../models/user/user";

const checkOmission = (data: UserWriteForm): string => {
  let str: string = ``;

  if (!data.email) str += `'이메일'`;
  if (!data.password) str += `'비밀번호'`;
  if (!data.confirmPassword) str += `'비밀번호 확인'`;
  if (!data.nickname) str += `'닉네임'`;
  return str;
};

const checkSameData = async (data: UserWriteForm): Promise<string> => {
  let str: string = ``;
  const sameEmailData = await UserModel.findOne({ email: data.email });
  if (sameEmailData) str += `'${data.email}'`;

  const sameNicknameData = await UserModel.findOne({ email: data.email });
  if (sameNicknameData) str += `'${data.nickname}'`;

  return str;
};

const checkConfirmPassword = (data: UserWriteForm): string => {
  let str: string = ``;
  if (data.password !== data.confirmPassword) str += `'비밀번호'`;
  return str;
};

export = { checkOmission, checkSameData, checkConfirmPassword };
