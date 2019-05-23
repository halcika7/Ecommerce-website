import React from 'react';
import c from '../../Navigation.module.css';

const dropdownMenu = (props) => {
    return(
        <div className={c.megamenu1 + " megamenu1 d-none d-lg-block"} style={{ height: `${props.height}px` }}>
            <div className={c.row + " row"} >
                {props.data.map((category, index) => 
                    <ul key={index} className={c.col + " col-4"}>
                        <li><h5>{category.name}</h5></li>
                        {category.subcategories.map((cat, index) => <li key={index}><a href="/">{cat}</a></li>)}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default dropdownMenu;