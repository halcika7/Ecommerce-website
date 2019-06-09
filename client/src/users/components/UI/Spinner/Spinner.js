import React from 'react';

import classes from './Spinner.module.css';

const spinner = props => {
	return (
		<div
			className={
				!props.show
					? classes.FullWidthHeight
					: classes.FullWidthHeight + ' ' + classes.None
			}>
			<div className={classes.Loader} />
		</div>
	);
};

export default spinner;
