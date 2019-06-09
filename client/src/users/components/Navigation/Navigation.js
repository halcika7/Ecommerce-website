import React, { Component } from 'react';
import TopNavigation from './TopNavigation/TopNavigation';
import MiddleNavigation from './MiddleNavigation/MiddleNavigation';
import BottomNavigation from './BottomNavigation/BottomNavigation';

class Navigation extends Component {
	render() {
		return (
			<React.Fragment>
				<TopNavigation {...this.props} />
				<MiddleNavigation />
				<BottomNavigation icons={this.props.icons} />
			</React.Fragment>
		);
	}
}

export default Navigation;
