import React, { useState } from "react";
import NameEdit from "../SharedComponents/NameEdit";
import StatEdit from "../SharedComponents/StatEdit";
import { useFormik, Formik } from "formik";
import ImageUpload from "../SharedComponents/ImageUpload";
import axios from "axios";
import * as Yup from "yup";

const MonsterCreator = () => {
//DEFINING VARIABLES
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

//VALIDATION
  const validateSchema = Yup.object().shape({
    imagePath: Yup.string().required("Please upload an image."),
    name: Yup.string().required("Please give your monster a name!"),
  });
// FORM SUBMIT
  const formik = useFormik({
    initialValues: monsterStats,
    validationSchema: validateSchema,
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
          // const newMsg =
          //   response.data.message.charAt(0).toUpperCase() +
          //   response.data.message.slice(1);
          // setMessage(newMsg);
        } else {
          const result = response.data.data;
          let monster = {
            imagePath: "",
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            killCount:0,
          };
          console.log(result);
          monster = {
            ...monster,
            imagePath: "",
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            killCount:0,
          };
          console.log(monster);
          // navigate(`../${userContext.username}/posts/${result._id}`, {
          //   replace: false,
          // });
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
      <StatEdit
        key={item.name}
        stats={monsterStats}
        parameter={item.name}
        setStats={item.set}
      />
    );
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>MonsterCreator</div>
        <ImageUpload formik={formik} name={"imagePath"}/>
        <NameEdit handleChange={formik.handleChange} />
        <span>{availableStatPoints}</span>
        {statEditMap}
        <button type="submit" disabled={availableStatPoints > 0}>Submit</button>
      </form>
    </>
  );
};

export default MonsterCreator;
