import React from "react";

const contactContext = React.createContext({
  contactVisible: false,
  contacted: localStorage.getItem("emailsent"),
  setContactVisible: () => {},
});

export default contactContext;
