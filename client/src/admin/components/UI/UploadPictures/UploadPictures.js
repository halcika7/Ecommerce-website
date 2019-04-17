import React from "react";
import classes from "./UploadPictures.module.css";

const UploadPictures = props => {
  const readURL = e => {
    const files = e.target.files;
    const output = document.querySelector(
      ".UploadPictures_imagesPerview__9Aw3Z"
    );

    for (let file of files) {
      const picReader = new FileReader();
      if (!file.type.match("image")) continue;

      picReader.addEventListener("load", event => {
        const picFile = event.target;
        const html = `<div class="UploadPictures_perviewImage__1xL_8">
                                    <div class="UploadPictures_imageCancle__2ka1A">x</div>
                                    <img src="${picFile.result}">
                                </div>`;

        output.innerHTML += html;
      });

      picReader.readAsDataURL(file);
    }
  };
  return (
    <React.Fragment>
      <label className={classes.btn2}>
        Upload Pictures
        <input
          className={classes.input}
          type="file"
          onChange={readURL}
          multiple
        />
      </label>
      <div className={classes.imagesPerview} />
    </React.Fragment>
  );
};

export default UploadPictures;
