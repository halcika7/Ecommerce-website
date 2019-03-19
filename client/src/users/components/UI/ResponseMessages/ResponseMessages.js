import React from 'react';
import classes from './ResponseMessages.module.css';

const ResponseMessage = (props) => {

    let classNames;
    if(props.ClassName === 'Danger') {
        classNames = [classes.FlashMessage,classes.Danger]
    }else {
        classNames = [classes.FlashMessage,classes.Success]
    }

    return(
        <div className={classNames.join(' ')}>
            <p>{props.message}</p>
        </div>
    );
}

export default ResponseMessage;