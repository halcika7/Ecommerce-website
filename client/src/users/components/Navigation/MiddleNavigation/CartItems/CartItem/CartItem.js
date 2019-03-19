import React from 'react';

const cartItem = (props) => {
    return(
        <li>
            <a href={props.item.href} aria-label={props.item.href} target="_self" rel="noopener">
                <img src={props.item.src} alt={props.item.alt} />
            </a>
            <a href={props.item.href} aria-label={props.item.href} target="_self" rel="noopener">
                <h6>{props.item.title}</h6>
            </a>
            <p> {props.item.qty} x ${props.item.new} </p>
            <span>X</span>
        </li>
    );
}

export default cartItem;