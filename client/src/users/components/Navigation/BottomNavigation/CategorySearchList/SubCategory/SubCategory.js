import React, { useState } from 'react';
import SubSubCategory from './SubSubCategory';

import c from '../../../Navigation.module.css';

const SubCategory = ({ category }) => {
	const [showCategories, setShowCategories] = useState(false);
	return (
		<li className="dropdownLi d-block">
			<span
				className={c.dropdownNavCategoryLinks}
				onClick={e => setShowCategories(!showCategories)}>
				<i className="fas fa-angle-right" />
				{category.name}
			</span>
			<div
				className={c.categoryNavSearchList + ' ' + c.sub}
				style={showCategories ? { height: '100%' } : { height: '0' }}>
				{category.subcategories.map((categ, index) => (
					<SubSubCategory
						categ={categ}
						key={index}
						categoryName={category.name}
					/>
				))}
			</div>
		</li>
	);
};

export default React.memo(SubCategory);
