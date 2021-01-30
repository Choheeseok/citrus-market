import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, "이메일을 입력해주세요"],
    },
    password: {
      type: Number,
      require: [true, "비밀번호를 입력해주세요"],
    },
    nickname: {
      type: String,
      require: [true, "닉네임을 입력해주세요"],
    },
    products: {
      type: [String],
      default: [],
    },
  },
  { collection: "User" }
);

const UserModel = model("User", UserSchema);

export { UserModel };
