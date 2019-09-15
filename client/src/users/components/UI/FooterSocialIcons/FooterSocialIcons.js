import React from 'react';
import FooterSocialIcon from './FooterSocialIcon/FooterSocialIcon';

import c from './FooterSocialIcons.module.css';

const footerSocialIcons = props => {
	const icons = props.icons.map((icon, index) => {
		return <FooterSocialIcon key={index} icon={icon} />;
	});
	let classes = [];
	if (props.cls === 'directors') {
		classes.push(c.footersocialicons, c.directors);
	} else {
		classes.push(c.footersocialicons);
	}

	return <div className={classes.join(' ')}>{icons}</div>;
};

export default React.memo(footerSocialIcons);
