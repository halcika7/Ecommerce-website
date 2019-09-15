import React from 'react';
import c from './Term.module.css';

const term = props => {
	return (
		<div className={c.col12 + ' col-12'}>
			<h4>{props.term.term}</h4>
			<p>{props.term.text}</p>
		</div>
	);
};

export default React.memo(term);
