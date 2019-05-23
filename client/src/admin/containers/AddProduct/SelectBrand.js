import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SelectBrand = ({ change, value, brands, error }) => {
	const [brandState, setBrandState] = useState([]);
	const brandStyles = {
		control: (base, state) => ({
			...base,
			backgroundColor: 'transparent',
			borderColor: state.isFocused ? '#4f9ae6' : value ? '#4f9ae6' : 'red',
			'&:hover': {
				borderColor: state.isFocused ? '#4f9ae6' : value ? '#4f9ae6' : 'red'
			}
		})
	};

	useEffect(() => {
		const newBrands = brands.map(brand => ({
			label: brand.name,
			value: brand.name
		}));
		setBrandState(newBrands);
	}, [brands]);

	return (
		<div className="form-group m-0 mb-3">
			<label className="col-12">Select Brand</label>
			<div className="col-12">
				<Select
					options={brandState}
					onChange={brand => change(undefined, brand.label, 'brand')}
					styles={brandStyles}
					value={value === '' ? { label: 'Select Brand' } : { label: value }}
					required
				/>
				{error && <div className="options-error">{error}</div>}
			</div>
		</div>
	);
};

export default SelectBrand;
