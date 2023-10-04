import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn, text, waitingLabel }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? `${waitingLabel}...` || "submitting" : text || "Submit"}
    </button>
  );
};
export default SubmitBtn;
