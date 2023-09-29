import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase.js";
import { promises as fs } from "fs";
import { resolve } from "path";

export const uploadFile = async (file, folder, type) => {
  file.filename = Date.now();
  return new Promise(async (resolve, reject) => {
    const storage = getStorage(app);
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: file.mimetype,
    };
    const data = await fs.readFile(file.path);
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${folder}/${type}/` + file.filename);
    const uploadTask = uploadBytesResumable(storageRef, data, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        try {
          const dowloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(dowloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
