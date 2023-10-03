import {
  FormRow,
  FormRowFile,
  FormRowSelect,
  SubmitBtn,
  Modal,
  DynamicField,
  FormBtn,
} from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { PLACE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "./DashboardLayout";
import { useState } from "react";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/products/${params.id}`);
    const response = await customFetch.get("/users/users-list");
    return { productData: data, usersData: response.data };
  } catch (error) {
    toast.error(error?.response?.data?.msg || error.message);
    return redirect("/dashboard");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  try {
    await customFetch.patch(`/products/${params.id}`, formData);
    toast.success("Product updated successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg || error.message);
    return error;
  }
};

const EditProduct = () => {
  const { productData, usersData } = useLoaderData();
  const product = productData.product;
  const users = usersData.users;
  const usersList = users.map((user) => {
    return user.name;
  });

  const { open, onOpenModal, onCloseModal } = useDashboardContext();
  const [checkedList, setCheckedList] = useState([]);
  const addFieldsHandler = () => {
    onOpenModal();
  };
  return (
    <Wrapper>
      {open && (
        <Modal open={open} onClose={onCloseModal} center>
          <DynamicField onClose={onCloseModal} addFields={setCheckedList} />
        </Modal>
      )}
      <Form className="form" method="POST" encType="multipart/form-data">
        <h4 className="form-title">Edit Product</h4>
        <div className="form-center">
          <FormRowFile name="productImg" label="Product Image" />
          <FormRow type="text" name="name" defaultValue={product.name} />
          <FormRow type="text" name="company" defaultValue={product.company} />
          <FormRow type="Date" labelText="Purchase Date" name="purchaseDate" />
          <FormRowSelect
            labelText="Assigned To"
            name="assignedTo"
            list={usersList}
          />

          <FormRowSelect
            labelText="Status"
            name="status"
            list={Object.values(PLACE)}
            defaultValue={product.status ? PLACE.AVD : PLACE.OUTPLACE}
          />
          {checkedList &&
            checkedList.map((field, index) => {
              switch (field.type) {
                case "date":
                  return <FormRow type="date" name={field.name} key={index} />;
                case "file":
                  return (
                    <FormRowFile type="file" name={field.name} key={index} />
                  );
                default:
                  return <FormRow type="text" name={field.name} key={index} />;
              }
            })}
          <FormBtn formBtn text="Add Fields" handler={addFieldsHandler} />
          <SubmitBtn
            formBtn
            text="Update Product"
            waitingLabel="Updating Product"
          />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditProduct;
