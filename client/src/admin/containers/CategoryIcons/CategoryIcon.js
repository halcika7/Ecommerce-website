import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';
import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';

const CategoryIcon = props => {
	const [iconName, setIconName] = useState('');
	const [imgSrc, setImgSrc] = useState(false);
	const [error, setError] = useState(false);
	const [id, setId] = useState(false);

	useEffect(() => {
		startFunction();
	}, []);
	useEffect(() => {
		setIconName(props.iconState.name);
		setError(props.iconState.error);
		if (props.viewicon || props.editicon) {
			setImgSrc(props.iconState.name);
		}
	}, [props.iconState]);
	useEffect(() => {
		startFunction();
	}, [props.addicon, props.viewicon, props.editicon]);
	useEffect(() => {
		if (props.iconState.errorID) {
			setTimeout(() => props.history.goBack(), 6000);
		}
	}, [props.iconState.errorID]);

	const onSubmit = e => {
		e.preventDefault();
		if (iconName.length < 10) {
			setError('URL must be at least 10 characters');
			return;
		}
		if (error) {
			return;
		}
		setError(false);
		setImgSrc(false);
		setIconName('');
		if (props.addicon) {
			props.addIcon(iconName);
		}
		if (props.editicon) {
			props.updateIcon(id, iconName);
		}
	};

	const inputOnChange = e => {
		setIconName(e.target.value);
		const pattern = new RegExp(
			'(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)'
		);
		if (pattern.test(e.target.value)) {
			setImgSrc(e.target.value);
			setError(false);
		} else {
			setImgSrc(false);
			setError('Invalid img URL');
		}
	};

	const startFunction = () => {
		if (!props.addicon) {
			const id = new URLSearchParams(props.location.search).get('id');
			setId(id);
			props.getIcon(id);
		}
		if (props.addicon) {
			props.clearState();
		}
		setIconName(props.iconState.name);
		setError(props.iconState.error);
		setImgSrc(false);
	};

	return (
		<div className={'AdminProfile row'}>
			{props.iconState.successMessage && (
				<ResponseMessage message={props.iconState.successMessage} />
			)}
			{props.iconState.failedMessage && (
				<ResponseMessage
					ClassName="Danger"
					message={props.iconState.failedMessage}
				/>
			)}
			{props.iconState.errorID && (
				<ResponseMessage ClassName="Danger" message={props.iconState.errorID} />
			)}
			<div className={'col-12 mb-30'}>
				{props.iconState.loading || props.iconState.errorID ? (
					<div className={'card bg-white'}>
						{' '}
						<SmallSpinner />
					</div>
				) : (
					<React.Fragment>
						<div className="Card card text-white">
							<div className="card-header">
								{props.addicon && <h4 className="text-white">Add Icon</h4>}
								{props.viewicon && (
									<h4 className="text-white">
										<img src={iconName} alt={iconName} /> Icon
									</h4>
								)}
								{props.editicon && <h4 className="text-white">Edit Icon</h4>}
							</div>
							<div className="card-body">
								<div className="col-12">
									<form>
										<div className="row">
											<div className="col-sm-8">
												<LoginRegisterInputs
													formBox="form-group"
													label="Icon Name"
													type="text"
													name="iconName"
													placeholder="Add Icon URL"
													inputClass="form-control"
													invalidInput="invalid"
													invalidFeedback="invalid-feedback"
													value={iconName}
													onChange={inputOnChange}
													error={error ? error : ''}
													disabled={props.viewicon && true}
												/>
											</div>
											{imgSrc && !props.viewicon && (
												<div className="col-sm-4">
													<label className="d-block">Category Icon Image</label>
													<img
														src={imgSrc}
														alt="imgPerview"
														onError={e => {
															e.target.onerror = null;
															e.target.src = '';
															setImgSrc(false);
														}}
													/>
												</div>
											)}
											{props.viewicon && (
												<div className="col-sm-4">
													<label className="d-block">Category Icon Image</label>
													<img src={iconName} alt="imgPerview" />
												</div>
											)}
										</div>
										{(props.addicon || props.editicon) && (
											<button className="btn btn-sm mt-20" onClick={onSubmit}>
												{props.addicon ? 'Add New Icon' : 'Update Icon'}
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
		iconState: state.categoryIcon
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addIcon: name => dispatch(actions.addCategoryIcon(name)),
		clearState: () => dispatch(actions.clearStateIcons()),
		getIcon: id => dispatch(actions.getCategoryIcon(id)),
		updateIcon: (id, name) => dispatch(actions.editCategoryIcon(id, name))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CategoryIcon);
