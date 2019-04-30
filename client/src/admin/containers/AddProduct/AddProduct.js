import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import './AddProduct.css';
import Clothing from './Clothing/Clothing';
import EditorMNCE from '../../components/UI/Editor/Editor';
import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ToggleSwitchButton from '../../components/UI/Buttons/ToggleSwitchButton';
import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';

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
			placeholder: 'Enter Product Price',
			min: '0'
		},
		{
			label: 'Release Year',
			type: 'number',
			name: 'year',
			placeholder: 'Enter Release Year',
			min: '1000',
			max: new Date().getFullYear()
		}
	]);

	const [inputs, setInputs] = useState({
		name: '',
		price: '',
		year: '',
		brand: '',
		category: ''
	});
	const [errors, setErrors] = useState({ name: '', price: '', year: '' });
	const [published, setPublished] = useState(false);
	const [subcategories, setSubcategories] = useState([]);
	const [options, setOptions] = useState([]);
	const [smallDesc, setSmallDesc] = useState('');
	const [desc, setDesc] = useState('');

	const [showPerview, setShowPerview] = useState(false);
	const [failedMessage, setFailedMessage] = useState(false);

	useEffect(() => {
		props.getCategories();
	}, []);

	useEffect(() => {
		if (props.product.failedMessage || props.product.errors) {
			const data = props.product.productData;
			setInputs({
				name: data.name,
				price: data.price,
				year: data.year,
				brand: data.brand,
				category: data.category
			});
			setPublished(data.published);
			setSmallDesc(data.smalldescription);
			setDesc(data.description);
			setOptions(data.options);
		}
		if (props.product.errors) {
			setErrors(props.product.errors);
		}
	}, [props.product.errors, props.product.failedMessage]);

	useEffect(() => {
		setErrors({ ...errors, name: props.product.errorName });
	}, [props.product.errorName]);

	const inputChange = e => {
		if (e.target.name === 'category') {
			props.getBrandByCategory(e.target.value);
			setOptions([]);
			setSubcategories([]);
		}
		if (e.target.name === 'name') {
			props.checkProductName(e.target.value);
		}
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const subcategoriesChange = (e, subName, sub) => {
		const newSubcategories = [...subcategories];
		const findIndex = newSubcategories.findIndex(
			cat => cat.subName === subName
		);
		const findSubName = newSubcategories.find(cat => cat.subName === subName);
		if (e.target.checked) {
			if (!findSubName && findIndex === -1) {
				newSubcategories.push({ subName, sub: [sub] });
			} else {
				newSubcategories[findIndex].sub.push(sub);
			}
		} else {
			const findIndexSub = newSubcategories[findIndex].sub.findIndex(
				cat => cat === sub
			);
			newSubcategories[findIndex].sub.splice(findIndexSub, 1);
			if (newSubcategories[findIndex].sub.length === 0) {
				newSubcategories.splice(findIndex, 1);
			}
		}
		setSubcategories(newSubcategories);
	};

	const changeOptions = data => {
		setOptions(data);
	};

	const handleFinalizeOptions = data => {
		setOptions(data);
		setShowPerview(true);
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
		formData.append('description', desc);
		formData.append('smalldescription', smallDesc);
		formData.append('subcategories', JSON.stringify(subcategories));
		formData.append('options', JSON.stringify(newOptions));
		const config = { headers: { 'content-type': 'multipart/form-data' } };
		props.addProduct(formData, config);
		setInputs({ name: '', price: '', year: '', brand: '', category: '' });
		setErrors({ name: '', price: '', year: '' });
		setPublished(false);
		setSubcategories([]);
		setOptions([]);
		setSmallDesc('');
		setDesc('');
		setShowPerview(false);
		setFailedMessage(false);
	};

	return (
		<div className="row adminAddProduct">
			{failedMessage && (
				<ResponseMessage message={failedMessage} ClassName="Danger" />
			)}
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
											min={input.min ? input.min : false}
											max={input.max ? input.max : false}
											onChange={inputChange}
											required={true}
											error={errors[input.name]}
										/>
									))}
									<div className="col-sm-6">
										<ToggleSwitchButton
											name="Publish"
											value={published}
											setValue={setPublished}
											error={errors['published']}
										/>
									</div>
								</div>
								<EditorMNCE
									change={setSmallDesc}
									value={smallDesc}
									init={{
										format: 'html',
										menubar: false,
										statusbar: false,
										toolbar: 'bold italic',
										height: '100px',
										resize: false
									}}
									label="Short Description"
									error={errors.smalldescription}
								/>
								<EditorMNCE
									change={setDesc}
									value={desc}
									init={{
										statusbar: false,
										plugins:
											'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help formatpainter permanentpen mentions linkchecker',
										toolbar:
											'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat ',
										height: '600px',
										resize: false
									}}
									label="Description"
									error={errors.description}
								/>
								{!props.product.loading && (
									<div className="form-group">
										<label className="col-12">Select Category</label>
										<div className="col-12">
											<select
												name="category"
												className="w-100 p-3"
												onChange={inputChange}
												value={inputs.category}
												disabled={showPerview === true ? true : false}
												required>
												<option value="" hidden>
													Select Category
												</option>
												{props.categories.map((category, index) => (
													<option value={category.name} key={index}>
														{category.name}
													</option>
												))}
											</select>
											{errors.category && (
												<div
													style={{
														width: ' 100%',
														marginTop: '0.25rem',
														fontSize: '80%',
														color: '#dc3545'
													}}>
													{errors.category}
												</div>
											)}
										</div>
									</div>
								)}
								{inputs.category && (
									<div className="form-group">
										<label className="col-12">Select Sub Category</label>
										<div className="col-12 checkbox-wrapper">
											{props.categories.map(
												(category, index) =>
													category.name === inputs.category && (
														<React.Fragment key={index}>
															{errors.subcategories && (
																<div
																	style={{
																		width: ' 100%',
																		marginTop: '0.25rem',
																		fontSize: '80%',
																		color: '#dc3545'
																	}}>
																	{errors.subcategories[0].subName}
																	<br />
																	{errors.subcategories[0].sub}
																</div>
															)}
															{category.subcategories.map((subname, index) => (
																<div
																	className="d-flex flex-column mt-3 mr-3"
																	key={index}>
																	<label className="d-block">
																		{subname.name}
																	</label>
																	{subname.subcategories.map((sub, index) => (
																		<div className="checkbox" key={index}>
																			<input
																				type="checkbox"
																				onChange={e =>
																					subcategoriesChange(
																						e,
																						subname.name,
																						sub
																					)
																				}
																			/>
																			<label>{sub}</label>
																		</div>
																	))}
																</div>
															))}
														</React.Fragment>
													)
											)}
										</div>
									</div>
								)}
								<div className="form-group m-0 mb-3">
									<label className="col-12">Select Brand</label>
									<div className="col-12">
										<select
											name="brand"
											className="w-100 p-3"
											onChange={inputChange}
											value={inputs.brand}
											required
											placeholder="Select Brand">
											<option value="" hidden>
												Select Brand
											</option>
											{props.brands.map(brand => (
												<option value={brand.name} key={brand._id}>
													{brand.name}
												</option>
											))}
										</select>
										{errors.brand && (
											<div
												style={{
													width: ' 100%',
													marginTop: '0.25rem',
													fontSize: '80%',
													color: '#dc3545'
												}}>
												{errors.brand}
											</div>
										)}
									</div>
								</div>
								{/* <div dangerouslySetInnerHTML={{ __html: smallDesc }} contentEditable={true}/> */}
								{options.length > 0 && showPerview && (
									<button className="btn btn-primary" type="submit">
										Add Product
									</button>
								)}
							</form>
							{inputs.category === 'Clothing' && !showPerview && (
								<Clothing
									changeOptions={changeOptions}
									setOptions={handleFinalizeOptions}
									options={options.length > 0 ? options : []}
									errors={errors.options}
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
		checkProductName: name => dispatch(actions.checkProductName(name)),
		addProduct: (formData, config) =>
			dispatch(actions.addProduct(formData, config))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddProduct);
