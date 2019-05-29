import React from 'react'
import SubCategory from './SubCategory';

const Subcategories = ({ categories }) => {

    return (
        <ul className='categories'>
            {categories.map((category, index) => 
                <li key={index}>
                    <span className="dropdown-category-links color"><i className="fas fa-angle-down color"></i>{category.name} ({category.subcategories.length})</span>
                    {category.subcategories.map((subcategory, i) => 
                        <SubCategory category={category.name} subcategory={subcategory} key={i} />
                    )}
                </li>
            )}
        </ul>
    )

}

export default Subcategories;
