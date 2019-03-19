import React from 'react';
import {Link} from 'react-router-dom';

const footerListItem = (props) => {
    return(
        <li>
            <Link to="/terms">{props.item}</Link>
        </li>
    );
}

export default footerListItem;