import React, { useState } from "react";
const NAME_OF_UPLOAD_PRESET = "project4";
const YOUR_CLOUDINARY_ID = "djtovzgnc";

const ImageUpload = (props) => {
  const [displayedImage, setDisplayedImage] = useState(
    "https://res.cloudinary.com/djtovzgnc/image/upload/v1647291507/project4/vwmcw2wdog0ufzmihzcb.png"
  );
  const [formData, setFormData] = useState({
    // ...other fields
    img: "",
  });
  const [uploadingImg, setUploadingImg] = useState(false);

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
    props.formik.setFieldValue(props.name, img.secure_url);
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

  return (
    <div>
      <img className="preview"
        src={displayedImage}
        style={{
          height: "200px",
          width: "200px",
          overflow: "hidden",
          objectFit: "cover",
        }}
      />
      <br />
      <label className="imageUploadButton">
        Upload Image
      <input
        className="input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploadingImg}
        error={
          props.formik.touched?.description && props.formik.errors?.imgPath
        }
      /></label>
    </div>
  );
};

export default ImageUpload;
