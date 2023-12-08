import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import contactContext from "../../store/contact-context";

const FormOverlay = () => {
  const [isActive, setIsActive] = useState(false);
  const ctx = useContext(contactContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [ctx]);
  return (
    <div
      className={`contact-overlay ${isActive ? "active" : ""}`}
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
