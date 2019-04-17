import React, { useState } from "react";
import classes from "./UploadPicture.module.css";

const UploadPicture = props => {
  const [url, setUrl] = useState({ imgSrc: "http://placehold.it/180" });
  const readURL = e => {
    e.persist();
    const file = e.target.files[0];
    if (!file.type.match("image")) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = event => {
      setUrl({
        imgSrc: reader.result
      });

      props.change(e.target.name, e.target.files[0]);
    };
  };
  return (
    <React.Fragment>
      <label className={classes.btn2}>
        Upload Picture
        <input
          className={classes.input}
          type="file"
          onChange={readURL}
          name={props.name}
        />
      </label>
      <img
        id="updloadPicture"
        src={url.imgSrc}
        alt="you"
        width="180"
        height="180"
        className="d-block"
      />
    </React.Fragment>
  );
};

export default UploadPicture;
