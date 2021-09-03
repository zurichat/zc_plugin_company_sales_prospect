import React from "react";

const CustomButton = (props) => {
  return (
    <>
      <button className="btn text-primary border-primary">{props.value}</button>
    </>
  );
};

export default CustomButton;
