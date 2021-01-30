import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    ownerId: {
      type: String,
      require: [true, "작성자ID"],
    },
    ownerNickname: {
      type: String,
      require: [true, "작성자 닉네임"],
    },
    productId: {
      type: String,
      require: [true, "제품ID"],
    },
    content: {
      type: String,
      require: [true, "댓글 내용"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "Comment" }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
