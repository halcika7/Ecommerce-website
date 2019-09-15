import React, { Component } from 'react';
import SubCategory from './SubCategory/SubCategory';

class CategorySearchList extends Component {
	render() {
		const categories = this.props.categories.map((category, index) => (
			<SubCategory category={category} key={index} />
		));
		return <ul>{categories}</ul>;
	}
}

export default React.memo(CategorySearchList);
