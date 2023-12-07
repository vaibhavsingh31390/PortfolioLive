import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ContactProvider from "./store/ContactProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContactProvider>
    <App />
  </ContactProvider>
);
