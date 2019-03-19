import React from 'react';
import Question from './Question/Question';

import c from './Questions.module.css';

const questions = (props) => {
    const questions = props.questions.map( (question, index) => {
        return <Question question={question} key={index} click={props.click}/>
    });
    return (
        <div className={c.container + " container " + c.accordion}>
            <div>
                <div className={c.col12 + " col-12"}>
                    <h4>Answers to Your Questions</h4>
                </div>

                {questions}
            </div>
        </div>
    );
}

export default questions;