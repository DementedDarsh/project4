import React, { useState } from "react";
import NameEdit from "../SharedComponents/NameEdit";
import StatEdit from "../SharedComponents/StatEdit";
import { useFormik, Formik } from "formik";
import ImageUpload from "../SharedComponents/ImageUpload";
import axios from "axios";
import * as Yup from "yup";

const WeaponCreator = () => {
  const [availableStatPoints, setAvailableStatPoints] = useState(20);
  const minimumWeaponStats = {
    iconPath: "",
    name: "",
    weaponDamage: 10,
    attackSpeed: 1,
    critRate: 10,
    hitRate: 20,
  };
  const [weaponStats, setWeaponStats] = useState(minimumWeaponStats);

  const validateSchema = Yup.object().shape({
    iconPath: Yup.string().required("Please upload an image."),
    name: Yup.string().required("Please give your weapon a name!"),
  });

  //FORM SUBMIT
  const formik = useFormik({
    initialValues: weaponStats,
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      console.log("submitted values: ", values);
      axios({
        method: "post",
        url: "/api/weapon/new",
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
          let weapon = {
            iconPath: "",
            name: "",
            weaponDamage: 10,
            attackSpeed: 1,
            critRate: 10,
            hitRate: 20,
          };
          console.log(result);
          weapon = {
            ...weapon,
            iconPath: "",
            name: "",
            weaponDamage: 10,
            attackSpeed: 1,
            critRate: 10,
            hitRate: 20,
          };
          console.log(weapon);
        //   navigate(`../${userContext.username}/posts/${result._id}`, {
        //     replace: false,
        //   });
        }
      });
    },
  });
  const setWeaponDamage = (type) => {
    const increaseFormikValue = (prevState) => prevState + 10;
    const decreaseFormikValue = (prevState) => prevState - 10;
    if (type === "increase") {
      if (availableStatPoints >= 1) {
        setWeaponStats((prevState) => ({
          ...prevState,
          weaponDamage: prevState.weaponDamage + 10,
        }));
        formik.setFieldValue(
          "weaponDamage",
          increaseFormikValue(weaponStats.weaponDamage)
        );
        setAvailableStatPoints((prevState) => prevState - 1);
      }
    } else if (type === "decrease") {
      if (weaponStats.weaponDamage > minimumWeaponStats.weaponDamage) {
        setWeaponStats((prevState) => ({
          ...prevState,
          weaponDamage: prevState.weaponDamage - 10,
        }));
        formik.setFieldValue(
          "weaponDamage",
          decreaseFormikValue(weaponStats.weaponDamage)
        );
        setAvailableStatPoints((prevState) => prevState + 1);
      } else {
        console.log(minimumWeaponStats);
      }
    }
  };

  const setAttackSpeed = (type) => {
    const increaseFormikValue = (prevState) => prevState + 1;
    const decreaseFormikValue = (prevState) => prevState - 1;
    if (type === "increase") {
      if (availableStatPoints >= 1) {
        setWeaponStats((prevState) => ({
          ...prevState,
          attackSpeed: prevState.attackSpeed + 1,
        }));
        formik.setFieldValue(
          "attackSpeed",
          increaseFormikValue(weaponStats.attackSpeed)
        );
        setAvailableStatPoints((prevState) => prevState - 1);
      }
    } else if (type === "decrease") {
      if (weaponStats.attackSpeed > minimumWeaponStats.attackSpeed) {
        setWeaponStats((prevState) => ({
          ...prevState,
          attackSpeed: prevState.attackSpeed - 1,
        }));
        formik.setFieldValue(
          "attackSpeed",
          decreaseFormikValue(weaponStats.attackSpeed)
        );
        setAvailableStatPoints((prevState) => prevState + 1);
      } else {
        console.log(minimumWeaponStats);
      }
    }
  };

  const setCritRate = (type) => {
    const increaseFormikValue = (prevState) => prevState + 10;
    const decreaseFormikValue = (prevState) => prevState - 10;
    if (type === "increase") {
      if (availableStatPoints >= 1) {
        setWeaponStats((prevState) => ({
          ...prevState,
          critRate: prevState.critRate + 10,
        }));
        formik.setFieldValue(
          "critRate",
          increaseFormikValue(weaponStats.critRate)
        );
        setAvailableStatPoints((prevState) => prevState - 1);
      }
    } else if (type === "decrease") {
      if (weaponStats.critRate > minimumWeaponStats.critRate) {
        setWeaponStats((prevState) => ({
          ...prevState,
          critRate: prevState.critRate - 10,
        }));
        formik.setFieldValue(
          "critRate",
          decreaseFormikValue(weaponStats.critRate)
        );
        setAvailableStatPoints((prevState) => prevState + 1);
      } else {
        console.log(minimumWeaponStats);
      }
    }
  };

  const setHitRate = (type) => {
    const increaseFormikValue = (prevState) => prevState + 20;
    const decreaseFormikValue = (prevState) => prevState - 20;
    if (type === "increase") {
      if (availableStatPoints >= 1) {
        setWeaponStats((prevState) => ({
          ...prevState,
          hitRate: prevState.hitRate + 20,
        }));
        formik.setFieldValue(
          "hitRate",
          increaseFormikValue(weaponStats.hitRate)
        );
        setAvailableStatPoints((prevState) => prevState - 1);
      }
    } else if (type === "decrease") {
      if (weaponStats.hitRate > minimumWeaponStats.hitRate) {
        setWeaponStats((prevState) => ({
          ...prevState,
          hitRate: prevState.hitRate - 20,
        }));
        formik.setFieldValue(
          "hitRate",
          decreaseFormikValue(weaponStats.hitRate)
        );
        setAvailableStatPoints((prevState) => prevState + 1);
      } else {
        console.log(minimumWeaponStats);
      }
    }
  };

  const stats = [
    { name: "weaponDamage", set: setWeaponDamage },
    { name: "attackSpeed", set: setAttackSpeed },
    { name: "critRate", set: setCritRate },
    { name: "hitRate", set: setHitRate },
  ];

  const statEditMap = stats.map((item) => {
    return (
      <StatEdit
        key={item.name}
        stats={weaponStats}
        parameter={item.name}
        setStats={item.set}
      />
    );
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ImageUpload formik={formik} name={"iconPath"} />
        <NameEdit handleChange={formik.handleChange} />
        <span>{availableStatPoints}</span>
        {statEditMap}
        <button type="submit" disabled={availableStatPoints > 0} onClick={formik.handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default WeaponCreator;
