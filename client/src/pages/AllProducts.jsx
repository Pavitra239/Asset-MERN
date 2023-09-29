import { useState } from "react";
import { toast } from "react-toastify";
import { ProductsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  return await customFetch
    .get("/products")
    .then(({ data }) => {
      return { data };
    })
    .catch((error) => {
      toast.error(error?.response?.data?.msg || error.message);
      return error;
    });
};

const AllProductsContext = createContext();

const AllProducts = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { data } = useLoaderData();
  return (
    <AllProductsContext.Provider
      value={{ data, open, onOpenModal, onCloseModal }}
    >
      <SearchContainer />
      <ProductsContainer />
    </AllProductsContext.Provider>
  );
};

export const useAllProductsContext = () => useContext(AllProductsContext);

export default AllProducts;
