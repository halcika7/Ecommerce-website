import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../users/components/UI/Spinner/Spinner';

const PrivateRoute = ({ PageToLoad, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated ? (
				<Suspense fallback={<Spinner />}>
					<PageToLoad />
				</Suspense>
			) : (
				<Redirect to="/authentication" />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

const mapstateToProps = state => {
	return {
		isAuthenticated: state.login.isAuthenticated
	};
};

export default connect(mapstateToProps)(PrivateRoute);
