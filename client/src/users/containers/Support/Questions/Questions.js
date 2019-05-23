import React from 'react';
import Question from './Question/Question';

import c from './Questions.module.css';

const questions = (props) => {
    const questions = props.questions.map( (question, index) => <Question question={question} key={index} />);
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