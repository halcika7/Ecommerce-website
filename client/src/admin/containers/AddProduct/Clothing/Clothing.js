import React, { useState, useEffect } from 'react';

import UploadPicture from '../../../components/UI/UploadPicture/UploadPicture';
import UploadPictures from '../../../components/UI/UploadPictures/UploadPictures';
import ColorsSizesComponent from './ColorsSizesComponent';
import ResponseMessage from '../../../../users/components/UI/ResponseMessages/ResponseMessages';
import LoginRegisterInputs from '../../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';

const Clothing = props => {
	const [color, setColor] = useState('');
	const [size, setSize] = useState('');
	const [qty, setQty] = useState('');
	const [price, setPrice] = useState('');
	const [discount, setDiscount] = useState('');
	const [singlePicture, setSinglePicture] = useState(false);
	const [multyPicture, setMultyPicture] = useState(false);

	const [options, setOptions] = useState([]);

	const [choosenColors, setChoosenColors] = useState([]);
	const [choosenSizes, setChoosenSizes] = useState([]);
	const [, setAllSizesSelected] = useState(false);

	const [showButton, setShowButton] = useState(true);
	const [failedMessage, setFailedMessage] = useState(false);
	const [showImagesChooser, setShowImagesChooser] = useState(true);

	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const findIndex = options.findIndex(option => option.color === color);
		findIndex !== -1 && setShowImagesChooser(false);
		findIndex === -1 && setShowImagesChooser(true);
		choosenSizesHelper();
	}, [color]);

	useEffect(() => {
		if (props.options) {
			const newChoosenColors = [...choosenColors];
			props.options.forEach(option => {
				const findInChoosenColors = newChoosenColors.find(
					color => color === option.color
				);
				if (option.options.length === 10 && !findInChoosenColors) {
					newChoosenColors.push(option.color);
				}
				const findIndexChoosenColors = newChoosenColors.findIndex(
					color => color === option.color
				);
				if (option.options.length !== 10 && findIndexChoosenColors) {
					newChoosenColors.splice(findIndexChoosenColors, option.color);
				}
			});
			setChoosenColors(newChoosenColors);
			setOptions(props.options);
		}
	}, [props.options]);

	useEffect(() => {
		if (props.errors) {
			setErrors(props.errors);
		}
	}, [props.errors]);

	const addOption = e => {
		e.preventDefault();
		const newOptions = [...options],
			findOptionIndex = newOptions.findIndex(option => option.color === color),
			newChoosenSizes = [...choosenSizes];
		if (!size) {
			failedMessages('Please provide Product Size');
			return;
		}
		if (!color) {
			failedMessages('Please provide Product Color');
			return;
		}
		if (findOptionIndex === -1) {
			if (!singlePicture) {
				failedMessages("You didn't choose any fetured picture for option");
				return;
			}
			if (!multyPicture) {
				failedMessages("You didn't choose any pictures for option");
				return;
			}
			newOptions.push({
				color,
				options: [
					{ quantity: +qty, aditionalPrice: +price, discount: +discount, size }
				],
				featuredPicture: singlePicture ? singlePicture : '',
				pictures: multyPicture
			});
			newChoosenSizes.push(size);
			setSinglePicture(false);
			setMultyPicture(false);
			setShowImagesChooser(false);
		} else {
			const findSize = newOptions[findOptionIndex].options.find(
				option => option.size === size
			);
			if (findSize) {
				failedMessages('You added that option');
				return;
			}
			newOptions[findOptionIndex].options.push({
				quantity: +qty,
				aditionalPrice: +price,
				discount: +discount,
				size
			});
			newChoosenSizes.push(size);
		}
		setQty('');
		setPrice('');
		setDiscount('');
		setSize('');
		setOptions(newOptions);
		setChoosenSizes(newChoosenSizes);
	};

	const finalizeOptions = e => {
		e.preventDefault();
		const newChoosenColors = [...choosenColors];
		newChoosenColors.push(color);
		setChoosenColors(newChoosenColors);
		setChoosenSizes([]);
		setColor('');
		props.setOptions(options);
	};

	const inputOnChange = e => {
		const name = e.target.name,
			value = parseInt(e.target.value);
		if (value >= 0 && name !== 'discount') {
			name === 'qty' && setQty(value);
			name === 'aditionalPrice' && setPrice(value);
		}
		if (value >= 0 && value <= 99 && name === 'discount') {
			setDiscount(value);
		}
	};

	const setFeaturedPicture = (name, file) => setSinglePicture(file);

	const allSizesSelectedChange = bool => {
		const newChooseColors = [...choosenColors];
		if (bool) {
			newChooseColors.push(color);
			setChoosenColors(newChooseColors);
			setColor('');
		}
		setAllSizesSelected(bool);
	};

	const colorChange = color => {
		setColor(color);
	};

	const choosenSizesHelper = () => {
		const newChoosenSizes = [];
		options.forEach(
			option =>
				option.color === color &&
				option.options.forEach(opt => newChoosenSizes.push(opt.size))
		);
		setChoosenSizes(newChoosenSizes);
	};

	const removeSizeOption = (e, colorIndex, sizeIndex) => {
		e.preventDefault();
		const newOptions = [...options],
			newChoosenColors = [...choosenColors],
			choosenColorIndex = newChoosenColors.findIndex(
				color => newOptions[colorIndex].color === color
			);
		if (choosenColorIndex !== -1) {
			newChoosenColors.splice(choosenColorIndex, 1);
		}
		newOptions[colorIndex].options.splice(sizeIndex, 1);
		if (newOptions[colorIndex].options.length === 0) {
			newOptions.splice(colorIndex, 1);
			setColor('');
		}
		setChoosenColors(newChoosenColors);
		choosenSizesHelper();
		setOptions(newOptions);
		props.changeOptions(newOptions);
	};

	const perviewChangeInput = (e, colorOptionIndex, optionIndex) => {
		const name = e.target.name,
			value = parseInt(e.target.value);
		if (value >= 0 && name !== 'discount') {
			helperPerviewChangeInput(name, value, colorOptionIndex, optionIndex);
		}
		if (value >= 0 && value <= 99 && name === 'discount') {
			helperPerviewChangeInput(name, value, colorOptionIndex, optionIndex);
		}
	};

	const helperPerviewChangeInput = (
		name,
		value,
		colorOptionIndex,
		optionIndex
	) => {
		const changedValue = options.map((option, index) => {
			if (index === colorOptionIndex) {
				const options = option.options.map((opt, index) =>
					index === optionIndex ? { ...opt, [name]: value } : opt
				);
				const newOption = { ...option, options };
				return newOption;
			}
			return option;
		});
		setOptions(changedValue);
	};

	const changeOptionPicture = (file, index) => {
		const changedOptionFeaturedPicture = options.map((option, i) =>
			i === index ? { ...option, featuredPicture: file } : option
		);
		setOptions(changedOptionFeaturedPicture);
	};

	const changeOptionPictures = (files, index) => {
		const changedOptionPictures = options.map((option, i) => {
			if (i === index) {
				option.pictures.slice(0);
				option.pictures.concat(files);
			}
			return option;
		});
		setOptions(changedOptionPictures);
	};

	const failedMessages = message => {
		setFailedMessage(message);
		setTimeout(() => setFailedMessage(false), 4000);
	};

	return (
		<form className="form-group mb-20" onSubmit={addOption}>
			{failedMessage && (
				<ResponseMessage message={failedMessage} ClassName="Danger" />
			)}
			<div className="row m-0">
				<div className="col-sm-6">
					<label className="">Select Color</label>
					<ColorsSizesComponent
						isValid={color}
						setColor={colorChange}
						color={true}
						choosenColors={choosenColors}
						value={color}
					/>
				</div>
				<div className="col-sm-6">
					<label className="">Select Size</label>
					<ColorsSizesComponent
						isValid={size}
						setSize={setSize}
						sizes={true}
						choosenSizes={choosenSizes}
						value={size}
						setAllSizesSelected={allSizesSelectedChange}
					/>
				</div>
			</div>
			<div className="col-12 mb-4">
				<div className="row">
					<div className="col-md-4 mb-3">
						<label className="mb-2">Enter Quantity</label>
						<input
							type="number"
							className="w-100"
							placeholder="Enter Option Quantity"
							name="qty"
							onChange={inputOnChange}
							value={qty}
							min="1"
							required
						/>
					</div>
					<div className="col-md-4 mb-3">
						<label className="mb-2">Enter Aditional Price</label>
						<input
							type="number"
							className="w-100"
							placeholder="Enter Option Aditional Price"
							name="aditionalPrice"
							onChange={inputOnChange}
							value={price}
							min="0"
							required
						/>
					</div>
					<div className="col-md-4 mb-3">
						<label className="mb-2">Enter Discount</label>
						<input
							type="number"
							className="w-100"
							placeholder="Enter Option Discount"
							name="discount"
							onChange={inputOnChange}
							value={discount}
							min="0"
							required
						/>
					</div>
				</div>
				{showImagesChooser && (
					<React.Fragment>
						<label className="d-block">Featured Picture</label>
						<UploadPicture name="featuredPicture" change={setFeaturedPicture} showButton={setShowButton}/>
						<label className="d-block mt-4">Upload Pictures</label>
						<UploadPictures name="multyPictures" change={setMultyPicture} showButton={setShowButton}/>
					</React.Fragment>
				)}
				{!failedMessage && showButton && (
					<button type="submit" className="btn btn-primary mt-4 d-block">
						Add Option
					</button>
				)}
				<div className="accordion" id="accordionExample">
					{options.map((option, index) => (
						<div key={index}>
							<label
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									cursor: 'pointer'
								}}
								className="mt-3 mb-3"
								data-toggle="collapse"
								data-target={'#' + index}
								data-tooltip={`Click to show ${option.color &&
									option.color.toLowerCase()} options`}>
								Color:{' '}
								<span style={{ marginRight: '5px', marginLeft: '5px' }}>
									{' '}
									{option.color}{' '}
								</span>
								<span
									style={{
										width: '20px',
										height: '20px',
										background: `${option.color && option.color.toLowerCase()}`,
										display: 'inline-block',
										marginRight: '10px',
										marginLeft: '5px',
										borderRadius: '50% '
									}}
								/>
							</label>
							{errors[index] && errors[index].color && (
								<div
									style={{
										width: ' 100%',
										marginTop: '0.25rem',
										fontSize: '80%',
										color: '#dc3545'
									}}>
									{errors[index].color}
								</div>
							)}
							<div
								id={index}
								className="collapse"
								data-parent="#accordionExample"
								style={{
									maxHeight: '400px',
									overflowY: 'auto',
									overflowX: 'hidden',
									paddingRight: '10px'
								}}>
								{option.options.map((opt, i) => (
									<div
										className="form-group row m-0 mb-4"
										key={i}
										style={{
											border: '1px solid #4f9ae6',
											padding: '10px',
											borderRadius: '.4285rem'
										}}>
										<div className="col-12">
											<button
												className="btn btn-sm btn-danger"
												type="button"
												onClick={e => removeSizeOption(e, index, i)}>
												Delete Size Option
											</button>
										</div>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label="Aditional Price"
											type="number"
											name="aditionalPrice"
											placeholder="Enter Aditional Price"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.aditionalPrice}
											min="0"
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].aditionalPrice
													: ''
											}
											onChange={e => perviewChangeInput(e, index, i)}
										/>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label="Discount"
											type="number"
											name="discount"
											placeholder="Enter Discount"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.discount}
											min="0"
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].discount
													: ''
											}
											onChange={e => perviewChangeInput(e, index, i)}
										/>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label={'Quantity'}
											type="number"
											name="quantity"
											placeholder="Enter Quantity"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.quantity}
											min="1"
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].quantity
													: ''
											}
											onChange={e => perviewChangeInput(e, index, i)}
										/>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label={'Size'}
											type="text"
											name="size"
											placeholder="Enter Size"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.size}
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].size
													: ''
											}
											onChange={() => {}}
											disabled={true}
										/>
									</div>
								))}
								<div className="form-group row">
									<div className="col-12 mb-3">
										<label className="d-block">Feature Option Picture</label>
										<UploadPicture
											name="featuredPicture"
											change={changeOptionPicture}
											predefinedPicture={option.featuredPicture}
											showButton={setShowButton}
											index={index}
										/>
										{errors[index] && errors[index].featuredPicture && (
											<div
												style={{
													width: ' 100%',
													marginTop: '0.25rem',
													fontSize: '80%',
													color: '#dc3545'
												}}>
												{errors[index].featuredPicture}
											</div>
										)}
									</div>
									<div className="col-12 mb-3">
										<label className="d-block">Feature Option Pictures</label>
										<UploadPictures
											name="multyPictures"
											change={changeOptionPictures}
											index={index}
											showButton={setShowButton}
											predefinedPictures={option.pictures}
										/>
										{errors[index] && errors[index].pictures && (
											<div
												style={{
													width: ' 100%',
													marginTop: '0.25rem',
													fontSize: '80%',
													color: '#dc3545'
												}}>
												{errors[index].pictures}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				{options.length > 0 && !failedMessage && showButton && (
					<button
						type="button"
						className="btn btn-primary mt-4 d-block"
						onClick={finalizeOptions}>
						Finalize Options
					</button>
				)}
			</div>
		</form>
	);
};

export default Clothing;
