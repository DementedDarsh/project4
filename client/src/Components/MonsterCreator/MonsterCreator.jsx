import "./style.css";
import React, { useState } from "react";
import NameEdit from "../SharedComponents/NameEdit";
import StatEdit from "../SharedComponents/StatEdit";
import { useFormik, Formik } from "formik";
import ImageUpload from "../SharedComponents/ImageUpload";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const MonsterCreator = () => {
  //DEFINING VARIABLES
  const navigate = useNavigate();
  const [availableStatPoints, setAvailableStatPoints] = useState(20);
  const minimumMonsterStats = {
    imagePath: "",
    name: "",
    hp: 50,
    attack: 10,
    defense: 10,
    killCount: 0,
  };
  const [monsterStats, setMonsterStats] = useState(minimumMonsterStats);
  const [message, setMessage] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  //VALIDATION
  const validateSchema = Yup.object().shape({
    imagePath: Yup.string().required("Please upload an image."),
    name: Yup.string().required("Please give your monster a name!"),
  });
  // FORM SUBMIT
  const formik = useFormik({
    initialValues: monsterStats,
    // validationSchema: validateSchema,
    onSubmit: async (values) => {
      console.log("submitted values: ", values);
      axios({
        method: "post",
        url: "/api/monster/new",
        data: values,
      }).then((response) => {
        console.log(response);
        if (response.data.status === "not ok") {
          console.log("Error before submitting:" + response.data.message);
          const newMsg =
            response.data.message.charAt(0).toUpperCase() +
            response.data.message.slice(1);
          setMessage(newMsg);
        } else {
          const result = response.data.data;
          let monster = {
            imagePath: "",
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            killCount: 0,
          };
          console.log(result);
          monster = {
            ...monster,
            imagePath: "",
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            killCount: 0,
          };
          console.log(monster);
          navigate(`/`, {
            replace: false,
          });
        }
      });
    },
  });

  //STAT FUNCTIONS
  const setHp = (type) => {
    const increaseFormikValue = (prevState) => prevState + 50;
    const decreaseFormikValue = (prevState) => prevState - 50;
    if (type === "increase") {
      if (availableStatPoints >= 1) {
        setMonsterStats((prevState) => ({
          ...prevState,
          hp: prevState.hp + 50,
        }));
        formik.setFieldValue("hp", increaseFormikValue(monsterStats.hp));
        setAvailableStatPoints((prevState) => prevState - 1);
      }
    } else if (type === "decrease") {
      if (monsterStats.hp > minimumMonsterStats.hp) {
        setMonsterStats((prevState) => ({
          ...prevState,
          hp: prevState.hp - 50,
        }));
        formik.setFieldValue("hp", decreaseFormikValue(monsterStats.hp));
        setAvailableStatPoints((prevState) => prevState + 1);
      } else {
        console.log(minimumMonsterStats);
      }
    }
  };

  const setAtk = (type) => {
    const increaseFormikValue = (prevState) => prevState + 10;
    const decreaseFormikValue = (prevState) => prevState - 10;
    if (type === "increase") {
      if (availableStatPoints >= 1) {
        setMonsterStats((prevState) => ({
          ...prevState,
          attack: prevState.attack + 10,
        }));
        formik.setFieldValue(
          "attack",
          increaseFormikValue(monsterStats.attack)
        );
        setAvailableStatPoints((prevState) => prevState - 1);
      }
    } else if (type === "decrease") {
      if (monsterStats.attack > minimumMonsterStats.attack) {
        setMonsterStats((prevState) => ({
          ...prevState,
          attack: prevState.attack - 10,
        }));
        formik.setFieldValue(
          "attack",
          decreaseFormikValue(monsterStats.attack)
        );
        setAvailableStatPoints((prevState) => prevState + 1);
      } else {
        console.log(minimumMonsterStats);
      }
    }
  };
  const setDef = (type) => {
    const increaseFormikValue = (prevState) => prevState + 10;
    const decreaseFormikValue = (prevState) => prevState - 10;
    if (type === "increase") {
      if (availableStatPoints >= 1) {
        setMonsterStats((prevState) => ({
          ...prevState,
          defense: prevState.defense + 10,
        }));
        formik.setFieldValue(
          "defense",
          increaseFormikValue(monsterStats.defense)
        );
        setAvailableStatPoints((prevState) => prevState - 1);
      }
    } else if (type === "decrease") {
      if (monsterStats.defense > minimumMonsterStats.defense) {
        setMonsterStats((prevState) => ({
          ...prevState,
          defense: prevState.defense - 10,
        }));
        formik.setFieldValue(
          "defense",
          decreaseFormikValue(monsterStats.defense)
        );
        setAvailableStatPoints((prevState) => prevState + 1);
      } else {
        console.log(minimumMonsterStats);
      }
    }
  };

  const stats = [
    { name: "hp", set: setHp },
    { name: "attack", set: setAtk },
    { name: "defense", set: setDef },
  ];

  const statEditMap = stats.map((item) => {
    return (
      <tr key={item.name}>
        <td>
          <StatEdit
            stats={monsterStats}
            parameter={item.name}
            setStats={item.set}
          />
        </td>
      </tr>
    );
  });

  //VALIDATIONS
  const nameValidation = document.querySelector("#name")?.value.length > 0;
  const nameCheck = nameValidation ? (
    <p className="valid">Name ✅</p>
  ) : (
    <p className="invalid">Enter a name for your monster.</p>
  );
  const imageCheck = imageUploaded ? (
    <p className="valid">Image ✅</p>
  ) : (
    <p className="invalid">Upload an image for your monster.</p>
  );
    const statPointsCheck = availableStatPoints === 0 ? (
      <p className="valid">All stat points spent. ✅</p>
    ) : (
      <p className="invalid">Please spend all stat points.</p>
    );

  return (
    <>
      <Link to={`/`}>
        <button className="buttonSubmit">Back</button>
      </Link>
      <table style={{ margin: "0 auto", marginTop: "30px" }}>
        <thead>
          <tr>
            <th>
              <p style={{ fontSize: "40px", marginTop: "85px" }}>
                Create a monster!
              </p>
              <div style={{ marginTop: "80px", textAlign: "left" }}>
                <NameEdit handleChange={formik.handleChange} />
              </div>
            </th>
            <th>
              <ImageUpload
                formik={formik}
                setImageUploaded={setImageUploaded}
                name={"imagePath"}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {" "}
              <table>
                <tbody>{statEditMap}</tbody>
              </table>
            </td>
            <td style={{ textAlign: "center" }}>
              <div
                className="statPoints"
                style={{ marginTop: "130px", fontSize: "40px" }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    marginTop: "5px",
                    marginBottom: "-8px",
                  }}
                >
                  Stat Points:{" "}
                </p>
                {availableStatPoints}
              </div>
              <div style={{ marginTop: "50px" }}>
                <form onSubmit={formik.handleSubmit} formik={formik}>
                  {nameCheck}
                  {imageCheck}
                  {statPointsCheck}
                  <button
                    type="submit"
                    className="buttonSubmit"
                    disabled={availableStatPoints > 0}
                  >
                    Submit
                  </button>
                  {message}
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <form onSubmit={formik.handleSubmit}>
        <div>MonsterCreator</div>
        <ImageUpload formik={formik} name={"imagePath"} />
        <NameEdit handleChange={formik.handleChange} />
        <span>{availableStatPoints}</span>
        <table>
          <tbody>{statEditMap}</tbody>
        </table>
        <button type="submit" disabled={availableStatPoints > 0}>
          Submit
        </button>
      </form> */}
    </>
  );
};

export default MonsterCreator;
