/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './AddCoupon.css';

import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AddCoupon = props => {
	const couponID = props.match.params.id
		? props.match.params.id
		: new URLSearchParams(props.location.search).get('id');
	const [couponName, setCouponName] = useState('');
	const [couponType, setCouponType] = useState('percent');
	const [expiresIn, setExpiresIn] = useState('');
	const [expiresDate, setExpiresDate] = useState('');
	const [value, setValue] = useState('1');
	const [errors, setErrors] = useState({
		name: '',
		type: '',
		expiresIn: '',
		value: ''
	});

	useEffect(() => {
		if(props.view || props.edit) {
			props.getCoupon(couponID, props.history.push);
		}
	}, [])

	useEffect(() => {
		if (Object.keys(props.coupon.couponData).length > 0) {
			setCouponName(props.coupon.couponData.name);
			setCouponType(props.coupon.couponData.type);
			props.add && setExpiresIn(props.coupon.couponData.expiresIn);
			!props.add && setExpiresDate(props.coupon.couponData.exparationDate);
			setValue(props.coupon.couponData.value);
		}
	}, [props.coupon.couponData]);

	useEffect(() => {
		if (Object.keys(props.coupon.errors).length > 0) {
			setErrors({ ...props.coupon.errors });
		}
	}, [props.coupon.errors]);

	const submitData = e => {
		e.preventDefault();
		const data = { name: couponName, type: couponType, expiresIn, value };
		props.add && props.addCoupon(data, props.history.push);
		props.edit && props.updateCoupon(couponID, couponType, expiresIn, value, props.history.push);
		setCouponName('');
		setCouponType('');
		setExpiresIn('');
		setValue('');
		setErrors({ name: '', type: '', expiresIn: '', value: '' });
	};

	console.log(props.coupon.couponData);

	return (
		<div className={'AdminProfile row'}>
			{props.coupon.failedMessage && (
				<ResponseMessage
					message={props.coupon.failedMessage}
					ClassName="Danger"
				/>
			)}
			{props.coupon.successMessage && (
				<ResponseMessage message={props.coupon.successMessage} />
			)}
			<div className={'col-12 mb-30'}>
				<div className="Card card text-white">
					<div className="card-header">
						{props.add && <h4 className="text-white">Add Coupon Code</h4>}
						{!props.add && <h4 className="text-white">Coupon: {couponID}</h4>}
					</div>
					<div className="card-body">
						<div className="col-12">
							<form>
								<div className="row">
									<div className="col-12">
										<label className="text-white">Coupon Code</label>
										<LoginRegisterInputs
											type="text"
											placeholder="Coupon Code"
											inputClass="form-control"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={couponName}
											onChange={props.add ? e => setCouponName(e.target.value) : () =>{}}
											error={errors.name ? errors.name : ''}
											disabled={!props.add ? true : false}
										/>
									</div>
									<div className="col-12">
										<label className="text-white d-block">Coupon Type</label>
										<select
											className={errors.type ? 'select invalid' : 'select'}
											onChange={!props.view ? e => setCouponType(e.target.value) : () => {}}
											disabled={props.view ? true : false}>
											<option value="percent">Percentage</option>
											<option value="value">Value</option>
										</select>
										{errors.type && (
											<div className={'invalid-feedback'}>{errors.type}</div>
										)}
									</div>
									{!props.add && 
										<div className='col-12 mt-3'>
											<label>Exparation Date: {new Date(expiresDate).toString().slice(0, 15)}</label>
										</div>
									}
									<div className="col-12 mt-3">
										<label className="text-white d-block">Expires In</label>
										<select
											className={errors.expiresIn ? 'select invalid' : 'select'}
											onChange={!props.view ? e => setExpiresIn(e.target.value) : () => {}}
											disabled={props.view ? true : false}>
											<option value="1">A day</option>
											<option value="2">Two day's</option>
											<option value="3">Three day's</option>
											<option value="4">Four day's</option>
											<option value="5">Five day's</option>
											<option value="6">Six day's</option>
											<option value="7">Seven day's</option>
											<option value="8">Eight day's</option>
											<option value="9">Nine day's</option>
											<option value="10">Ten day's</option>
											<option value="20">Twenty day's</option>
											<option value="30">Thirty day's</option>
											<option value="40">Forty day's</option>
											<option value="50">Fifty day's</option>
											<option value="60">Sixty day's</option>
										</select>
										{errors.expiresIn && (
											<div className="invalid-feedback">{errors.expiresIn}</div>
										)}
									</div>
									<div className="col-12 mt-3">
										<label className="text-white d-block">Value</label>
										{couponType === 'percent' ? (
											<input
												className={
													errors.value ? 'form-control invalid' : 'form-control'
												}
												name="value"
												type="number"
												min="1"
												max="100"
												placeholder="Enter percentage value"
												value={value}
												onChange={!props.view ? e => setValue(e.target.value) : () => {}}
												disabled={props.view ? true : false}
											/>
										) : (
											<input
												className={
													errors.value ? 'form-control invalid' : 'form-control'
												}
												name="value"
												type="number"
												min="1"
												placeholder="Enter money value"
												value={value}
												onChange={!props.view ? e => setValue(e.target.value) : () => {}}
												disabled={props.view ? true : false}
											/>
										)}
										{errors.value && (
											<div className={'invalid-feedback'}>{errors.value}</div>
										)}
									</div>
								</div>
								{!props.view && 
									<button className="btn btn-sm mt-20" onClick={submitData}>
										{props.add ? 'Add New Coupon Code' : 'Update Coupon'}
									</button>
								}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		coupon: state.coupon
	};
};

const maDispatchToProps = dispatch => {
	return {
		addCoupon: (data, callBack) => dispatch(actions.addCoupon(data, callBack)),
		getCoupon: (id, callBack) => dispatch(actions.getCoupon(id, callBack)),
		updateCoupon: (id, type, expiresIn, value, callBack) => dispatch(actions.updateCoupon(id, type, expiresIn, value, callBack))
	};
};

export default connect(
	mapStateToProps,
	maDispatchToProps
)(AddCoupon);
