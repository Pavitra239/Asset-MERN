import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  width: 100%;
  box-shadow: var(--shadow-2);
  .product-img {
    width: 100%;
    height: 200px;
  }
  .product-title {
    font-size: 18px;
    color: #333333;
    margin: 10px 0;
    font-weight: bolder;
    text-align: center;
  }
  .product-btns {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
    padding: 15px;
  }
  .product-content {
    padding: 1rem 1rem;
  }
  .product-content-center {
    display: grid;
    margin-top: 1rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .trash-icon {
    color: #d83f31;
    font-size: 20px;
  }

  .edit-icon {
    color: #3085c3;
    font-size: 20px;
  }

  .qr-icon {
    color: #219c90;
    font-size: 20px;
  }
  .icon-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }
  .view-icon {
    color: #0e21a0;
    font-size: 20px;
  }
`;

export default Wrapper;
