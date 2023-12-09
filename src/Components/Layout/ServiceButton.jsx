/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "react-bootstrap";
import checked from "../../assets/Images/Icons/checked.svg";
import unchecked from "../../assets/Images/Icons/unchecked.svg";

const CheckedIcon = () => {
  return (
    <div className="icon--container">
      <img src={checked} alt="Checked Icon" />
    </div>
  );
};

const UncheckedIcon = () => {
  return (
    <div className="icon--container">
      <img src={unchecked} alt="Unchecked Icon" />
    </div>
  );
};

const ServiceButton = ({ name, handleTypeChange, activeButton }) => {
  const [clicked, setClicked] = useState(false);
  const isActive = activeButton === name;
  const handleClick = () => {
    setClicked(!clicked);
    handleTypeChange(name);
  };

  return (
    <Button
      className={`contact--option--button ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {isActive ? <CheckedIcon /> : <UncheckedIcon />}
      <p style={{ marginBottom: "-3px" }}>{name}</p>
    </Button>
  );
};

export default ServiceButton;
