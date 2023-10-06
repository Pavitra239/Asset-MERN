import Wrapper from "../assets/wrappers/ProductDetails";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/en";
import FormBtn from "./FormBtn";

dayjs.extend(advancedFormat);

const ProductDetails = ({ product }) => {
  const imgURL =
    product.productImg || "https://fakeimg.pl/600x400?text=No+Image";

  const downloadInvoice = () => {
    window.open(product.invoice);
  };
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
            key === "invoice" ||
            key === "creator" ||
            key === "createdAt" ||
            key === "updatedAt"
          )
            return;

          if (dayjs(product[key]).isValid()) {
            product[key] = dayjs(product[key]).format("DD-MMM-YYYY");
          }
          return (
            <p key={key}>
              <span className="text">
                <strong>{key} : </strong>
              </span>
              {product[key]}
            </p>
          );
        })}
        {product.invoice && (
          <FormBtn text="Invoice" handler={downloadInvoice} formBtn />
        )}
      </div>
    </Wrapper>
  );
};
export default ProductDetails;
