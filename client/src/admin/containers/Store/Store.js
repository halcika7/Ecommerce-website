import React, { useState, useEffect, lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Geocode from 'react-geocode';
import './Store.css';

const SmallSpinner = lazy(() =>
	import('../../../users/components/UI/SmallSpinner/SmallSpinner')
);
const UploadPicture = lazy(() =>
	import('../../components/UI/UploadPicture/UploadPicture')
);
const ResponseMessage = lazy(() =>
	import('../../../users/components/UI/ResponseMessages/ResponseMessages')
);

const Store = props => {
	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [formatedAddress, setFormatedAddress] = useState('');
	const [location, setLocation] = useState({});
	const [weekdayFrom, setWeekdayFrom] = useState('');
	const [weekdayTo, setWeekdayTo] = useState('');
	const [saturdayFrom, setSaturdayFrom] = useState('');
	const [saturdayTo, setSaturdayTo] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [fb, setFB] = useState('');
	const [inst, setInst] = useState('');
	const [tw, setTw] = useState('');
	const [picture, setPicture] = useState('');
	const [errors, setErrors] = useState({
		address: '',
		email: '',
		facebook: '',
		instagram: '',
		twitter: '',
		phone: '',
		picture: '',
		satHoursFrom: '',
		satHoursTo: '',
		weekHoursFrom: '',
		weekHoursTo: ''
	});
	const [predefinedNotfile, setPredefinedNotFile] = useState(false);

	useEffect(() => {
		!props.addstore &&
			props.getStore(new URLSearchParams(props.location.search).get('id'));
		!props.addstore && setPredefinedNotFile(true);
	}, []);

	useEffect(() => {
		if (Object.keys(props.stores.storeData).length > 0) {
			setFormatedAddress(props.stores.storeData.options.address);
			setEmail(props.stores.storeData.options.email);
			setCity(props.stores.storeData.options.city);
			setLocation(props.stores.storeData.options.location);
			setCountry(props.stores.storeData.options.country);
			setWeekdayFrom(props.stores.storeData.options.weekHours.from);
			setWeekdayTo(props.stores.storeData.options.weekHours.to);
			setSaturdayFrom(
				props.stores.storeData.options.satHours
					? props.stores.storeData.options.satHours.from
					: props.stores.storeData.options.saturdayHours.from
			);
			setSaturdayTo(
				props.stores.storeData.options.satHours
					? props.stores.storeData.options.satHours.to
					: props.stores.storeData.options.saturdayHours.to
			);
			setPhone(props.stores.storeData.options.phone);
			setFB(props.stores.storeData.options.links.facebook);
			setInst(props.stores.storeData.options.links.instagram);
			setTw(props.stores.storeData.options.links.twitter);
			setPicture(
				props.stores.storeData.picture
					? props.stores.storeData.picture
					: props.stores.storeData.options.picture
			);
			!props.addstore && setPredefinedNotFile(true);
		}
	}, [props.stores.storeData]);

	useEffect(() => {
		if (Object.keys(props.stores.errors).length > 0) {
			setErrors({ ...props.stores.errors });
		}
		!props.addstore && setPredefinedNotFile(true);
	}, [props.stores.storeData.errors]);

	const inputsOnChange = e => {
		Geocode.setApiKey('AIzaSyC_QxC3TKyIztA007dIVlW--13LoJZTjRM');

		setAddress(e.target.value);
		Geocode.fromAddress(e.target.value).then(
			response => {
				setFormatedAddress(response.results[0].formatted_address);
				setCountry(
					response.results[0].address_components[
						response.results[0].address_components.length - 2
					].long_name
				);
				setLocation(response.results[0].geometry.location);
				response.results[0].address_components.forEach(add => {
					if (add.types[0] === 'locality') {
						setCity(add.long_name);
					}
				});
			},
			err => {
				setFormatedAddress('');
				setCountry('');
				setCity('');
				setLocation({});
			}
		);
	};

	const setFeaturedPicture = (name, file) => setPicture(file);

	const onFormSubmit = e => {
		e.preventDefault();
		const storeObject = {
			address: formatedAddress,
			country,
			city,
			location,
			weekHours: { from: weekdayFrom, to: weekdayTo },
			satHours: { from: saturdayFrom, to: saturdayTo },
			email,
			phone,
			links: { facebook: fb, instagram: inst, twitter: tw }
		};
		const formData = new FormData();
		formData.append('picture', picture);
		formData.append('options', JSON.stringify(storeObject));
		props.edit &&
			formData.append(
				'id',
				new URLSearchParams(props.location.search).get('id')
			);
		const config = { headers: { 'content-type': 'multipart/form-data' } };
		props.addstore && props.addStore(formData, config);
		props.edit && props.updateStore(formData, config);
		setFormatedAddress('');
		setEmail('');
		setCountry('');
		setCity('');
		setWeekdayFrom('');
		setWeekdayTo('');
		setSaturdayFrom('');
		setSaturdayTo('');
		setPhone('');
		setFB('');
		setInst('');
		setTw('');
		setPredefinedNotFile(false);
	};

	const timeChange = (e, change) => {
		if (change === 'weekfrom') {
			setWeekdayFrom(e.target.value);
		}
		if (change === 'weekto') {
			setWeekdayTo(e.target.value);
		}
		if (change === 'satfrom') {
			setSaturdayFrom(e.target.value);
		}
		if (change === 'satto') {
			setSaturdayTo(e.target.value);
		}
	};

	console.log(picture);

	return (
		<div className={'AdminProfile row'}>
			{props.stores.notFound && <Redirect to="/admindashboard/404" />}
			{props.stores.failedMessage && (
				<ResponseMessage
					message={props.stores.failedMessage}
					ClassName="Danger"
				/>
			)}
			{props.stores.successMessage && (
				<ResponseMessage message={props.stores.successMessage} />
			)}
			<div className={'col-12 mb-30'}>
				{props.stores.loading ? (
					<div className={'card bg-white'}>
						<SmallSpinner />
					</div>
				) : (
					<React.Fragment>
						<div className="Card card text-white">
							<div className="card-header">
								{props.addstore && <h4 className="text-white">Add Store</h4>}
								{props.view && <h4 className="text-white">Perview Store</h4>}
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
										<div className="row">
											<div className="col-12">
												<div className="form-group">
													<label>Address</label>
													<input
														name="address"
														onChange={inputsOnChange}
														placeholder="Enter Address"
														className={
															errors.address
																? 'invalid form-control'
																: 'form-control'
														}
														disabled={props.view ? true : false}
														value={
															props.view || props.errors
																? formatedAddress
																: address
														}
													/>
													{errors.address && (
														<div className="invalid-feedback mb-4">
															{errors.address}
														</div>
													)}
												</div>
											</div>
											{(formatedAddress || !props.addstore) && (
												<div className="col-12 col-sm-4">
													<label>Formated Address</label>
													<input
														className="form-control"
														disabled
														type="text"
														value={formatedAddress}
													/>
												</div>
											)}
											{(city || !props.addstore) && (
												<div className="col-12 col-sm-4">
													<label>City</label>
													<input
														className="form-control"
														disabled
														type="text"
														value={city}
													/>
												</div>
											)}
											{(country || !props.addstore) && (
												<div className="col-12 col-sm-4">
													<label>Country</label>
													<input
														className="form-control"
														disabled
														type="text"
														value={country}
													/>
												</div>
											)}
										</div>
										<label>Working weekday hours</label>
										<div className="form-group">
											<div className="row">
												<div className="col-12 col-sm-6">
													<label>From</label>
													<input
														type="time"
														disabled={props.view ? true : false}
														className="form-control"
														value={weekdayFrom}
														onChange={e => timeChange(e, 'weekfrom')}
													/>
													{errors.weekHoursFrom && (
														<div className="options-error mb-4">
															{errors.weekHoursFrom}
														</div>
													)}
												</div>
												<div className="col-12 col-sm-6">
													<label>To</label>
													<input
														type="time"
														disabled={props.view ? true : false}
														className="form-control"
														value={weekdayTo}
														onChange={e => timeChange(e, 'weekto')}
													/>
													{errors.weekHoursTo && (
														<div className="options-error mb-4">
															{errors.weekHoursTo}
														</div>
													)}
												</div>
											</div>
										</div>
										<label>Working Saturday hours</label>
										<div className="form-group">
											<div className="row">
												<div className="col-12 col-sm-6">
													<label>From</label>
													<input
														type="time"
														disabled={props.view ? true : false}
														className="form-control"
														value={saturdayFrom}
														onChange={e => timeChange(e, 'satfrom')}
													/>
													{errors.satHoursFrom && (
														<div className="options-error mb-4">
															{errors.satHoursFrom}
														</div>
													)}
												</div>
												<div className="col-12 col-sm-6">
													<label>To</label>
													<input
														type="time"
														disabled={props.view ? true : false}
														className="form-control"
														value={saturdayTo}
														onChange={e => timeChange(e, 'satto')}
													/>
													{errors.satHoursTo && (
														<div className="options-error mb-4">
															{errors.satHoursTo}
														</div>
													)}
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="row">
												<div className="col-12 col-sm-6">
													<label>Email</label>
													<input
														className="form-control"
														disabled={props.view ? true : false}
														type="text"
														value={email}
														placeholder="Enter Email"
														onChange={e => setEmail(e.target.value)}
													/>
													{errors.email && (
														<div className="options-error mb-4">
															{errors.email}
														</div>
													)}
												</div>
												<div className="col-12 col-sm-6">
													<label>Phone</label>
													<input
														className="form-control"
														disabled={props.view ? true : false}
														type="tel"
														value={phone}
														placeholder="Enter Phone Number"
														onChange={e => setPhone(e.target.value)}
													/>
													{errors.phone && (
														<div className="options-error mb-4">
															{errors.phone}
														</div>
													)}
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="row">
												<div className="col-12 col-sm-4">
													<label>Facebook</label>
													<input
														className="form-control"
														disabled={props.view ? true : false}
														type="text"
														value={fb}
														placeholder="Enter Facebook Link"
														onChange={e => setFB(e.target.value)}
													/>
													{errors.facebook && (
														<div className="options-error mb-4">
															{errors.facebook}
														</div>
													)}
												</div>
												<div className="col-12 col-sm-4">
													<label>Instagram</label>
													<input
														className="form-control"
														disabled={props.view ? true : false}
														type="text"
														value={inst}
														placeholder="Enter Instagram Link"
														onChange={e => setInst(e.target.value)}
													/>
													{errors.instagram && (
														<div className="options-error mb-4">
															{errors.instagram}
														</div>
													)}
												</div>
												<div className="col-12 col-sm-4">
													<label>Twitter</label>
													<input
														className="form-control"
														disabled={props.view ? true : false}
														type="text"
														value={tw}
														placeholder="Enter Twitter Link"
														onChange={e => setTw(e.target.value)}
													/>
													{errors.twitter && (
														<div className="options-error mb-4">
															{errors.twitter}
														</div>
													)}
												</div>
											</div>
										</div>
										<UploadPicture
											change={setFeaturedPicture}
											predefinedPicture={errors.picture ? picture : false}
											predefinedPictureNotFile={
												!props.addstore && predefinedNotfile ? picture : false
											}
											disabled={props.view ? true : false}
											setPredefinedNotFile={setPredefinedNotFile}
										/>
										{errors.picture && (
											<div className="options-error">{errors.picture}</div>
										)}
										{!props.view ? (
											<button className="btn btn-sm mt-20">
												{props.addstore ? 'Add New Store' : 'Update Store'}
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
		stores: state.stores
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addStore: (formData, config) =>
			dispatch(actions.addStore(formData, config)),
		updateStore: (formData, config) =>
			dispatch(actions.updateStore(formData, config)),
		getStore: id => dispatch(actions.getStore(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Store);
