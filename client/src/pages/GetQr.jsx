import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import { saveAs } from "file-saver";

export const action = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/products/${params.id}`);
    const downloadImage = window.confirm("Want to download image?");
    if (downloadImage) {
      saveAs(data.product.qr, "qr.png");
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg || error.message);
  }
  return redirect("/dashboard/all-");
};
