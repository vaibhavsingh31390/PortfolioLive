import { Navbar, Container, Button } from "react-bootstrap";
import logo from "./../../assets/Images/logo.png";
import resume from "./../../assets/Vaibhav_Singh_Resume.pdf";
import { useContext } from "react";
import contactContext from "../../store/contact-context";

const Header = () => {
  const ctx = useContext(contactContext);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resume;
    link.setAttribute("download", "Vaibhav_Singh_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <Navbar expand="lg" className="navbar_Main py-3">
      <Container>
        <Navbar.Brand
          href="/"
          className="header_Logo_Container d-flex align-items-center"
        >
          <img
            src={logo}
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <p className="ms-2 mb-0 secondary-text-color fw-bold">
            Vaibhav Singh
          </p>
        </Navbar.Brand>

        <div className="d-flex align-items-center button--wrapper">
          <Button
            variant="primary"
            className="header_Btn_Contact"
            onClick={() => {
              ctx.setContactVisible(true);
            }}
          >
            Contact
          </Button>
          <Button
            variant="secondary"
            className="header_Btn_Message ms-3"
            onClick={handleDownload}
          >
            Download CV
          </Button>
          {/* <Button variant="secondary" className="header_Btn_Message">
            Quick Message
          </Button> */}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
