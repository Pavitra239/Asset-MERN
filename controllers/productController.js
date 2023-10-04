import Product from "../models/productModel.js";
import { StatusCodes } from "http-status-codes";
import { uploadFile } from "../utils/firebase/uploadFile.js";
import { PLACE, PRODUCT_SORT_BY, WARRANTY_STATUS } from "../utils/constants.js";
import { promises as fs } from "fs";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { saveFile } from "../utils/saveFile.js";
dayjs.extend(advancedFormat);

export const getAllProducts = async (req, res) => {
  const { search, productStatus, productWarranty, sort } = req.query;

  // searching logic
  const queryObject = {};
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  if (productStatus && productStatus !== "all") {
    queryObject.status = productStatus === PLACE.AVD ? true : false;
  }

  if (productWarranty && productWarranty !== "all") {
    queryObject.warranty =
      productWarranty === WARRANTY_STATUS.ACTIVE ? true : false;
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
    req.body.warranty = dayjs(req.body.warrantyDate).isAfter(dayjs());
  }
  if (req.user.role !== "admin") {
    req.body.department = req.user.department;
  }
  req.body.status = req.body.status === PLACE.AVD ? true : false;
  if (req.files) {
    if (req.files.productImg) {
      req.body.productImg = await saveFile(
        req.files.productImg[0],
        req.body.department,
        "images"
      );
    }
    if (req.files.invoice) {
      req.body.invoice = await saveFile(
        req.files.invoice[0],
        req.body.department,
        "invoices"
      );
    }
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
  req.body.status = req.body.status === PLACE.AVD ? true : false;
  if (req.body.warrantyDate) {
    req.body.warranty = dayjs(req.body.warrantyDate).isAfter(dayjs());
  }
  if (req.files) {
    if (req.files.productImg) {
      req.body.productImg = await saveFile(
        req.files.productImg[0],
        req.body.department,
        "images"
      );
    }
    if (req.files.invoice) {
      req.body.invoice = await saveFile(
        req.files.invoice[0],
        req.body.department,
        "invoices"
      );
    }
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
