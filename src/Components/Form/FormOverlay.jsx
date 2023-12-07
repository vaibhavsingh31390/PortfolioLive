import { useContext } from "react";
import ReactDOM from "react-dom";
import contactContext from "../../store/contact-context";

const FormOverlay = () => {
  const ctx = useContext(contactContext);
  return (
    <div
      className="contact-overlay"
      onClick={() => {
        ctx.setContactVisible(false);
      }}
    ></div>
  );
};

const PortalForm = () => {
  return ReactDOM.createPortal(
    <FormOverlay />,
    document.getElementById("contact-overlay")
  );
};

export default PortalForm;
