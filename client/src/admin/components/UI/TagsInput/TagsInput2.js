import React, { useState, useEffect } from "react";
import classes from "./TagsInput.module.css";
import LoginRegisterInputs from "../../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs";

const TagsInput2 = props => {
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setValues();
    document.addEventListener("click", e => handleDocumentClick(e));
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      setTags([]);
    };
  }, []);

  useEffect(() => {
    setValues();
    setError(false);
  }, [props.choosenValues, props.values]);

  const setValues = () => {
    const loadTags = [];
    for (const obj in props.choosenValues) {
      loadTags.push(props.choosenValues[obj]);
    }
    setTags(loadTags);
  };

  const tagOnClick = e => {
    e.preventDefault();
    const targetName = e.currentTarget.getAttribute("data-name");
    const newTags = [...tags];
    const tagIndex = newTags.findIndex(tag => tag === targetName);
    newTags.splice(tagIndex, 1);
    setTags([...newTags]);
    props.setChoosenValues(newTags);
  };

  const handleInputChange = e => setTagValue(e.target.value);

  const onkeydown = e => {
    if (e.key === "Enter") {
      if (e.target.value.length < 5) {
        setError("Name must be atleast 5 charactes !");
        return;
      }
      const findValue = tags.find(tag => tag === e.target.value);
      if (findValue) {
        setError("No duplicats allowed !");
        return;
      }
      const newTags = [...tags];
      newTags.push(tagValue);
      setTagValue("");
      props.setChoosenValues(newTags);
    }
  };

  const onFocused = e =>
    e.currentTarget.parentElement.classList.add(classes.Focused);

  const handleDocumentClick = e => {
    if (!e.target.closest(".modalLabel")) {
      const list = document.querySelector(".Ul");
      if (list) {
        if (list.classList.contains(classes.Focused)) {
          list.classList.remove(classes.Focused);
        }
      }
    }
  };

  return (
    <label className="modalLabel d-block">
      <ul className={classes.Ul2 + " Ul"}>
        {tags.map((tag, index) => (
          <li
            key={index}
            data-name={tag}
            onClick={tagOnClick}
            data-disabled={props.disabled}
          >
            {tag}
            <i className="fas fa-times" />
          </li>
        ))}
        <LoginRegisterInputs
          type="text"
          name="tags"
          placeholder="Add Sub Category"
          inputClass={classes.Input}
          invalidInput="invalid"
          invalidFeedback="invalid-feedback"
          value={tagValue}
          onChange={handleInputChange}
          error={error ? error : ""}
          onKeyDown={onkeydown}
          onFocus={onFocused}
          disabled={props.disabled}
        />
      </ul>
    </label>
  );
};

export default TagsInput2;
