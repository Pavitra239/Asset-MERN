const FormSelectGroup = ({
  name,
  labelText,
  list,
  categories,
  defaultValue = "",
  onChange,
}) => {
  const categoricalList = [];
  for (const value of Object.values(categories)) {
    const items =
      Array.isArray(list) &&
      list.filter((item) => item.category === value).map((user) => user.name);
    categoricalList.push({
      category: value,
      items: items,
    });
  }

  const SelectOptions = categoricalList.map((item) => {
    return (
      <optgroup key={item.category} label={item.category}>
        {item.items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </optgroup>
    );
  });

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
export default FormSelectGroup;
