import Product from "../models/productModel.js";
import { StatusCodes } from "http-status-codes";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { deleteFile, saveFile } from "../utils/fileOps.js";
dayjs.extend(advancedFormat);

export const getAllProducts = async (req, res) => {
  const { search, productStatus, productWarranty, sort } = req.query;

  // searching logic
  const queryObject = {};
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  if (productStatus && productStatus !== "all") {
    queryObject.status = productStatus;
  }

  if (productWarranty && productWarranty !== "all") {
    queryObject.warranty = productWarranty;
  }

  let products;
  if (req.user.role !== "admin") {
    queryObject.department = req.user.department;
  }

  // sorting logic
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "name",
    "z-a": "-name",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // Pagination logic

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  products = await Product.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProducts / limit);

  res.status(StatusCodes.OK).json({
    totalProducts,
    numOfPages,
    currentPage: page,
    products,
  });
};

export const createProduct = async (req, res) => {
  req.body.creator = req.user.userId;
  req.body.createdBy = req.user.name;
  if (req.body.warrantyDate) {
    req.body.warranty = WARRANTY_STATUS.ACTIVE;
  }
  if (req.user.role !== "admin") {
    req.body.department = req.user.department;
  }
  const product = await Product.create(req.body);
  await product.generateQrCode();
  if (req.files) {
    await product.upload(req.files);
  }
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
  req.body.status = req.body.status;
  if (req.body.warrantyDate) {
    req.body.warranty = dayjs(req.body.warrantyDate).isAfter(dayjs());
  }

  for (const key in Object.keys(req.body)) {
    if (req.body[key] === "") {
      delete req.body[key];
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (req.files) {
    await updatedProduct.upload(req.files);
  }

  res.status(StatusCodes.OK).json({
    message: "Product Updated",
    updatedProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product.productImg) {
    await deleteFile(product.department, "images", product._id);
  }
  if (product.invoice) {
    await deleteFile(product.department, "invoices", product._id);
  }
  const removedProduct = await Product.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({
    message: "Product deleted",
    removedProduct,
  });
};
