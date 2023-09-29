import { FormRow, FormRowFile, SubmitBtn } from "../components";
import { FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { saveAs } from "file-saver";
import { PLACE } from "../../../utils/constants";
import FormBtn from "../components/FormBtn";
import Modal from "../components/Modal";
import { useDashboardContext } from "./DashboardLayout";
import DynamicField from "../components/DynamicField";
import { useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    const { data } = await customFetch.post("/products", formData);
    toast.success("Product added successfully", { autoClose: 1000 });
    const downloadImage = window.confirm("Want to download image?");
    if (downloadImage) {
      saveAs(data.product.qr, "qr.png");
    }
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg || error.message, {
      autoClose: 1000,
    });
  }
  return null;
};

const AddProduct = () => {
  const { user } = useOutletContext();
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
      <Form method="POST" className="form" encType="multipart/form-data">
        <h4 className="form-title">Add Product</h4>
        <div className="form-center">
          <FormRowFile name="productImg" label="Product Image" />
          <FormRow type="text" name="name" />
          <FormRow type="text" name="company" />
          <FormRow
            type="Date"
            labelText="Purchase Date"
            name="purchaseDate"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="Assigned To"
            name="assignedTo"
            list={["pavitra", "kevi"]}
          />
          <FormRowSelect labelText="Status" name="Status" list={PLACE} />
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
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProduct;
