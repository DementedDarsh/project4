import { forwardRef, useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
// import { DataContext } from "../../App";

const AdminLogin = () => {
  const navigate = useNavigate();
  // const [userContext, setUserContext] = useContext(DataContext);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    //   validationSchema: validateSchema,
    onSubmit: async (values) => {
      console.log("submitted values: ", values);
      await axios.post("/api/admin/login", values);
      axios({
        method: "post",
        url: "/api/admin/login",
        data: values,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "not ok") {
          console.log("not ok");
          const newMsg =
            response.data.message.charAt(0).toUpperCase() +
            response.data.message.slice(1);
          setMessage(newMsg);
        } else {
            const result = response.data;
        //   const result = response.data.data;
        //   let user = {
        //     password: "",
        //   };
        //   user = {
        //     password: result.password,
        //   };
          console.log(result);
          if(response.data.status === "ok"){
          navigate("/admin/monsters")}
          // localStorage.setItem("userContext", JSON.stringify(user));
          // setUserContext(user);
        //   navigate(-1, { replace: false });
        }
      });
    },
  });

  return (
    <div>
      <div>
      <Link to={`/`}><button className="buttonSubmit">Back</button></Link>
        <form onSubmit={formik.handleSubmit}>
          {/* <input
              error={formik.touched?.username && formik.errors?.username}
              label="Username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
            /> */}
          <label>Nothing to see here: <input
            //   dot={true}
            error={formik.touched?.password && formik.errors?.password}
            //   icon={<LockIcon />}
            label="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
          /></label>
          <p>{message}</p>
          <button className="buttonSubmit"
            //   className="mt-8 bg-black disabled:bg-gray-200 active:bg-gray-900 focus:outline-none text-white rounded px-4 py-1"
            type="submit"
            //dirty === not filled up, isValid === validity of all fields
            disabled={!(formik.isValid && formik.dirty)}
          >
            Submit
          </button>
        </form>
      </div>
      {/* <div>
          <p>Don't have an account? Create one now!</p>
          <button
            className="mt-8 bg-black active:bg-gray-900 focus:outline-none text-white rounded px-4 py-1"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div> */}
    </div>
  );
};

export default AdminLogin;
