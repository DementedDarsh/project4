import { forwardRef, useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { DataContext } from "../../App";

const Signin = (props) => {
  const navigate = useNavigate();
  //   const [userContext, setUserContext] = useContext(DataContext);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // validationSchema: validateSchema,
    onSubmit: async (values) => {
      console.log("submitted values: ", values);
      await axios.post("/api/user/login", values);
      axios({
        method: "post",
        url: "/api/user/login",
        data: values,
      }).then((response) => {
        console.log(response);
        if (response.data.status === "not ok") {
          console.log("not ok");
          const newMsg =
            response.data.message.charAt(0).toUpperCase() +
            response.data.message.slice(1);
          setMessage(newMsg);
        } else {
          const result = response.data.data;
          let user = {
            userID: "",
            username: "",
            password: "",
          };
          user = {
            ...user,
            userID: result._id,
            username: result.username,
            password: result.password,
            initialA: result.initialA,
            initialB: result.initialB,
            initialC: result.initialC,
          };
          console.log(user);
          localStorage.setItem("currentUser", JSON.stringify(user))
          //   setUserContext(user);
          props.setUser(user)
         navigate("/", { replace: false })
        }
      });
    },
  });

  return (
    <div>
      <div>
        <h1>Sign In</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            error={formik.touched?.username && formik.errors?.username}
            label="Username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            error={formik.touched?.password && formik.errors?.password}
            label="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
          />
          <br />
          <br />
          {message}
          <br />
          <button
            // className="mt-8 bg-black disabled:bg-gray-200 active:bg-gray-900 focus:outline-none text-white rounded px-4 py-1"
            type="submit"
            //dirty === not filled up, isValid === validity of all fields
            // disabled={!(formik.isValid && formik.dirty)}
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <p>Don't have an account? Create one now!</p>
        <button
          //   className="mt-8 bg-black active:bg-gray-900 focus:outline-none text-white rounded px-4 py-1"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signin;
