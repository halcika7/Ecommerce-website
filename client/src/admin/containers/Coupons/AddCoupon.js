import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './AddCoupon.css';

import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AddCoupon = props => {
	const [couponName, setCouponName] = useState('');
	const [couponType, setCouponType] = useState('percent');
	const [expiresIn, setExpiresIn] = useState('');
	const [value, setValue] = useState('1');
	const [errors, setErrors] = useState({
		name: '',
		type: '',
		expiresIn: '',
		value: ''
	});

	useEffect(() => {
		if (Object.keys(props.coupon.couponData).length > 0) {
			setCouponName(props.coupon.couponData.name);
			setCouponType(props.coupon.couponData.type);
			setExpiresIn(props.coupon.couponData.expiresIn);
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
		props.addCoupon(data);
		setCouponName('');
		setCouponType('');
		setExpiresIn('');
		setValue('');
		setErrors({ name: '', type: '', expiresIn: '', value: '' });
	};

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
						<h4 className="text-white">Add Coupon Code</h4>
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
											onChange={e => setCouponName(e.target.value)}
											error={errors.name ? errors.name : ''}
										/>
									</div>
									<div className="col-12">
										<label className="text-white d-block">Coupon Type</label>
										<select
											className={errors.type ? 'select invalid' : 'select'}
											onChange={e => setCouponType(e.target.value)}>
											<option value="percent">Percentage</option>
											<option value="value">Value</option>
										</select>
										{errors.type && (
											<div className={'invalid-feedback'}>{errors.type}</div>
										)}
									</div>
									<div className="col-12 mt-3">
										<label className="text-white d-block">Expires In</label>
										<select
											className={errors.expiresIn ? 'select invalid' : 'select'}
											onChange={e => setExpiresIn(e.target.value)}>
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
												onChange={e => setValue(e.target.value)}
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
												onChange={e => setValue(e.target.value)}
											/>
										)}
										{errors.value && (
											<div className={'invalid-feedback'}>{errors.value}</div>
										)}
									</div>
								</div>
								<button className="btn btn-sm mt-20" onClick={submitData}>
									Add New Coupon Code
								</button>
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
		addCoupon: data => dispatch(actions.addCoupon(data))
	};
};

export default connect(
	mapStateToProps,
	maDispatchToProps
)(AddCoupon);
