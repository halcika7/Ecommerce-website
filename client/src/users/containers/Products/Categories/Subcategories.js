import React from 'react'
import classes from '../Filters/Filters.module.css';
import CategoryLi from './CategoryLi';

const Subcategories = ({ categories }) => {

    return (
        <ul className={classes.categories + ' categories'}>
            {categories.map((category, index) => 
                <CategoryLi category={category} key={index}/>
            )}
        </ul>
    )

}

export default Subcategories;
