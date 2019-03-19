import React from 'react';

import classes from './SmallSpinner.module.css';

const SmallSpinner = (props) => {
    if(props.extraClass){
        return (
            <div className={classes.Loader + ' ' + classes.Loaderr}>Loading...</div>
        );
    }else {
        return (
            <div className={classes.Loader}>Loading...</div>
        );
    }
};

export default SmallSpinner;