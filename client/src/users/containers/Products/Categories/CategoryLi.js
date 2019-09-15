import React, { useState } from 'react';
import SubCategory from './SubCategory';

const CategoryLi = ({ category }) => {
	const [show, setShow] = useState(false);

	const clicked = e => {
		setShow(!show);
	};

	return (
		<li>
			<span className="dropdown-category-links color" onClick={clicked}>
				<i className="fas fa-angle-down color" />
				{category.name} ({category.subcategories.length})
			</span>
			{show &&
				category.subcategories.map((subcategory, i) => (
					<SubCategory
						category={category.name}
						subcategory={subcategory}
						key={i}
					/>
				))}
		</li>
	);
};

export default React.memo(CategoryLi);
