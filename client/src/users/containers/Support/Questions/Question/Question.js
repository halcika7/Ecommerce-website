import React from 'react';
import c from './Question.module.css';

const question = (props) => {
    return(
        <div className={c.col12 + " col-12"}>
        
            <div className={c.accordionlink + " accordion-link"} onClick={(event) => props.click(event,c.active)}>
                <a href="/" className="">{props.question.question}</a>
            </div>
        
            <div className={"collapse"}>
                <div className={c.answer}>{props.question.answer}</div>
            </div>
        </div>
    );
}

export default question;