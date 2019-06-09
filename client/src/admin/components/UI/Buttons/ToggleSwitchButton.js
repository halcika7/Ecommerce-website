import React from 'react';
import classnames from 'classnames';

import classes from './Buttons.module.css';

const ToggleSwitchButton = props => (
	<React.Fragment>
		<label className="text-white d-block">{props.name}</label>
		<label className={classes.toggleCheck + ' text-white'}>
			<input
				className={classnames(classes.toggleCheckbox, {
					invalid: props.error
				})}
				type="checkbox"
				checked={props.value}
				onChange={() => props.setValue(!props.value)}
				disabled={props.disabled}
			/>
			<span className={classes.toggleCheckText} />
			{props.error && <div className="invalid-feedback">{props.error}</div>}
		</label>
	</React.Fragment>
);
export default ToggleSwitchButton;
