import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import c from '../../../Navigation.module.css';

const subSubCategory = ({ categ, categoryName }) => {
	const [showCategories, setShowCategories] = useState(false);
	return (
		<React.Fragment>
			<span
				className={c.dropdownNavCategoryLinks}
				style={{ marginLeft: '10px' }}
				onClick={e => setShowCategories(!showCategories)}>
				<i className="fas fa-angle-right" />
				{categ.name}
			</span>
			{showCategories && (
				<ul className={c.catChild} style={{ marginLeft: '10px' }}>
					{categ.subcategories.map((cat, index) => (
						<li key={index}>
							<Link
								to={`/products?category=${categoryName}&subcategoryName=${
									categ.name
								}&subcategory=${cat}`}>
								{cat}
							</Link>
						</li>
					))}
				</ul>
			)}
		</React.Fragment>
	);
};

export default subSubCategory;
