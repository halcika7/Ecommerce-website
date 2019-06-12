import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import './AddProduct.css';
import Options from './Options/Options';
import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ToggleSwitchButton from '../../components/UI/Buttons/ToggleSwitchButton';
import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';
import SelectCategory from './SelectCategory';
import SelectSubcategory from './SelectSubcategory';
import SelectBrand from './SelectBrand';
import Editors from './Editors';

const AddProduct = props => {
	const [Inputs] = useState([
		{
			label: 'Name',
			type: 'text',
			name: 'name',
			placeholder: 'Enter Product Name'
		},
		{
			label: 'Price',
			type: 'number',
			name: 'price',
			placeholder: 'Enter Product Price'
		},
		{
			label: 'Release Year',
			type: 'number',
			name: 'year',
			placeholder: 'Enter Release Year'
		}
	]);

	const [inputs, setInputs] = useState({
		name: '',
		price: '',
		year: '',
		brand: '',
		category: '',
		optionsDiscount: ''
	});
	const [errors, setErrors] = useState({ name: '', price: '', year: '' });
	const [published, setPublished] = useState(false);
	const [featured, setFeatured] = useState(false);
	const [dailyOffer, setDailyOffer] = useState(false);
	const [weeklyOffer, setWeeklyOffer] = useState(false);
	const [subcategories, setSubcategories] = useState([]);
	const [options, setOptions] = useState([]);
	const [smallDesc, setSmallDesc] = useState('');
	const [desc, setDesc] = useState('');

	const [isBluetooth, setIsBluetooth] = useState(false);
	const [isWifi, setIsWifi] = useState(false);

	const [showPerview, setShowPerview] = useState(false);

	useEffect(() => {
		props.getCategories();
	}, []);

	useEffect(() => {
		if (props.product.failedMessage || props.product.errors) {
			const {
				name,
				price,
				year,
				brand,
				category,
				optionsDiscount,
				published,
				featured,
				weeklyOffer,
				dailyOffer,
				smalldescription,
				description,
				options,
				subcategories
			} = props.product.productData;
			setInputs({ name, price, year, brand, category, optionsDiscount });
			setPublished(JSON.parse(published));
			setFeatured(JSON.parse(featured));
			setWeeklyOffer(JSON.parse(weeklyOffer));
			setDailyOffer(JSON.parse(dailyOffer));
			setSmallDesc(smalldescription);
			setDesc(description);
			setOptions(options);
			setSubcategories(subcategories);
		}
		props.product.errors && setErrors(props.product.errors);
	}, [props.product.errors, props.product.failedMessage]);

	useEffect(() => {
		dailyOffer && setWeeklyOffer(false);
	}, [dailyOffer]);

	useEffect(() => {
		weeklyOffer && setDailyOffer(false);
	}, [weeklyOffer]);

	const inputChange = (e, value = null, inputName = null) => {
		if (e === undefined) {
			if (inputName === 'category') {
				props.getBrandByCategory(value);
				setOptions([]);
				setSubcategories([]);
				setInputs({ ...inputs, [inputName]: value, brand: '' });
			}
			inputName !== 'category' && setInputs({ ...inputs, [inputName]: value });
			return;
		}
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const subcategoriesChange = (e, subName, sub) => {
		const newSubcategories = [...subcategories],
			findIndex = newSubcategories.findIndex(cat => cat.subName === subName),
			findSubName = newSubcategories.find(cat => cat.subName === subName);
		if (inputs.category !== 'Electronics') {
			if (e.target.checked) {
				!findSubName &&
					findIndex === -1 &&
					newSubcategories.push({ subName, sub: [sub] });
				findSubName &&
					findIndex !== -1 &&
					newSubcategories[findIndex].sub.push(sub);
			} else {
				const findIndexSub = newSubcategories[findIndex].sub.findIndex(
					cat => cat === sub
				);
				newSubcategories[findIndex].sub.splice(findIndexSub, 1);
				newSubcategories[findIndex].sub.length === 0 &&
					newSubcategories.splice(findIndex, 1);
			}
		} else {
			if (e.target.checked) {
				newSubcategories[0] = { subName, sub };
			}
			setOptions([]);
		}
		setSubcategories(newSubcategories);
	};

	const changeOptions = data => setOptions(data);

	const handleFinalizeOptions = (data, finalize = true) => {
		setOptions(data);
		finalize && setShowPerview(true);
	};

	const onSubmitForm = e => {
		e.preventDefault();
		const pictures = [];
		const formData = new FormData();
		const newOptions = [...options].map(option => {
			const pictures = [];
			option.pictures.forEach(picture => pictures.push(picture.name));
			return {
				...option,
				featuredPicture: option.featuredPicture.name
					? option.featuredPicture.name
					: '',
				pictures
			};
		});
		options.forEach(option => {
			pictures.push(option.featuredPicture);
			pictures.push(...option.pictures);
		});
		for (const input in inputs) {
			formData.append(input, inputs[input]);
		}
		pictures.forEach(async file => await formData.append('pictures', file));
		formData.append('published', published);
		formData.append('featured', featured);
		formData.append('dailyOffer', dailyOffer);
		formData.append('weeklyOffer', weeklyOffer);
		formData.append('description', desc);
		formData.append('smalldescription', smallDesc);
		formData.append('subcategories', JSON.stringify(subcategories));
		if (
			subcategories[0].subName === 'Headphones' ||
			subcategories[0].subName === 'Speakers'
		) {
			formData.append('bluetooth', isBluetooth);
			formData.append('wifi', isWifi);
		}
		formData.append('options', JSON.stringify(newOptions));
		const config = { headers: { 'content-type': 'multipart/form-data' } };
		props.addProduct(formData, config, props.history.push);
		setInputs({
			name: '',
			price: '',
			year: '',
			brand: '',
			category: '',
			optionsDiscount: ''
		});
		setErrors({ name: '', price: '', year: '' });
		setPublished(false);
		setFeatured(false);
		setDailyOffer(false);
		setWeeklyOffer(false);
		setSubcategories([]);
		setOptions([]);
		setSmallDesc('');
		setDesc('');
		setShowPerview(false);
	};

	return (
		<div className="row adminAddProduct">
			{props.product.failedMessage && (
				<ResponseMessage
					message={props.product.failedMessage}
					ClassName="Danger"
				/>
			)}
			{props.product.successMessage && (
				<ResponseMessage message={props.product.successMessage} />
			)}
			<div className="col-12">
				<div className="card mb-30 text-white">
					<div className="card-header">
						{!showPerview && <h2 className="pl-3">Add New Product</h2>}
						{showPerview && <h2 className="pl-3">Product Review</h2>}
					</div>
					{props.product.loading ? (
						<div className="card-body bg-white">
							<SmallSpinner />
						</div>
					) : (
						<div className="card-body">
							<form className="form-horizontal" onSubmit={onSubmitForm}>
								<div className="form-group row m-0 mb-2">
									{Inputs.map(input => (
										<LoginRegisterInputs
											key={input.name}
											formBox="col-sm-6 mb-3"
											label={input.label}
											type={input.type}
											name={input.name}
											placeholder={input.placeholder}
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={inputs[input.name]}
											onChange={inputChange}
											required={true}
											error={errors[input.name]}
										/>
									))}
									<div className="col-sm-3">
										<ToggleSwitchButton
											name="Publish"
											value={published}
											setValue={setPublished}
											error={errors['published']}
										/>
									</div>
									<div className="col-sm-3">
										<ToggleSwitchButton
											name="Featured"
											value={featured}
											setValue={setFeatured}
											error={errors['featured']}
										/>
									</div>
								</div>
								<div className="form-group row m-0 mb-2">
									<div className="col-sm-6 mb-3">
										<ToggleSwitchButton
											name="Daily Offer"
											value={dailyOffer}
											setValue={setDailyOffer}
											error={errors['dailyOffer']}
										/>
									</div>
									<div className="col-sm-6">
										<ToggleSwitchButton
											name="Weekly Offer"
											value={weeklyOffer}
											setValue={setWeeklyOffer}
											error={errors['weeklyOffer']}
										/>
									</div>
									{(dailyOffer || weeklyOffer) && (
										<div className="col-12 mb-3">
											<LoginRegisterInputs
												label="Discount for all Product Options"
												type="number"
												name="optionsDiscount"
												placeholder="Enter discount for all Product Options"
												inputClass="w-100"
												invalidInput="invalid"
												invalidFeedback="invalid-feedback"
												value={inputs['optionsDiscount']}
												min="1"
												max="95"
												onChange={inputChange}
												required={true}
												error={errors['optionsDiscount']}
											/>
										</div>
									)}
								</div>
								<Editors
									smallChange={setSmallDesc}
									smallValue={smallDesc}
									smallLabel="Short Description"
									smallError={errors.smalldescription}
									change={setDesc}
									value={desc}
									label="Description"
									error={errors.description}
								/>
								<SelectCategory
									loading={props.product.loading}
									onChange={inputChange}
									value={inputs.category}
									disabled={showPerview}
									error={errors.category}
									categories={props.categories}
								/>
								{inputs.category && (
									<SelectSubcategory
										categories={props.categories}
										error={errors.subcategories}
										change={subcategoriesChange}
										category={inputs.category}
										subcategories={subcategories}
									/>
								)}
								{inputs.category && (
									<SelectBrand
										change={inputChange}
										value={inputs.brand}
										brands={props.brands}
										error={errors.brand}
									/>
								)}
								{inputs.category === 'Electronics' &&
									subcategories.length > 0 &&
									(subcategories[0].subName === 'Headphones' ||
										subcategories[0].subName === 'Speakers') && (
										<div className="form-group row m-0 mb-2">
											<div className="col-6">
												<ToggleSwitchButton
													name="Bluetooth"
													value={isBluetooth}
													setValue={setIsBluetooth}
													error={errors['bluetooth']}
												/>
											</div>
											<div className="col-6">
												<ToggleSwitchButton
													name="Wifi"
													value={isWifi}
													setValue={setIsWifi}
													error={errors['wifi']}
												/>
											</div>
										</div>
									)}
								{options.length > 0 && showPerview && (
									<button className="btn btn-primary" type="submit">
										Add Product
									</button>
								)}
							</form>
							{subcategories.length > 0 && !showPerview && (
								<Options
									changeOptions={changeOptions}
									setOptions={handleFinalizeOptions}
									options={options.length > 0 ? options : []}
									errors={errors.options}
									category={inputs.category}
									subcategories={subcategories}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		categories: state.category.allCategories,
		brands: state.brand.allBrands,
		product: state.product
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getCategories: () => dispatch(actions.getAllCategories()),
		getBrandByCategory: category =>
			dispatch(actions.getBrandByCategory(category)),
		addProduct: (formData, config, callBack) =>
			dispatch(actions.addProduct(formData, config, callBack))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddProduct);
