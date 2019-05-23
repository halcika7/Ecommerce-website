import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';

const SelectCategory = ({
	loading,
	onChange,
	value,
	disabled,
	error,
	categories
}) => {
	const [categoryState, setCategoryState] = useState([]);
	const categoryStyles = {
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
		const newCategories = categories.map(category => ({
			label: category.name,
			value: category.name
		}));
		setCategoryState(newCategories);
	}, [categories]);

	return (
		<Fragment>
			{!loading && (
				<div className="form-group">
					<label className="col-12">Select Category</label>
					<div className="col-12">
						<Select
							options={categoryState}
							onChange={category =>
								onChange(undefined, category.label, 'category')
							}
							styles={categoryStyles}
							value={
								value === ''
									? { label: 'Select Category' }
									: { label: value }
							}
							required
							disabled={disabled}
						/>
						{error && <div className="options-error">{error}</div>}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default SelectCategory;
