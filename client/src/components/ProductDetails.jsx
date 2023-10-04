import Wrapper from "../assets/wrappers/ProductDetails";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/en";
import { PLACE, WARRANTY_STATUS } from "../../../utils/constants";

dayjs.extend(advancedFormat);

const ProductDetails = ({ product }) => {
  const imgURL =
    product.productImg || "https://fakeimg.pl/600x400?text=No+Image";
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
          if (key === "status") {
            product[key] = product[key] ? PLACE.AVD : PLACE.OUTPLACE;
          }
          if (key === "warranty") {
            product[key] =
              product[key] === true
                ? WARRANTY_STATUS.ACTIVE
                : WARRANTY_STATUS.EXPIRED;
          }

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
      </div>
    </Wrapper>
  );
};
export default ProductDetails;
