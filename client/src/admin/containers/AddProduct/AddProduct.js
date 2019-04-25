import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import './AddProduct.css';
import Clothing from './Clothing/Clothing';
import EditorMNCE from '../../components/UI/Editor/Editor';
import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ToggleSwitchButton from '../../components/UI/Buttons/ToggleSwitchButton';
import ClothingProductPerview from './Clothing/ClothingProductPerview';

const AddProduct = props => {
	const [Inputs] = useState([
		{ label: 'Name', type: 'text', name: 'name', placeholder: 'Enter Product Name' },{ label: 'Price', type: 'number', name: 'price', placeholder: 'Enter Product Price', min: '0' },{ label: 'Release Year', type: 'number', name: 'year', placeholder: 'Enter Release Year', min: '1950' }
	]);
	
	const [inputs, setInputs] = useState({ name: '', price: 0, year: 1950 });
	const [published, setPublished] = useState(false);
	const [subcategories, setSubcategories] = useState([]);
	const [options, setOptions] = useState([]);
	const [smallDesc, setSmallDesc] = useState(false);
	const [desc, setDesc] = useState(false);

	const [showPerview, setShowPerview] = useState(false);

	useEffect(() => { props.getCategories(); }, []);

	const inputChange = e => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
		if (e.target.name === 'category') { props.getBrandByCategory(e.target.value); setOptions([]); setSubcategories([]); }
		if (e.target.name === 'name') { props.checkProductName(e.target.value); }
	};

	const subcategoriesChange = (e, subName, sub) => {
		const newSubcategories = [...subcategories];
		const findIndex = newSubcategories.findIndex(cat => cat.subName === subName);
		const findSubName = newSubcategories.find(cat => cat.subName === subName);
		if (e.target.checked) {
			if (!findSubName && findIndex === -1) {
				newSubcategories.push({ subName, sub: [sub] });
				setSubcategories(newSubcategories);
			} else {
				newSubcategories[findIndex].sub.push(sub);
				setSubcategories(newSubcategories);
			}
		} else {
			const findIndexSub = newSubcategories[findIndex].sub.findIndex(cat => cat === sub);
			newSubcategories[findIndex].sub.splice(findIndexSub, 1);
			if (newSubcategories[findIndex].sub.length === 0) {
				newSubcategories.splice(findIndex, 1);
			}
			setSubcategories(newSubcategories);
		}
	};

	const onSubmitForm = e => {
		e.preventDefault();
		const pictures = [];
		const formData = new FormData();
		const newOptions = [...options].map(option => {
			const pictures = [];
			option.pictures.forEach(picture => pictures.push(picture.name));
			return { ...option, featuredPicture: option.featuredPicture.name, pictures };
		});
		options.forEach(option => { pictures.push(option.featuredPicture); pictures.push(...option.pictures); });
		for (const input in inputs) { formData.append(input, inputs[input]); }
		pictures.forEach(file => formData.append('pictures', file));
		formData.append('description', desc);
		formData.append('smalldescription', smallDesc);
		formData.append('subcategories', JSON.stringify(subcategories));
		formData.append('options', JSON.stringify(newOptions));
		const config = { headers: { 'content-type': 'multipart/form-data' } };

		props.addProduct(formData, config);
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
								{Inputs.map(input => 
									<LoginRegisterInputs key={input.name} formBox='col-sm-6' label={input.label} type={input.type} name={input.name} placeholder={input.placeholder} inputClass='w-100' invalidInput="invalid" invalidFeedback="invalid-feedback" value={inputs[input.name]} min={input.min ? input.min : false} onChange={inputChange} />
								)}
								<div className='col-sm-6'>
									<ToggleSwitchButton name='Publish' value={published} setValue={setPublished} />
								</div>
							</div>
							<EditorMNCE change={setSmallDesc} init={{ format:'html', menubar: false, statusbar: false, toolbar: 'bold italic', height: '100px', resize: false }} label='Short Description'/>
							<EditorMNCE change={setDesc} init={{ statusbar: false, plugins: 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help formatpainter permanentpen mentions linkchecker', toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat ', height: '600px', resize: false }} label='Description'/>
							<div className="form-group">
								<label className="col-12">Select Category</label>
								<div className="col-12">
									<select name="category" className="w-100 p-3" onChange={inputChange} defaultValue="DEFAULT">
										<option value="DEFAULT" hidden>Select Category</option>
										{props.categories.map((category, index) => <option value={category.name} key={index}>{category.name}</option>)}
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
													<div className="d-flex flex-column mt-3 mr-3" key={index}>
														<label className="d-block">{subname.name}</label>
														{subname.subcategories.map((sub, index) => (
															<div className="checkbox" key={index}>
																<input type="checkbox" onChange={e => subcategoriesChange(e, subname.name, sub) } />
																<label>{sub}</label>
															</div>
														))}
													</div>
												))
										)}
									</div>
								</div>
							)}
							<div className="form-group m-0">
								<label className="col-12">Select Brand</label>
								<div className="col-12">
									<select name="brand" className="w-100 p-3" onChange={inputChange} defaultValue="DEFAULT">
										<option value="DEFAULT" hidden>Select Brand</option>
										{props.brands.map(brand => <option value={brand.name} key={brand._id}>{brand.name}</option>)}
									</select>
								</div>
							</div>
							{(inputs.category === 'Clothing' && !showPerview) && (<Clothing setOptions={setOptions} />)}
						</form>
						{showPerview && 
							<React.Fragment>
								{/* <div dangerouslySetInnerHTML={{ __html: smallDesc }} contentEditable={true}/> */}
								{options.map((option, index) => <ClothingProductPerview data={option} key={index}/>)}
							</React.Fragment>
						}
						{(options.length > 0 && !showPerview) && <button className="btn btn-primary" type="button" onClick={e => {e.preventDefault(); setShowPerview(!showPerview)}}>Show Product Perview</button>}
						{(options.length > 0 && showPerview) && <button className="btn btn-primary" type="button">Add Product</button>}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		categories: state.category.allCategories,
		brands: state.brand.allBrands
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
