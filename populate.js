import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Product from "./models/productModel.js";
import User from "./models/UserModel.js";
try {
  await mongoose.connect(process.env.MONGO_URI);
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await User.findOne({ email: "head@head.com" });

  const jsonProducts = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const products = jsonProducts.map((product) => {
    return { ...product, createdBy: user._id };
  });
  await Product.deleteMany({ createdBy: user._id });
  await Product.create(products);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
