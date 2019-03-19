import React from 'react';
import c from './StoreAcitvity.module.css';

const storeActivity = (props) => (
    <div className={c.colmd4 + " col-md-4"}>
        <div className={c.col12 + " col-12"}>
            <a href="/">
                <div className={c.img}>
                    <img src={props.activity.image} alt="" />   
                </div>
                <h5>{props.activity.heading}</h5>
                <p>{props.activity.paragraph}</p>
            </a>
        </div>
    </div>
);

export default storeActivity;