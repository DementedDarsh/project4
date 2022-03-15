import React from "react";
import { useFormik, Formik } from "formik";
import axios from "axios";
import "./style.css";
import { useOutletContext, useNavigate } from "react-router-dom";

const GameOver = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useOutletContext();
  const formik = useFormik({
    initialValues: {
      initialA: "",
      initialB: "",
      initialC: "",
      score: level,
    },
    onSubmit: async (values) => {
      console.log("submitted values: ", values);
      axios({
        method: "post",
        url: "/api/scores/new",
        data: values,
      }).then((response) => {
        console.log(response);
        if (response.data.status === "not ok") {
          console.log("Error before submitting:" + response.data.message);
          // const newMsg =
          //   response.data.message.charAt(0).toUpperCase() +
          //   response.data.message.slice(1);
          // setMessage(newMsg);
        } else {
          const result = response.data.data;
          let score = {
            initialA: "",
            initialB: "",
            initialC: "",
            score: 0,
          };
          console.log(result);
          score = {
            ...score,
            initialA: "",
            initialB: "",
            initialC: "",
            score: 0,
          };
          console.log(score);
          navigate(`/`, {
            replace: false,
          });
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
        className="initialsGO"
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

  return (
    <form>
      <div>
        <p>Game Over!</p>
        <p>Enter your initials:</p>
        {inputsDisplay}
        <datalist id="letters">{datalistOptions}</datalist>
      </div>
      <button
        type="submit"
        className="buttonSubmit"
        onClick={formik.handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default GameOver;
