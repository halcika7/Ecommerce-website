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

const Terms = props => {
	const [values, setValues] = useState({ term: '', text: '' });
	const [errors, setErrors] = useState({ term: '', text: '' });

	useEffect(() => {
		(props.view || props.edit) &&
			props.getTerm(new URLSearchParams(props.location.search).get('id'));
	}, []);

	useEffect(() => {
		setValues({ ...props.terms.termData });
	}, [props.terms.termData]);

	useEffect(() => {
		setValues({ term: '', text: '' });
		setErrors({ term: '', text: '' });
	}, [props.location.search]);

	useEffect(() => {
		setErrors({ ...props.terms.errors });
	}, [props.terms.errors]);

	const onFormSubmit = e => {
		e.preventDefault();
		const id = new URLSearchParams(props.location.search).get('id');
		props.addterm && props.addTerm({ term: values.term, text: values.text });
		props.edit &&
			props.updateTerm({ term: values.term, text: values.text }, id);
		setValues({ term: '', text: '' });
		setErrors({ term: '', text: '' });
	};

	const inputsOnChange = e => {
		const newValues = { ...values };
		newValues[e.target.name] = e.target.value;
		setValues({ ...values, ...newValues });
	};

	return (
		<div className={'AdminProfile row'}>
			{props.terms.notFound && <Redirect to="/admindashboard/404" />}
			{props.terms.failedMessage && (
				<ResponseMessage
					message={props.terms.failedMessage}
					ClassName="Danger"
				/>
			)}
			{props.terms.successMessage && (
				<ResponseMessage message={props.terms.successMessage} />
			)}
			<div className={'col-12 mb-30'}>
				{props.terms.loading ? (
					<div className={'card bg-white'}>
						<SmallSpinner />
					</div>
				) : (
					<React.Fragment>
						<div className="Card card text-white">
							<div className="card-header">
								{props.addterm && <h4 className="text-white">Add Term</h4>}
								{props.view && <h4 className="text-white">Perview Term</h4>}
								{props.edit && (
									<h4 className="text-white">
										Update Term with ID{' '}
										{new URLSearchParams(props.location.search).get('id')}{' '}
									</h4>
								)}
							</div>
							<div className="card-body">
								<div className="col-12">
									<form onSubmit={onFormSubmit}>
										<label>Term</label>
										<textarea
											name="term"
											value={values.term}
											onChange={inputsOnChange}
											placeholder="Enter Term"
											className={
												errors.term || props.view
													? 'invalid col-12'
													: 'col-12 mb-4'
											}
											disabled={props.view ? true : false}
										/>
										{errors.term && (
											<div className="invalid-feedback mb-4">{errors.term}</div>
										)}

										<label>Answer</label>
										<textarea
											name="text"
											onChange={inputsOnChange}
											value={values.text}
											placeholder="Enter Text"
											className={
												errors.text || props.view
													? 'invalid col-12'
													: 'col-12 mb-4'
											}
											disabled={props.view ? true : false}
										/>
										{errors.text && (
											<div className="invalid-feedback">{errors.text}</div>
										)}

										{!props.view ? (
											<button className="btn btn-sm mt-20">
												{props.addterm ? 'Add New Term' : 'Update Term'}
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
		terms: state.terms
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addTerm: answerObj => dispatch(actions.addTerm(answerObj)),
		getTerm: id => dispatch(actions.getTerm(id)),
		updateTerm: (obj, id) => dispatch(actions.updateTerm(obj, id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Terms);
