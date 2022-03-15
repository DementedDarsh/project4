import "./style.css";
import React, { useState } from "react";
import NameEdit from "../SharedComponents/NameEdit";
import StatEdit from "../SharedComponents/StatEdit";
import { useFormik, Formik } from "formik";
import ImageUpload from "../SharedComponents/ImageUpload";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const WeaponCreator = () => {
  const navigate = useNavigate();
  const [availableStatPoints, setAvailableStatPoints] = useState(20);
  const minimumWeaponStats = {
    imagePath: "",
    name: "",
    weaponDamage: 10,
    attackSpeed: 1,
    critRate: 10,
    hitRate: 20,
  };
  const [weaponStats, setWeaponStats] = useState(minimumWeaponStats);

  const validateSchema = Yup.object().shape({
    imagePath: Yup.string().required("Please upload an image."),
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
            imagePath: "",
            name: "",
            weaponDamage: 10,
            attackSpeed: 1,
            critRate: 10,
            hitRate: 20,
          };
          console.log(result);
          weapon = {
            ...weapon,
            imagePath: "",
            name: "",
            weaponDamage: 10,
            attackSpeed: 1,
            critRate: 10,
            hitRate: 20,
          };
          console.log(weapon);
          navigate(`/`, {
            replace: false,
          });
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
      if (availableStatPoints >= 1 && weaponStats.critRate < 100) {
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
      if (availableStatPoints >= 1 && weaponStats.hitRate < 100) {
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
      <tr key={item.name}>
        <td>
          <StatEdit
            key={item.name}
            stats={weaponStats}
            parameter={item.name}
            setStats={item.set}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Link to={`/`}><button className="buttonSubmit">Back</button></Link>
      <form onSubmit={formik.handleSubmit}>
        <table style={{ margin: "0 auto", marginTop: "30px" }}>
          <thead>
            <tr>
              <th>
                <p style={{ fontSize: "40px", marginTop: "85px" }}>
                  Create a weapon!
                </p>
                <div style={{ marginTop: "80px", textAlign: "left" }}>
                  <NameEdit handleChange={formik.handleChange} />
                </div>
              </th>
              <th>
                <ImageUpload formik={formik} name={"imagePath"} />
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
                  style={{ marginTop: "180px", fontSize: "40px" }}
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
                <div style={{ marginTop: "150px" }}>
                  <button
                    type="submit"
                    className="buttonSubmit"
                    disabled={availableStatPoints > 0}
                  >
                    Submit
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {/* <form onSubmit={formik.handleSubmit}>
        <ImageUpload formik={formik} name={"imagePath"} />
        <NameEdit handleChange={formik.handleChange} />
        <span>{availableStatPoints}</span>
        {statEditMap}
        <button type="submit" disabled={availableStatPoints > 0} onClick={formik.handleSubmit}>
          Submit
        </button>
      </form> */}
    </>
  );
};

export default WeaponCreator;
