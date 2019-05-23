import React, { useState, useEffect, lazy } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
const SmallSpinner = lazy(() =>
	import('../../../users/components/UI/SmallSpinner/SmallSpinner')
);
const ResponseMessage = lazy(() =>
	import('../../../users/components/UI/ResponseMessages/ResponseMessages')
);

const AnswersToQuestions = props => {
    const [values, setValues] = useState({ question: '', answer: '' });
    const [errors, setErrors] = useState({ question: '', answer: '' });

    useEffect(() => {
        setValues({ ...props.answers.answerData });
    }, [props.answers.answerData]);

    useEffect(() => {
        setErrors({ ...props.answers.errors });
    }, [props.answers.errors]);

    const onFormSubmit = e => {
        e.preventDefault();
        props.addAnswer({ question: values.question, answer: values.answer });
    }
    
    const inputsOnChange = e => {
        const newValues = {...values};
        newValues[e.target.name] = e.target.value;
        setValues({ ...values, ...newValues });
    }

	return (
		<div className={'AdminProfile row'}>
            {props.answers.failedMessage && <ResponseMessage message={props.answers.failedMessage} ClassName="Danger" />}
            {props.answers.successMessage && <ResponseMessage message={props.answers.successMessage} />}
			<div className={'col-12 mb-30'}>
				{props.answers.loading ? (
					<div className={'card bg-white'}>
						<SmallSpinner />
					</div>
				) : (
					<React.Fragment>
						<div className="Card card text-white">
							<div className="card-header">
								{props.addanswer && <h4 className="text-white">Add Answer</h4>}
                                    {/* {props.viewanswer && (
                                <h4 className="text-white">{brandName} Brand</h4>
                                )}
                                {props.editbrand && <h4 className="text-white">Edit Brand</h4>} */}
							</div>
							<div className="card-body">
								<div className="col-12">
									<form onSubmit={onFormSubmit}>
										<label>Visitor question</label>
										<textarea
                                            name="question"
                                            value={values.question}
                                            onChange={inputsOnChange}
											placeholder="Enter visitor Question"
                                            className={errors.question ? 'invalid col-12' : 'col-12 mb-4'}
										/>
                                        {errors.question && <div className='invalid-feedback mb-4'>{errors.question}</div>}

										<label>Answer</label>
										<textarea
                                            name="answer"
                                            onChange={inputsOnChange}
                                            value={values.answer}
											placeholder="Enter visitor Question"
											className={errors.answer ? 'invalid col-12' : 'col-12'}
										/>
                                        {errors.answer && <div className='invalid-feedback'>{errors.answer}</div>}

										{!props.viewanswer && (
											<button className="btn btn-sm mt-20">
												{props.addanswer ? 'Add New Answer' : 'Update Answer'}
											</button>
										)}
									</form>
								</div>
							</div>
						</div>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
        answers: state.answers
    };
};

const mapDispatchToProps = dispatch => {
	return {
        addAnswer: (answerObj) => dispatch(actions.addAnswer(answerObj))
    };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AnswersToQuestions);
