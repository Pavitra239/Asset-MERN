import mongoose from "mongoose";
import { USER_DEPARTMENTS, USER_ROLES } from "../utils/constants.js";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    lastName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "my city",
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    department: {
      type: String,
      enum: Object.values(USER_DEPARTMENTS),
      default: USER_DEPARTMENTS.DECORATION,
    },
    avatar: String,
    avatarPublicId: String,
  },
  {
    timestamps: true,
    strict: false,
  }
);

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
