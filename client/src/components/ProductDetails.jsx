import Wrapper from "../assets/wrappers/ProductDetails";

const ProductDetails = ({ product }) => {
  const imgURL =
    product.productImg || "https://fakeimg.pl/600x400?text=No+Image";
  console.log(imgURL);
  return (
    <Wrapper>
      <div className="img-container">
        <img src={imgURL} alt={product.name} />
      </div>
      <div className="info">
        {Object.keys(product).map((key) => {
          if (
            key === "productImg" ||
            key === "qr" ||
            key === "_id" ||
            key === "productImgId" ||
            key === "invoice"
          )
            return;
          return (
            <p key={key}>
              <span className="text">
                <strong>{key}: </strong>
              </span>
              {product[key]}
            </p>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default ProductDetails;
