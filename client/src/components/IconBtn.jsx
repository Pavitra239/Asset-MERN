import { FaEdit, FaEye, FaQrcode, FaTrash } from "react-icons/fa";

const IconBtn = ({ type, iconType, id, handler }) => {
  let icon;
  switch (iconType) {
    case "edit":
      icon = <FaEdit className="edit-icon" />;
      break;
    case "qr":
      icon = <FaQrcode className="qr-icon" />;
      break;
    case "trash":
      icon = <FaTrash className="trash-icon" />;
      break;
    case "view":
      icon = <FaEye className="view-icon" />;
      break;
    default:
      icon = <FaEdit />;
  }
  return (
    <button type={type} className="icon-btn" value={id} onClick={handler}>
      {icon}
    </button>
  );
};
export default IconBtn;
