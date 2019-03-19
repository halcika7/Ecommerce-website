import React from 'react';
import SubSubCategory from './SubSubCategory/SubSubCategory';

import c from '../../../Navigation.module.css';

const subCategory = (props) => {
    let link = <a href={props.categ.link}  target="_self" rel="noopener">{props.categ.name}</a>;
    if (props.categ.subCategories !== undefined) {
        const subsubcateg = props.categ.subCategories.map(cat => {
            return <SubSubCategory categ={cat} key={cat.index}/>;
        });
        link = (
            <React.Fragment>
                <span className={c.dropdownNavCategoryLinks}><i className="fas fa-angle-right"></i>{props.categ.name} ({props.categ.subCategories.length})</span>
                <div className={c.categoryNavSearchList + " " +c.sub}>
                    <ul className={c.catChild}>
                        {subsubcateg}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
    return (
        <li key={props.categ.index}>
            {link}
        </li>
    );
}

export default subCategory;