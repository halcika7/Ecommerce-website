import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Spinner from '../../users/components/UI/Spinner/Spinner';

const PublicRoute = ({ PageToLoad, componentProp, ...rest }) => (
	<Route
		{...rest}
		render={props =>
            <Suspense fallback={<Spinner />}>
                <PageToLoad {...props} {...componentProp}/>
            </Suspense>
		}
	/>
);

export default PublicRoute;
