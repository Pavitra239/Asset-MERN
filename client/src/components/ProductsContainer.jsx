import Product from "./Product";
import Wrapper from "../assets/wrappers/ProductsContainer";
import { useAllProductsContext } from "../pages/AllProducts";
import PageBtnContainer from "./PageBtnContainer";

const ProductsContainer = () => {
  const { data } = useAllProductsContext();
  const { products, totalProducts, numOfPages } = data;
  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No Products to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalProducts} Product{products.length > 1 && "s"} found
      </h5>
      <div className="products">
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default ProductsContainer;
