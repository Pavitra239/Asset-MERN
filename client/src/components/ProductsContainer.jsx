import Product from "./Product";
import Wrapper from "../assets/wrappers/ProductsContainer";
import { useAllProductsContext } from "../pages/AllProducts";

const ProductsContainer = () => {
  const { data } = useAllProductsContext();
  const { products } = data;
  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No Products to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="products">
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </Wrapper>
  );
};
export default ProductsContainer;
