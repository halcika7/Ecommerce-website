import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Link } from 'react-router-dom';
import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';
import Term from './Term/Term';

import c from './Terms.module.css';

const Terms = props => {
	useEffect(() => {
		document.title = 'Terms';
		props.getAllTerms();
	}, []);

	const terms = props.terms.terms.map((term, index) => (
		<Term term={term} key={index} />
	));

	return (
		<React.Fragment>
			<div className="container-fluid breadcrum">
				<div className="container">
					<div className="inline-nav">
						<Link to="/">Home</Link>
						<i className="fas fa-long-arrow-alt-right" />
						<a className="prevent-click" href="/">
							Terms & Conditions
						</a>
					</div>
				</div>
			</div>

			<div className={c.container + ' container ' + c.conditions}>
				<div className={c.conditions}>{terms}</div>
			</div>

			<ContainerIcons />
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	terms: state.terms
});

const dispatchToProps = dispatch => ({
	getAllTerms: () => dispatch(actions.getAllTerms())
});

export default React.memo(connect(
	mapStateToProps,
	dispatchToProps
)(Terms));
