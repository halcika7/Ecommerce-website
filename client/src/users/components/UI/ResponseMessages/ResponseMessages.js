import React from 'react';
import classes from './ResponseMessages.module.css';

const ResponseMessage = props => {
	let classNames;
	if (props.ClassName === 'Danger') {
		classNames = [classes.FlashMessage, classes.Danger];
	} else {
		classNames = [classes.FlashMessage, classes.Success];
	}

	return (
		<div className={classNames.join(' ')}>
			{Object.keys(props.message).length > 0 &&
			(typeof props.message !== 'string' || props.message instanceof String) ? (
				Object.keys(props.message).map((message, index) => (
					<p key={index}>{props.message[message]}</p>
				))
			) : (
				<p>{props.message}</p>
			)}
		</div>
	);
};

export default ResponseMessage;
