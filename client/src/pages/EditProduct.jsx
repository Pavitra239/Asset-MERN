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
    const product = await customFetch.get(`/products/${params.id}`);
    const users = await customFetch.get("/users/users-list");
    const departments = await customFetch.get("users/departments");
    return {
      product: product.data.product,
      users: users.data.users,
      departments: departments.data.departments,
    };
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
  const { product, users, departments } = useLoaderData();

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
            labelText="Department"
            name="department"
            list={departments}
            defaultValue={product.department}
          />
          <FormRowSelect
            labelText="Assigned To"
            name="assignedTo"
            list={usersList}
            defaultValue={product.assignedTo}
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
