/* eslint-disable react/prop-types */
import { Button, Col, Row } from "react-bootstrap";
import Fiveer from "../assets/Images/Icons/Fiveer.svg";
import Email from "../assets/Images/Icons/Email.svg";
import WhatsApp from "../assets/Images/Icons/WhatsApp.svg";
import Telegram from "../assets/Images/Icons/Telegram.svg";

const ButtonLink = ({ icon, link, ntab = false }) => {
  const newTab = ntab;
  const handleLink = (link) => {
    window.open(link, newTab ? "_blank" : "_self");
  };
  return (
    <Button className="Links" onClick={() => handleLink(link)}>
      <img src={icon} alt="Icon" />
    </Button>
  );
};

const Home = () => {
  return (
    <div className="portfolio-wrapper" style={{ marginTop: 55 }}>
      <Row className="align-items-end">
        <Col md={12} sm={12}>
          <h1 className="secondary-text-color heading--title">
            Building Dreams through Code & Creativity for Over a Decade.
          </h1>
          <div className="Links--wrapper mt-4">
            <ButtonLink
              icon={Fiveer}
              ntab={true}
              link={"https://www.fiverr.com/tonysimons"}
            />
            <ButtonLink icon={Email} link={"mailto:Tonysimons619@gmail.com"} />
            <ButtonLink
              icon={WhatsApp}
              ntab={true}
              link={"https://wa.link/jzlrxh"}
            />
            <ButtonLink icon={Telegram} link={"#"} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
