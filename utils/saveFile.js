import { promises as fs } from "fs";
import { uploadFile } from "./firebase/uploadFile.js";

export const saveFile = async (file, department, type) => {
  const fileUrl = await uploadFile(file, department, type);
  await fs.unlink(file.path);
  return fileUrl;
};
