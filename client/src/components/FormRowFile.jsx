const FormRowFile = ({ name, label }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className="form-input"
        accept=".pdf, image/*"
      />
    </div>
  );
};
export default FormRowFile;
