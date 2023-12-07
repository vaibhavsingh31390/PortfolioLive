import contactContext from "./contact-context";
import { useState } from "react";
const ContactProvider = (props) => {
  const [contactVisible, setContactVisible] = useState(false);

  return (
    <contactContext.Provider
      value={{
        contactVisible: contactVisible,
        contacted: localStorage.getItem("emailsent"),
        setContactVisible: setContactVisible,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactProvider;
