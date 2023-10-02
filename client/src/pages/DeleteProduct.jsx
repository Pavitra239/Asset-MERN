import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete the product?"
  );
  if (confirmDelete) {
    try {
      await customFetch.delete(`/products/${params.id}`);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    }
  }

  return redirect("/dashboard");
};
