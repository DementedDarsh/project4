import { forwardRef, useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Signup = () => {
  const navigate = useNavigate();
  //   const [submitDisabled, setSubmitDisabled] = useState();
  //   const [userContext, setUserContext] = useContext(DataContext);
  //   const [isUpdatedData, setIsUpdatedData] = useContext(DatabaseStatus);
  const [allUsernames, setAllUsernames] = useState([]);

  useEffect(() => {
    const fetchAllUsernames = async () => {
      const result = await axios.get("/api/user/allusernames");
      setAllUsernames(result.data.data);
    };
    fetchAllUsernames();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repeatPassword: "",
      initialA: "",
      initialB: "",
      initialC: "",
    },
    // validationSchema: validateSchema(allUsernames),
    onSubmit: async (values) => {
      const body = {
        username: values.username,
        password: values.password,
        initialA: values.initialA,
        initialB: values.initialB,
        initialC: values.initialC,
      };
      console.log("submitted values: ", values);
      axios({
        method: "post",
        url: "/api/user/new",
        data: body,
      }).then((response) => {
        if (response.data.status === "not ok") {
          console.log(response.data.message);
        } else {
          const result = response.data.data;
          let user = {
            username: "",
            password: "",
            initialA: "",
            initialB: "",
            initialC: "",
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
          localStorage.setItem("currentUser", JSON.stringify(user));
          const newMsg =
            response.data.message.charAt(0).toUpperCase() +
            response.data.message.slice(1);
          window.alert(newMsg);
          // setIsUpdatedData(false);
          // setUserContext(user);
          navigate("/", { replace: false });
        }
      });
    },
  });

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const arrayOfAlphabets = alphabets.split("");
  const datalistOptions = arrayOfAlphabets.map((item) => {
    return <option key={item} value={item} />;
  });
  const inputs = ["initialA", "initialB", "initialC"];
  const inputsDisplay = inputs.map((item, index) => {
    return (
      <label key={index} htmlFor={item}>
        <input
          className="initials"
          list="letters"
          name={item}
          id={item}
          maxLength={1}
          onChange={formik.handleChange}
          pattern="[A-Z]{1}"
        />
      </label>
    );
  });
  const usernameLengthValidation =
    document.querySelector("#username")?.value.length > 4;
  const usernameLengthCheck = usernameLengthValidation ? (
    <p className="valid">Username is longer than 4 characters. ✅</p>
  ) : (
    <p className="invalid">Username must be longer than 4 characters.</p>
  );

  const usernameUniqueValidation = !allUsernames.includes(
    document.querySelector("#username")?.value
  );
  const usernameUniqueCheck = usernameUniqueValidation ? (
    <p className="valid">Username is available! ✅</p>
  ) : (
    <p className="invalid">Username taken.</p>
  );

  const passwordLengthValidation =
    document.querySelector("#password")?.value.length > 4;
  const passwordLengthCheck = passwordLengthValidation ? (
    <p className="valid">Password is longer than 4 characters. ✅</p>
  ) : (
    <p className="invalid">Password must be longer than 4 characters.</p>
  );

  const passwordMatchValidation =
    document.querySelector("#password")?.value ===
    document.querySelector("#confirmPassword")?.value;

  const passwordMatchCheck = passwordMatchValidation ? (
    <p className="valid">Passwords match. ✅</p>
  ) : (
    <p className="invalid">Passwords do not match.</p>
  );

  const disabledSubmit =
    !usernameLengthValidation ||
    !passwordMatchValidation ||
    !passwordLengthValidation ||
    !usernameUniqueValidation;

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            // error={formik.touched?.username && formik.errors?.username}
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            error={formik.touched?.password && formik.errors?.password}
            // icon={<LockIcon />}
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
          />
          <br />
          <label htmlFor="password">Confirm Password: </label>
          <input
            error={
              formik.touched?.confirmPassword && formik.errors?.confirmPassword
            }
            // icon={<LockIcon />}
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
          />
          <br />
          <p>Choose your default initials:</p>
          {inputsDisplay}
          <datalist id="letters">{datalistOptions}</datalist>
          <br />
          {usernameLengthCheck}
          {usernameUniqueCheck}
          {passwordLengthCheck}
          {passwordMatchCheck}
          <button
            type="submit"
            //dirty === not filled up, isValid === validity of all fields
            // disabled={!(formik.isValid && formik.dirty)}
            disabled={disabledSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <p>Already have an account? Sign in</p>
        <button onClick={() => navigate("/signin")}>Sign In</button>
      </div>
    </div>
  );
};

// Yup validation schema
// const validateSchema = (usernames) => {
// //   const allUsernames = [];
//   usernames.map((username) => {
//     return allUsernames.push(username.username);
//   });
//   const schema = Yup.object().shape({
//     username: Yup.string()
//       .min(6, "Username should be at least 6 characters")
//       .matches(/^[0-9A-Za-z]*[^ ]$/, "Please use alphanumeric characters")
//       .notOneOf(allUsernames, "This username is taken")
//       .required("Username is required"),
//     email: Yup.string().email("Invalid email").required("Email required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Password required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Please confirm password"),
//   });
//   return schema;
// };

export default Signup;
