import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "제품명을 입력해주세요"],
    },
    price: {
      type: Number,
      require: [true, "가격을 입력해주세요"],
    },
    description: String,
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    views: {
      type: Number,
      default: 0,
    },
    ownerId: {
      type: String,
      require: [true, "작성자ID"],
    },
  },
  { collection: "Product" }
);

const ProductModel = model("Product", ProductSchema);

export { ProductModel };
