import React, { useState } from "react";
import classes from "./UploadPictures.module.css";

const UploadPictures = props => {
  const [pictures, setPictures] = useState([]);
  const [pictureLoaded, setPictureLoaded] = useState([]);

  const readURL = e => {
    const files = e.target.files;
    const newPictures = [...pictures];
    const newPictureLoaded = [...pictureLoaded];

    for (let file of files) {
      const picReader = new FileReader();
      if (!file.type.match("image")) continue;

      newPictures.push(file);
      setPictures(newPictures);

      picReader.onload = e => {
        const picFile = e.target.result;
        console.log(file);
        newPictureLoaded.push({file: picFile});
        setPictureLoaded(newPictureLoaded);
      };
      
      picReader.onloadend = e => {
        const newPictureLoade = newPictureLoaded.map(item => ({file: item.file}));
        setPictureLoaded(newPictureLoade); 
      };

      picReader.readAsDataURL(file);
    }
  };

  const deleteButton = (e, index) => {
    e.preventDefault();
    const newPictures = [...pictures];
    newPictures.splice(index,1);
    setPictures(newPictures);
    const newPictureLoaded = [...pictureLoaded];
    newPictureLoaded.splice(index,1);
    setPictureLoaded(newPictureLoaded);
  }

  if(pictures.length > 0) {
    props.change(pictures);
  }

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
      {pictureLoaded.length > 0 && <div className={classes.imagesPerview} >
        {pictureLoaded.map((picture, index) => 
          <div className={classes.perviewImage} key={index}>
            <div className={classes.imageCancle} onClick={e => deleteButton(e,index)}>
              <div className="button-block">
                <i className="mark x"></i>
                <i className="mark xx"></i>
              </div>
            </div>
            <img src={picture.file} alt={picture.file}/>
          </div>
        )}
      </div>}
    </React.Fragment>
  );
};

export default UploadPictures;
