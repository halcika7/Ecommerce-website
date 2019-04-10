import React from 'react';

import classes from './Buttons.module.css';

const ToggleSwitchButton = props => (
    <React.Fragment>
        <label className="text-white d-block">{props.name}</label>
        <label className={classes.toggleCheck + " text-white"}>
            <input
                className={classes.toggleCheckbox}
                type="checkbox"
                checked={props.value}
                onChange={() => props.setValue(!props.value)}
                disabled={props.disabled}/>
            <span className={classes.toggleCheckText}></span>
        </label>
    </React.Fragment>
);
export default ToggleSwitchButton;