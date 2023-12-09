import Header from "./Components/Layout/Header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/Styles/style.css";
// import "./assets/Styles/style.scss";
import Wrapper from "./Components/Wrapper/Wrapper.jsx";
import Home from "./Pages/Home.jsx";
import { useContext } from "react";
import PortalOverlay from "./Components/Form/FormOverlay.jsx";
import contactContext from "./store/contact-context.js";
import PortalForm from "./Components/Form/Form.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const ctx = useContext(contactContext);
  return (
    <>
      {ctx.contactVisible ? (
        <>
          <PortalOverlay /> <PortalForm />
        </>
      ) : (
        ""
      )}
      <Header />
      <Wrapper>
        <Home />
      </Wrapper>
      <ToastContainer />
    </>
  );
}

export default App;
