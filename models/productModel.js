import mongoose from "mongoose";
import qrcode from "qrcode";
import { WARRANTY_STATUS, PRODUCT_STATUS } from "../utils/constants.js";

const ProductSchema = new mongoose.Schema(
  {
    productImg: String,
    productImgId: String,
    name: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: Date,
    },
    warranty: {
      type: String,
      default: WARRANTY_STATUS.EXPIRED,
    },
    qr: String,
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User", // This tells Mongoose that the 'owner' field references the 'User' model
    },
    createdBy: String,
    assignedTo: String,
    status: {
      type: String,
      default: PRODUCT_STATUS.IN_DEPT,
    },
    department: String,
  },
  { timestamps: true, strict: false, versionKey: false }
);

ProductSchema.methods.generateQrCode = async function () {
  const opts = {
    errorCorrectionLevel: "H",
    type: "image/png",
    quality: 0.3,
    margin: 1,
    width: 300,
  };
  this.qr = await qrcode.toDataURL(this.id.toString(), opts);
  await this.save();
};

export default mongoose.model("Product", ProductSchema);
