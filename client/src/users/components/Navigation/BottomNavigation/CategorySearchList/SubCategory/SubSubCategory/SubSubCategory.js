import React from 'react';

const subSubCategory = (props) => {
    return(
        <li>
            <a href={props.categ.link}  target="_self" rel="noopener">{props.categ.name}</a>
        </li>
    )
}

export default subSubCategory;