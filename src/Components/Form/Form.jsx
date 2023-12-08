import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import contactContext from "../../store/contact-context";
import { Form, Button, Card } from "react-bootstrap";
import loader from "../../assets/Images/loader.svg";
import ReCAPTCHA from "react-google-recaptcha";
import CloseSvg from "../../assets/Images/Icons/close.svg";
import axios from "axios";
import { toast } from "react-toastify";


const ContactForm = () => {
  // eslint-disable-next-line no-unused-vars
  const ctx = useContext(contactContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    recaptchaValue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRecaptchaChange = (value) => {
    setFormData({
      ...formData,
      recaptchaValue: value, // Set the reCAPTCHA value in the state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.email === "") {
      return toast.error("Please fill madatory fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "toaster--class", // Apply your custom class here
      });
    }
    if (formData.recaptchaValue === "") {
      return toast.error("Please fill Captcha", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "toaster--class", // Apply your custom class here
      });
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://node-services.vercel.app/api/v1/send-mail",
        formData
      );
      console.log("Email sent!", res);
      toast.success("Message sent.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "toaster--class",
      });
      if (res.data.status === "success") {
        localStorage.setItem("emailsent", true);
        ctx.setContactVisible(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Oops Somthing went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "toaster--class", // Apply your custom class here
      });
      setLoading(false);
    }
  };

  return (
    <>
        {ctx.contacted ? (
          <Card className="contacted--message d-flex justify-content-center align-item-center">
            <Button
              className="close-form ms-2"
              onClick={() => {
                ctx.setContactVisible(false);
                setFormData(false);
              }}
            >
              <img src={CloseSvg} alt="close" />
            </Button>
            <h1 className="primary-text-color">
              You will be contacted shortly !<br />
              Sit back and relax 😎.
            </h1>
          </Card>
        ) : (
          <Form
            className={`contact--form`}
            onSubmit={handleSubmit}
            style={{ color: "#222831" }}
          >
            <Button
              className="close-form ms-2"
              onClick={() => {
                ctx.setContactVisible(false);
                setFormData(false);
              }}
            >
              <img src={CloseSvg} alt="close" />
            </Button>
            <h1 className="white-text-color">Contact Form</h1>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label style={{ color: "#222831" }}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FC7114",
                  color: "#222831",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label style={{ color: "#222831" }}>
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FC7114",
                  color: "#222831",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label style={{ color: "#222831" }}>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your contact number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FC7114",
                  color: "#222831",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-2">
              <Form.Label style={{ color: "#222831" }}>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FC7114",
                  color: "#222831",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-2">
              <ReCAPTCHA
                sitekey="6LdQZCopAAAAALAHhiieLq62K0NDoNNcg8OBm52l" 
                onChange={handleRecaptchaChange}
              />
            </Form.Group>

            <div className="d-flex">
              <Button
                className="w-25 submit--form--btn"
                variant="primary"
                type="submit"
              >
                Submit
                {loading ? (
                  <img
                    src={loader}
                    alt="loadin.."
                    className="loader-circle ms-2"
                  />
                ) : (
                  ""
                )}
              </Button>
            </div>
          </Form>
        )}
    </>
  );
};

const PortalForm = () => {
  return ReactDOM.createPortal(
    <ContactForm />,
    document.getElementById("contact-form")
  );
};

export default PortalForm;
