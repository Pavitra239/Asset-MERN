import { FormRow, FormRowFile, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { PLACE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/products/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg || error.message);
    return redirect("/dashboard");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.patch(`/products/${params.id}`, data);
    toast.success("Product updated successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg || error.message);
    return error;
  }
};

const EditProduct = () => {
  const { product } = useLoaderData();
  return (
    <Wrapper>
      <Form className="form" method="POST">
        <h4 className="form-title">Edit Product</h4>
        <div className="form-center">
          <FormRowFile name="productImg" label="Product Image" />
          <FormRow type="text" name="name" defaultValue={product.position} />
          <FormRow type="text" name="company" defaultValue={product.company} />
          <FormRow type="Date" labelText="Purchase Date" name="purchaseDate" />
          <FormRowSelect
            labelText="Assigned To"
            name="assignedTo"
            list={["pavitra", "kevi"]}
          />
          <FormRowSelect
            name="productStatus"
            labelText="product status"
            defaultValue={product.status ? PLACE.AVD : PLACE.OUTPLACE}
            list={Object.values(PLACE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditProduct;
