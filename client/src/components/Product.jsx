import { useState } from "react";
import { FaUserAlt, FaCertificate } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Product";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import ProductInfo from "./ProductInfo";
import IconBtn from "./IconBtn";
import { saveAs } from "file-saver";
import Modal from "./Modal";
import { useAllProductsContext } from "../pages/AllProducts";
import ProductDetails from "./ProductDetails";
day.extend(advancedFormat);

const Product = ({ product }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  //   const date = day(createdAt).format("MMM Do, YYYY");
  const downloadQrHandler = () => {
    const downloadImage = window.confirm("Want to download image?");
    if (downloadImage) {
      saveAs(product.qr, `${product._id}.png`);
    }
  };

  const viewDetailsHandler = () => {
    onOpenModal();
  };

  const imgURL =
    product.productImg || "https://fakeimg.pl/600x400?text=No+Image";
  return (
    <>
      {open && (
        <Modal open={open} onClose={onCloseModal} center>
          <ProductDetails product={product} />
        </Modal>
      )}
      <Wrapper>
        <img className="product-img" src={imgURL} alt={product.name} />
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-content">
            <div className="product-content-center">
              <ProductInfo icon={<FaCertificate />} text={product.company} />
              <ProductInfo icon={<FaUserAlt />} text={product.assignedTo} />
              <ProductInfo icon={<FaUserAlt />} text={product.department} />
              <div
                className={`status ${
                  product.status ? "interview" : "declined"
                }`}
              >
                {product.status ? "avd" : "out of avd"}
              </div>
            </div>
          </div>

          <div className="product-btns">
            <IconBtn
              type="button"
              iconType="view"
              handler={viewDetailsHandler}
            />
            <IconBtn type="button" iconType="qr" handler={downloadQrHandler} />
            <Link to={`./edit-product/${product._id}`}>
              <IconBtn type="button" iconType="edit" />
            </Link>
            <Form method="post" action={`./delete-product/${product._id}`}>
              <IconBtn type="submit" iconType="trash" value={product._id} />
            </Form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default Product;
