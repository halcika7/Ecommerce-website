import React from 'react';
import { Link } from 'react-router-dom';

import c from '../../Navigation.module.css';

const leftLinks = props => {
	return (
		<div className={c.links}>
			<Link to={props.link}>{props.name}</Link>
		</div>
	);
};

export default React.memo(leftLinks);
