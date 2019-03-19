import React from 'react';
import FooterListItem from './FooterListItem/FooterLisItem';
import c from './FooterList.module.css';

const footerList = (props) => {
    const items = props.items.map((item,index) => {
        return <FooterListItem item={item} key={index} />
    })
    return(
        <ul className={c.list}>
            {items}
        </ul>
    );
}

export default footerList;