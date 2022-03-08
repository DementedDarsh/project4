import React from "react";

const NameEdit = (props) => {
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" name="name" onChange={props.handleChange} style={{width: "300px"}} error={props.formik?.touched?.description && props.formik?.errors?.description}/>
    </div>
  );
};

export default NameEdit;
