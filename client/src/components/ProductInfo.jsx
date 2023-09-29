import Wrapper from "../assets/wrappers/ProductInfo";
const ProductInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="product-icon">{icon}</span>
      <span className="product-text">{text}</span>
    </Wrapper>
  );
};
export default ProductInfo;
