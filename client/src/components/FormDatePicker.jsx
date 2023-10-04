import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState } from "react";

dayjs.extend(advancedFormat);

const today = dayjs().format("YYYY-MM-DD");

const FormDatePicker = ({ name, labelText, defaultValue, max, min }) => {
  const [date, setDate] = useState(defaultValue || today);
  defaultValue = dayjs(defaultValue).format("YYYY-MM-DD");
  const dateChangeHandler = (date) => {
    setDate(date);
  };

  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        defaultValue={defaultValue || today}
        className="form-input"
        onChange={dateChangeHandler}
        max={max && today}
        min={min && today}
      />
    </div>
  );
};
export default FormDatePicker;
