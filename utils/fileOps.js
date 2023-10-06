import { promises as fs } from "fs";
import { removeFile, uploadFile } from "./firebase/firebaseFileOps.js";
import sharp from "sharp";
export const saveFile = async (file, department, type, name) => {
  if (type === "images") {
    const compressedBuffer = await sharp(file.path)
      .resize(300)
      .jpeg({ quality: 30 })
      .toBuffer();
    await fs.writeFile(file.path, compressedBuffer);
  }
  const fileUrl = await uploadFile(file, department, type, name);
  await fs.unlink(file.path);
  return fileUrl;
};

export const deleteFile = async (department, type, name) => {
  await removeFile(department, type, name);
};
