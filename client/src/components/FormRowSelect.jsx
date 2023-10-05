import { USER_DEPARTMENTS } from "../../../utils/constants";
const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}) => {
  let SelectOptions;

  if (name === "assignedTo") {
    const deptWiseUsersList = [];
    for (const value of Object.values(USER_DEPARTMENTS)) {
      const users =
        Array.isArray(list) &&
        list
          .filter((item) => item.department === value)
          .map((user) => user.name);
      deptWiseUsersList.push({
        dept: value,
        users: users,
      });
    }

    SelectOptions = deptWiseUsersList.map((item) => {
      return (
        <optgroup key={item.dept} label={item.dept}>
          {item.users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </optgroup>
      );
    });
  } else {
    SelectOptions = Object.values(list).map((status) => {
      return (
        <option key={status} value={status}>
          {status}
        </option>
      );
    });
  }
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {SelectOptions}
      </select>
    </div>
  );
};
export default FormRowSelect;
