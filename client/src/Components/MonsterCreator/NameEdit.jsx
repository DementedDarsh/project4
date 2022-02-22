import React from "react";

const NameEdit = (props) => {
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" name="name" onChange={props.handleChange} />
    </div>
  );
};

export default NameEdit;
