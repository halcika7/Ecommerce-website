import React from 'react';
import { Link } from 'react-router-dom';
import c from '../../Navigation.module.css';

const dropdownMenu = ({ data, category }) => (
	<div className={c.megamenu1 + ' megamenu1 d-none d-lg-block'}>
		<div className={c.row + ' row'}>
			{data.map((categ, index) => (
				<ul key={index} className={c.col + ' col-4'}>
					<li>
						<h5>{categ.name}</h5>
					</li>
					{categ.subcategories.map((cat, index) => (
						<li key={index}>
							<Link
								to={`/products?category=${category}&subcategoryName=${
									categ.name
								}&subcategory=${cat}`}>
								{cat}
							</Link>
						</li>
					))}
				</ul>
			))}
		</div>
	</div>
);

export default React.memo(dropdownMenu);
