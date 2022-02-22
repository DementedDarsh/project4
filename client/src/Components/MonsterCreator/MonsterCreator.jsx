import React, { useState } from "react";
import { useEffect } from "react";
import NameEdit from "./NameEdit";
import StatEdit from "./StatEdit";
import { useFormik, Formik } from "formik";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import * as Yup from "yup";

const MonsterCreator = () => {
  const [monsterStats, setMonsterStats] = useState({
    imagePath: "",
    name: "",
    hp: 10,
    attack: 15,
    defense: 20,
  });

  const validateSchema = Yup.object().shape({
    imagePath: Yup.string().required("Please upload an image."),
    name: Yup.string().required("Please give your monster a name!"),
  });

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
          };
          console.log(result);
          monster = {
            ...monster,
            imagePath: "",
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
          };
          console.log(monster);
          // navigate(`../${userContext.username}/posts/${result._id}`, {
          //   replace: false,
          // });
        }
      });
    },
  });

  const setHp = (type) => {
    const increaseFormikValue = (prevState) => prevState + 10;
    const decreaseFormikValue = (prevState) => prevState - 10;
    if (type === "increase") {
      setMonsterStats((prevState) => ({ ...prevState, hp: prevState.hp + 10 }));
      formik.setFieldValue("hp", increaseFormikValue(monsterStats.hp));
    } else if (type === "decrease") {
      setMonsterStats((prevState) => ({ ...prevState, hp: prevState.hp - 10 }));
      formik.setFieldValue("hp", decreaseFormikValue(monsterStats.hp));
    }
  };

  const setAtk = (type) => {
    const increaseFormikValue = (prevState) => prevState + 10;
    const decreaseFormikValue = (prevState) => prevState - 10;
    if (type === "increase") {
      setMonsterStats((prevState) => ({
        ...prevState,
        attack: prevState.attack + 10,
      }));
      formik.setFieldValue("attack", increaseFormikValue(monsterStats.attack));
    } else if (type === "decrease") {
      setMonsterStats((prevState) => ({
        ...prevState,
        attack: prevState.attack - 10,
      }));
      formik.setFieldValue("attack", decreaseFormikValue(monsterStats.attack));
    }
  };
  const setDef = (type) => {
    const increaseFormikValue = (prevState) => prevState + 10;
    const decreaseFormikValue = (prevState) => prevState - 10;
    if (type === "increase") {
      setMonsterStats((prevState) => ({
        ...prevState,
        defense: prevState.defense + 10,
      }));
      formik.setFieldValue(
        "defense",
        increaseFormikValue(monsterStats.defense)
      );
    } else if (type === "decrease") {
      setMonsterStats((prevState) => ({
        ...prevState,
        defense: prevState.defense - 10,
      }));
      formik.setFieldValue(
        "defense",
        decreaseFormikValue(monsterStats.defense)
      );
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
        {/* <div>
          <img src={displayedImage} className="max-h-56" />
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploadingImg}
            error={formik.touched?.description && formik.errors?.imgPath}
          />
        </div> */}
        <ImageUpload formik={formik} />
        <NameEdit handleChange={formik.handleChange} />
        {statEditMap}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MonsterCreator;
