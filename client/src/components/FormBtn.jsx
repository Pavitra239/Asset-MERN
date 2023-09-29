const FormBtn = ({ formBtn, text, handler }) => {
  return (
    <button
      type="button"
      className={`btn btn-block ${formBtn && "form-btn"}`}
      onClick={handler}
    >
      {text}
    </button>
  );
};
export default FormBtn;
