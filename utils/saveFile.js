import { promises as fs } from "fs";
import { uploadFile } from "./firebase/uploadFile.js";
import sharp from "sharp";
export const saveFile = async (file, department, type) => {
  const compressedBuffer = await sharp(file.path)
    .resize(300)
    .jpeg({ quality: 30 })
    .toBuffer();
  await fs.writeFile(file.path, compressedBuffer);
  const fileUrl = await uploadFile(file, department, type);
  await fs.unlink(file.path);
  return fileUrl;
};
