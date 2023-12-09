/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import contactContext from "../../store/contact-context";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import loader from "../../assets/Images/loader.svg";
import ReCAPTCHA from "react-google-recaptcha";
import CloseSvg from "../../assets/Images/Icons/close.svg";
import axios from "axios";
import { toast } from "react-toastify";
import ServiceButton from "../Layout/ServiceButton";

const services = [
  "Development Services",
  "Server Management",
  "Bug Fixing Service",
  "Design Services",
  "SEO Optimization",
  "Maintenance Solutions",
  "Content Generation",
  "Analytics Insights",
  "Consultancy Services",
];

const ContactForm = () => {
  // eslint-disable-next-line no-unused-vars

  const [isActive, setIsActive] = useState(false);
  const ctx = useContext(contactContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [ctx]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
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

  const handleTypeChange = (value) => {
    setFormData({
      ...formData,
      type: value,
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
    if (formData.name === "" || formData.email === "" || formData.type === "") {
      return toast.error("Please fill madatory fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "toaster--class", // Apply your custom class here
      });
    }
    // if (formData.recaptchaValue === "") {
    //   return toast.error("Please fill Captcha", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     toastId: "toaster--class", // Apply your custom class here
    //   });
    // }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/send-mail",
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
        <Card
          className={`contacted--message d-flex justify-content-center align-item-center ${
            isActive ? "active" : ""
          }`}
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
          <h1 className="primary-text-color">
            We'll be reaching out to you shortly.
            <br />
            Please take a moment to unwind 😎.
          </h1>
        </Card>
      ) : (
        <Form
          className={`contact--form ${isActive ? "active" : ""}`}
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
          <h1 className="secondary-text-color">
            Unleash your business potential now.
          </h1>

          <Row>
            <Col sm={12} md={8}>
              <Row>
                <Col md={12} sm={12}>
                  <p className="primary-text-color mb-2">
                    IT Solutions tailored for every business stage, from
                    startups to corporates.
                  </p>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label style={{ color: "#222831" }}>
                      What is your full name ?{" "}
                      <span className="mandatory"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label style={{ color: "#222831" }}>
                      Whats your email address ?
                      <span className="mandatory"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={12} sm={12}>
                  <p className="primary-text-color mb-2">
                    What sort of work you need help with ?
                    <span className="mandatory"> *</span>
                  </p>

                  <div className="grid-buttons mb-3">
                    {services.map((service) => (
                      <ServiceButton
                        key={service}
                        value={service}
                        name={service}
                        handleTypeChange={handleTypeChange}
                        activeButton={formData.type}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={4}>
              <Row>
                <Col md={12} sm={12}>
                  <p className="primary-text-color mb-2">
                    Tell us what you need help with, the purpose of this project
                    and problems we are solving.
                  </p>
                </Col>

                <Col md={12} sm={12}>
                  <Form.Group controlId="formMessage" className="mb-2">
                    <Form.Control
                      as="textarea"
                      rows={7}
                      placeholder="Tell us what's your project all about :)"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
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
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* <Form.Group controlId="formMessage" className="mb-2">
            <ReCAPTCHA
              sitekey="6LdQZCopAAAAALAHhiieLq62K0NDoNNcg8OBm52l"
              onChange={handleRecaptchaChange}
            />
          </Form.Group> */}

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
