import React from 'react';

const footerSocialIcon = props => {
	return (
		<a href={props.icon.link}>
			<i className={props.icon.icon} />
		</a>
	);
};

export default footerSocialIcon;
