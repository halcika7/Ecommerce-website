import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SmallSpinner from '../../users/components/UI/SmallSpinner/SmallSpinner';

const AdminRoute = ({ PageToLoad, componentProps, isAuthenticated, isAdmin, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			(isAuthenticated && isAdmin) ? (
				<Suspense fallback={
                    <div className="Card bg-white">
                        <SmallSpinner />
                    </div>
                }>
					<PageToLoad {...componentProps} {...props}/>
				</Suspense>
			) : (
				<Redirect to="/authentication" />
			)
		}
	/>
);

AdminRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	isAdmin: PropTypes.bool.isRequired
};

const mapstateToProps = state => {
	return {
        isAuthenticated: state.login.isAuthenticated,
        isAdmin: state.login.User.role.isAdmin,
	};
};

export default connect(mapstateToProps)(AdminRoute);
