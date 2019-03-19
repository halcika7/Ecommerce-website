import React from 'react';
import {NavLink} from 'react-router-dom';

const navItem = (props) => {
    return (
        <li className={props.item.classes.first + " nav-item"}>
            <NavLink className={props.item.classes.second + " nav-link"} to={props.item.link} exact activeClassName={props.item.classes.third}>{props.item.name}</NavLink>
        </li>
    );
}

export default navItem;