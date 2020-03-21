import React, { useState, useEffect, lazy } from 'react';
import { Redirect } from 'react-router-dom';
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
		(props.view || props.edit) &&
			props.getAnswer(new URLSearchParams(props.location.search).get('id'), props.history.push);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setValues({ ...props.answers.answerData });
	}, [props.answers.answerData]);

	useEffect(() => {
		setErrors({ ...props.answers.errors });
	}, [props.answers.errors]);

	const onFormSubmit = e => {
		e.preventDefault();
		const id = new URLSearchParams(props.location.search).get('id');
		props.addanswer &&
			props.addAnswer({ question: values.question, answer: values.answer }, props.history.push);
		props.edit &&
			props.updateAnswer(
				{ question: values.question, answer: values.answer },
				id,
				props.history.push
			);
		setValues({ question: '', answer: '' });
		setErrors({ question: '', answer: '' });
	};

	const inputsOnChange = e => {
		const newValues = { ...values };
		newValues[e.target.name] = e.target.value;
		setValues({ ...values, ...newValues });
	};

	return (
		<div className={'AdminProfile row'}>
			{props.answers.notFound && <Redirect to="/admindashboard/404" />}
			{props.answers.failedMessage && (
				<ResponseMessage
					message={props.answers.failedMessage}
					ClassName="Danger"
				/>
			)}
			{props.answers.successMessage && (
				<ResponseMessage message={props.answers.successMessage} />
			)}
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
								{props.view && <h4 className="text-white">Perview Answer</h4>}
								{props.edit && (
									<h4 className="text-white">
										Update Answer with ID{' '}
										{new URLSearchParams(props.location.search).get('id')}{' '}
									</h4>
								)}
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
											className={
												errors.question || props.view
													? 'invalid col-12'
													: 'col-12 mb-4'
											}
											disabled={props.view ? true : false}
										/>
										{errors.question && (
											<div className="invalid-feedback mb-4">
												{errors.question}
											</div>
										)}

										<label>Answer</label>
										<textarea
											name="answer"
											onChange={inputsOnChange}
											value={values.answer}
											placeholder="Enter visitor Question"
											className={
												errors.question || props.view
													? 'invalid col-12'
													: 'col-12 mb-4'
											}
											disabled={props.view ? true : false}
										/>
										{errors.answer && (
											<div className="invalid-feedback">{errors.answer}</div>
										)}

										{!props.view ? (
											<button className="btn btn-sm mt-20">
												{props.addanswer ? 'Add New Answer' : 'Update Answer'}
											</button>
										) : (
											<button
												className="btn btn-sm mt-20"
												onClick={e => props.history.goBack()}>
												Go back
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
		addAnswer: (answerObj, callBack) => dispatch(actions.addAnswer(answerObj, callBack)),
		getAnswer: (id, callBack) => dispatch(actions.getAnswer(id, callBack)),
		updateAnswer: (obj, id, callBack) => dispatch(actions.updateAnswer(obj, id, callBack))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AnswersToQuestions);
