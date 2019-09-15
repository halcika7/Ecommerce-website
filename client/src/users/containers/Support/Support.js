import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Questions from './Questions/Questions';
import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';

const Support = props => {
	useEffect(() => {
		document.title = 'Support';
		props.getAllAnswers();
	}, []);

	return (
		<React.Fragment>
			<div className="container-fluid breadcrum">
				<div className="container">
					<div className="inline-nav">
						<Link to="/">Home</Link>
						<i className="fas fa-long-arrow-alt-right" />
						<a className="prevent-click" href="/">
							FAQ
						</a>
					</div>
				</div>
			</div>

			<Questions questions={props.answers.answers} />

			<ContainerIcons />
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		answers: state.answers
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getAllAnswers: () => dispatch(actions.getAllAnswers())
	};
};

export default React.memo(connect(
	mapStateToProps,
	mapDispatchToProps
)(Support));
