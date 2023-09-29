import Product from "../models/productModel.js";
import { StatusCodes } from "http-status-codes";
import { uploadFile } from "../utils/firebase/uploadFile.js";

export const getAllProducts = async (req, res) => {
  let products;
  if (req.user.role === "admin") {
    products = await Product.find({});
  } else {
    products = await Product.find({ department: req.user.department });
  }
  res.status(StatusCodes.OK).json({
    products: products,
  });
};

export const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.department = req.user.department;
  if (req.files.productImg) {
    req.body.productImg = await uploadFile(
      req.files.productImg[0],
      req.body.department,
      "images"
    );
  }
  if (req.files.invoice) {
    req.body.invoice = await uploadFile(
      req.files.invoice[0],
      req.body.department,
      "invoices"
    );
  }

  const product = await Product.create(req.body);
  await product.generateQrCode();
  res.status(StatusCodes.CREATED).json({
    product,
  });
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(StatusCodes.OK).json({
    product,
  });
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({
    message: "Product Updated",
    updatedProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const removedProduct = await Product.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({
    message: "Product deleted",
    removedProduct,
  });
};
