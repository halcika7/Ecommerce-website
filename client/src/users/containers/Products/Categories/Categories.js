import React, { useState } from 'react';
import { connect } from 'react-redux';
import Subcategories from './Subcategories';

const Categories = ({ categories }) => {
	const [show, setShow] = useState(true);

	const clicked = e => {
		e.preventDefault();
		setShow(!show);
	};

	return (
		<div className="col-12">
			<p
				className={
					show
						? 'dropdown-category-links color'
						: 'dropdown-category-links down'
				}
				onClick={clicked}>
				Categories
				<i className={show ? 'fas fa-angle-down color' : 'fas fa-angle-down'} />
			</p>
			{show && (
				<div className="category-search-list">
					<Subcategories categories={categories} />
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Categories);
