import { Router } from "express";
const router = Router();

import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";
import { validateProductIdParam } from "../middlewares/validationMiddleware.js";
import { USER_ROLES } from "../utils/constants.js";
import upload from "../middlewares/multerMiddleware.js";

router
  .route("/")
  .get(getAllProducts)
  .post(
    authorizePermissions(USER_ROLES.ADMIN, USER_ROLES.HEAD),
    upload.fields([
      { name: "productImg", maxCount: 1 },
      { name: "invoice", maxCount: 1 },
    ]),
    createProduct
  );

router
  .route("/:id")
  .get(validateProductIdParam, getProduct)
  .patch(
    authorizePermissions(USER_ROLES.ADMIN, USER_ROLES.HEAD),
    validateProductIdParam,
    upload.fields([
      { name: "productImg", maxCount: 1 },
      { name: "invoice", maxCount: 1 },
    ]),
    updateProduct
  )
  .delete(
    authorizePermissions(USER_ROLES.ADMIN, USER_ROLES.HEAD),
    validateProductIdParam,
    deleteProduct
  );

export default router;
