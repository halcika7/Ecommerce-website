import React, { useState, useEffect } from 'react';

import UploadPicture from '../../../components/UI/UploadPicture/UploadPicture';
import UploadPictures from '../../../components/UI/UploadPictures/UploadPictures';
import ColorsSizesComponent from './ColorsSizesComponent';
import ResponseMessage from '../../../../users/components/UI/ResponseMessages/ResponseMessages';
import LoginRegisterInputs from '../../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';

const Clothing = props => {
	const [color, setColor] = useState(false);
	const [size, setSize] = useState(false);
	const [qty, setQty] = useState('');
	const [price, setPrice] = useState('');
	const [discount, setDiscount] = useState('');
	const [singlePicture, setSinglePicture] = useState(false);
	const [multyPicture, setMultyPicture] = useState(false);

	const [options, setOptions] = useState([]);

	const [choosenColors, setChoosenColors] = useState([]);
	const [choosenSizes, setChoosenSizes] = useState([]);
	const [, setAllSizesSelected] = useState(false);

	const [failedMessage, setFailedMessage] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [showImagesChooser, setShowImagesChooser] = useState(true);

	useEffect(() => {
		const findIndex = options.findIndex(option => option.color === color);
		findIndex !== -1 && setShowImagesChooser(false);
		findIndex === -1 && setShowImagesChooser(true);
	}, [color]);

	const addOption = e => {
		e.preventDefault();
		const newOptions = [...options];
		const findOptionIndex = newOptions.findIndex(
			option => option.color === color
		);
		const newChoosenSizes = [...choosenSizes];
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
				featuredPicture: singlePicture,
				pictures: multyPicture
			});
			newChoosenSizes.push(size);
			setSinglePicture(false);
			setMultyPicture(false);
			setShowImagesChooser(false);
			successMessages('Color Option Successfuly Added !');
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
			successMessages('Size Option Successfuly added !');
		}
		setQty('');
		setPrice('');
		setDiscount('');
		setSize(false);
		setOptions(newOptions);
		setChoosenSizes(newChoosenSizes);
	};

	const finalizeOptions = e => {
		e.preventDefault();
		const newChoosenColors = [...choosenColors];
		newChoosenColors.push(color);
		setChoosenColors(newChoosenColors);
		setChoosenSizes([]);
		setColor(false);
		props.setOptions(options);
	};

	const inputOnChange = e => {
		if (parseInt(e.target.value) >= 0 && e.target.name !== 'discount') {
			e.target.name === 'qty' && setQty(e.target.value);
			e.target.name === 'aditionalPrice' && setPrice(e.target.value);
		}
		if (
			parseInt(e.target.value) >= 0 &&
			parseInt(e.target.value) <= 99 &&
			e.target.name === 'discount'
		) {
			setDiscount(e.target.value);
		}
	};

	const setFeaturedPicture = (name, file) => setSinglePicture(file);

	const allSizesSelectedChange = bool => {
		if (bool) {
			const newChooseColors = [...choosenColors];
			newChooseColors.push(color);
			setChoosenColors(newChooseColors);
			setColor(false);
		}
		setAllSizesSelected(bool);
	};

	const colorChange = color => {
		if (options.length > 0) {
			const newChoosenSizes = [];
			options.forEach(
				option =>
					option.color === color &&
					option.options.forEach(opt => newChoosenSizes.push(opt.size))
			);
			setChoosenSizes(newChoosenSizes);
		}
		setColor(color);
	};

	const failedMessages = message => {
		setFailedMessage(message);
		setTimeout(() => setFailedMessage(false), 4000);
	};

	const successMessages = message => {
		setSuccessMessage(message);
		setTimeout(() => setSuccessMessage(false), 4000);
	};

	const perviewChangeInput = (e, colorOptionIndex, optionIndex) => {
		const name = e.target.name;
		const value = parseInt(e.target.value);
		if (value >= 0 && name !== 'discount') {
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
		}
		if (value >= 0 && value <= 99 && name === 'discount') {
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
		}
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

	const removeColorOption = (e, index) => {
		e.persist();
		const newOptions = [...options];
		if (newOptions[index].color === color) {
			setChoosenSizes([]);
			setAllSizesSelected(false);
			setShowImagesChooser(true);
		}
		newOptions.splice(index, 1);
		setOptions(newOptions);
	};

	const removeSizeOption = async (e, colorIndex, sizeIndex) => {
		e.persist();
		const newOptions = [...options];
		const newChoosenColors = [...choosenColors];
		const choosenColorIndex = newChoosenColors.findIndex(
			color => newOptions[colorIndex].color === color
		);
		if (choosenColorIndex !== -1) {
			newChoosenColors.splice(choosenColorIndex, 1);
		}
		newOptions[colorIndex].options.splice(sizeIndex, 1);
		await setOptions(newOptions);
		if (color === newOptions[colorIndex].color) {
			const newChoosenSizes = [];
			options.forEach(
				option =>
					option.color === color &&
					option.options.forEach(opt => newChoosenSizes.push(opt.size))
			);
			setChoosenSizes(newChoosenSizes);
		}
		setChoosenColors(newChoosenColors);
		if (newOptions[colorIndex].options.length === 0) {
			removeColorOption(e, colorIndex);
		}
	};

	return (
		<form className="form-group mb-20" onSubmit={addOption}>
			{failedMessage && (
				<ResponseMessage message={failedMessage} ClassName="Danger" />
			)}
			{successMessage && <ResponseMessage message={successMessage} />}
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
						<UploadPicture name="featuredPicture" change={setFeaturedPicture} />
						<label className="d-block mt-4">Upload Pictures</label>
						<UploadPictures name="multyPictures" change={setMultyPicture} />
					</React.Fragment>
				)}
				{!successMessage && !failedMessage && (
					<button
						type="submit"
						className="btn btn-primary mt-4 d-block">
						Add Option
					</button>
				)}
				{options.map((option, index) => (
					<React.Fragment key={index}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								pointerEvents: 'none'
							}}
							className="mt-5">
							Color:{' '}
							<span style={{ marginRight: '5px', marginLeft: '5px' }}>
								{option.color}
							</span>
							<span
								style={{
									width: '20px',
									height: '20px',
									background: `${option.color.toLowerCase()}`,
									display: 'inline-block',
									marginRight: '10px',
									marginLeft: '5px',
									borderRadius: '50% '
								}}
							/>
							<button
								className="btn btn-danger btn-sm"
								style={{ pointerEvents: 'all' }}
								type="button"
								onClick={e => removeColorOption(e, index)}>
								Delete Color Option
							</button>
						</label>
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
									label={'Aditional Price'}
									type="number"
									name="aditionalPrice"
									placeholder="Enter Aditional Price"
									inputClass="w-100"
									invalidInput="invalid"
									invalidFeedback="invalid-feedback"
									value={opt.aditionalPrice}
									min="0"
									onChange={e => perviewChangeInput(e, index, i)}
								/>
								<LoginRegisterInputs
									formBox="col-sm-6 mt-3 mb-3"
									label={'Discount'}
									type="number"
									name="discount"
									placeholder="Enter Discount"
									inputClass="w-100"
									invalidInput="invalid"
									invalidFeedback="invalid-feedback"
									value={opt.discount}
									min="0"
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
									index={index}
								/>
							</div>
							<div className="col-12 mb-3">
								<label className="d-block">Feature Option Pictures</label>
								<UploadPictures
									name="multyPictures"
									change={changeOptionPictures}
									index={index}
									predefinedPictures={option.pictures}
								/>
							</div>
						</div>
					</React.Fragment>
				))}
				{options.length > 0 && !failedMessage && !successMessage && (
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
