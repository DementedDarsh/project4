import React, { useState } from "react";
import { useEffect } from "react";
import NameEdit from "./NameEdit";
import StatEdit from "./StatEdit";
import { useFormik, Formik } from "formik";

const NAME_OF_UPLOAD_PRESET = "project4Monsters";
const YOUR_CLOUDINARY_ID = "djtovzgnc";

const MonsterCreator = () => {
  const [availablePoints, setAvailablePoints] = useState();
  const [monsterStats, setMonsterStats] = useState({
    name: "",
    imagePath: "",
    hp: 10,
    attack: 15,
    defense: 20,
  });
  const [displayedImage, setDisplayedImage] = useState(
    "https://image.flaticon.com/icons/png/128/109/109612.png"
  );
  const [formData, setFormData] = useState({
    // ...other fields
    img: "",
  });
  const [uploadingImg, setUploadingImg] = useState(false);

  const formik = useFormik({
    initialValues: monsterStats,
    onSubmit: async (values) => {
      console.log("submitted values: ", values);
    },
  });

  useEffect(() => {
    const test = () => {
      console.log(monsterStats.hp);
      setMonsterStats((prevState) => ({ ...prevState, hp: 10 }));
      console.log(monsterStats);
    };
    test();
  }, []);

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const img = await res.json();
    setDisplayedImage(img.secure_url);
    formik.setFieldValue("imagePath", img.secure_url);
    console.log(img);
    return img.secure_url;
  };

  const handleFileChange = async (event) => {
    const [file] = event.target.files;
    if (!file) return;

    setUploadingImg(true);
    setDisplayedImage(
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1644945448/project3/fihn2qjb7r3lt4dq0jxu.gif"
    );
    const uploadedUrl = await uploadImage(file);
    setFormData({ ...formData, img: uploadedUrl });
    setUploadingImg(false);
  };

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
        <div>
          <img src={displayedImage} className="max-h-56" />
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploadingImg}
            error={formik.touched?.description && formik.errors?.imgPath}
          />
        </div>
        <NameEdit handleChange={formik.handleChange} />
        {statEditMap}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MonsterCreator;
