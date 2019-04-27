import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import './AddProduct.css';
import Clothing from './Clothing/Clothing';
import EditorMNCE from '../../components/UI/Editor/Editor';
import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ToggleSwitchButton from '../../components/UI/Buttons/ToggleSwitchButton';

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

	const [inputs, setInputs] = useState({ name: '', price: '', year: '' });
	const [errors, setErrors] = useState({
		name: '',
		price: '',
		year: ''
	});
	const [published, setPublished] = useState(false);
	const [subcategories, setSubcategories] = useState([]);
	const [options, setOptions] = useState([]);
	const [smallDesc, setSmallDesc] = useState(false);
	const [desc, setDesc] = useState(false);

	const [showPerview, setShowPerview] = useState(false);

	useEffect(() => {
		props.getCategories();
	}, []);

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

	const onSubmitForm = e => {
		e.preventDefault();
		const pictures = [];
		const formData = new FormData();
		const newOptions = [...options].map(option => {
			const pictures = [];
			option.pictures.forEach(picture => pictures.push(picture.name));
			return {
				...option,
				featuredPicture: option.featuredPicture.name,
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
		pictures.forEach(file => formData.append('pictures', file));
		formData.append('description', desc);
		formData.append('smalldescription', smallDesc);
		formData.append('subcategories', JSON.stringify(subcategories));
		formData.append('options', JSON.stringify(newOptions));
		const config = { headers: { 'content-type': 'multipart/form-data' } };

		props.addProduct(formData, config);
	};

	const handleFinalizeOptions = data => {
		setOptions(data);
		setShowPerview(true);
	};

	return (
		<div className="row adminAddProduct">
			<div className="col-12">
				<div className="card mb-30 text-white">
					<div className="card-body">
						{!showPerview && <h2 className="pl-3 mb-4">Add New Product</h2>}
						{showPerview && <h2 className="pl-3 mb-4">Product Review</h2>}
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
									/>
								</div>
							</div>
							<EditorMNCE
								change={setSmallDesc}
								init={{
									format: 'html',
									menubar: false,
									statusbar: false,
									toolbar: 'bold italic',
									height: '100px',
									resize: false
								}}
								label="Short Description"
							/>
							<EditorMNCE
								change={setDesc}
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
							/>
							<div className="form-group">
								<label className="col-12">Select Category</label>
								<div className="col-12">
									<select
										name="category"
										className="w-100 p-3"
										onChange={inputChange}
										defaultValue=""
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
								</div>
							</div>
							{inputs.category && (
								<div className="form-group">
									<label className="col-12">Select Sub Category</label>
									<div className="col-12 checkbox-wrapper">
										{props.categories.map(
											category =>
												category.name === inputs.category &&
												category.subcategories.map((subname, index) => (
													<div
														className="d-flex flex-column mt-3 mr-3"
														key={index}>
														<label className="d-block">{subname.name}</label>
														{subname.subcategories.map((sub, index) => (
															<div className="checkbox" key={index}>
																<input
																	type="checkbox"
																	onChange={e =>
																		subcategoriesChange(e, subname.name, sub)
																	}
																/>
																<label>{sub}</label>
															</div>
														))}
													</div>
												))
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
										defaultValue=""
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
							<Clothing setOptions={handleFinalizeOptions} />
						)}
					</div>
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
