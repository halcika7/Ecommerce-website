import React from 'react';

import c from '../../../Navigation.module.css';

const searchResult = (props) => (
    <li className="result">
        <img src={props.result.src} alt={props.result.alt} />
        <div className={c.productInfo}>
            <a href={props.result.href} aria-label={props.result.alt} target="_self" rel="noopener">
                <p>{props.result.title}</p>
            </a>
            <div className={c.price}>
                {props.result.old !=='' ? <p>{props.result.old}</p> : null}
                <p>{props.result.new}</p>
            </div>
        </div>
    </li>
);

export default searchResult;