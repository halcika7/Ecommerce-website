import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';

const SelectProductOptions = props => {
	const [colors, setColors] = useState([]);

	const [sizes, setSizes] = useState([]);

	const dot = (color = '#111') => ({
		alignItems: 'center',
		display: 'flex',
		':before': {
			backgroundColor: color,
			borderRadius: 15,
			content: '" "',
			display: 'block',
			marginRight: 8,
			height: 15,
			width: 15
		}
	});

	const colourStyles = {
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			const color = chroma(data.value);
			return {
				...styles,
				backgroundColor: isDisabled
					? null
					: isSelected
					? data.value
					: isFocused
					? color.alpha(0.1).css()
					: null,
				color: isDisabled
					? '#ccc'
					: isSelected
					? chroma.contrast(color, 'white') > 2
						? 'white'
						: 'black'
					: data.value === 'white' ? 'black' : data.value,
				cursor: isDisabled ? 'not-allowed' : 'default'
			};
		},
		input: styles => ({ ...styles, ...dot() }),
		placeholder: styles => ({ ...styles, ...dot() }),
		singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
		control: (base, state) => ({
			...base,
			// backgroundColor: 'transparent',
			borderColor: state.isFocused
				? '#4f9ae6'
				: props.value
				? '#4f9ae6'
				: 'red',
			'&:hover': {
				borderColor: state.isFocused
					? '#4f9ae6'
					: props.value
					? '#4f9ae6'
					: 'red'
			}
		})
	};

	const sizeStyles = {
		control: (base, state) => ({
			...base,
			backgroundColor: 'transparent',
			borderColor: state.isFocused
				? '#4f9ae6'
				: props.value
				? '#4f9ae6'
				: 'red',
			'&:hover': {
				borderColor: state.isFocused
					? '#4f9ae6'
					: props.value
					? '#4f9ae6'
					: 'red'
			}
		})
	};

	useEffect(() => {
        const newOpt = props.values.map(color => ({ label: color, value: color.toLowerCase() }))
        props.color && setColors(newOpt)
        props.size && setSizes(newOpt)
	}, []);

	return (
		<div className="col-12">
			<label className="">{props.label}</label>
			<div className="mb-20">
				{props.color && (
					<Select
						options={colors}
						onChange={e => props.change(e.label)}
						styles={colourStyles}
						value={
							props.value === ''
								? { label: 'Choose Color' }
								: { label: props.value, value: props.value.toLowerCase() }
						}
						required
					/>
				)}
				{!props.color && (
					<Select
						options={sizes}
						onChange={e => props.change(e.label)}
						styles={sizeStyles}
						value={
							props.value === ''
								? { label: props.label }
								: { label: props.value }
						}
						required
					/>
				)}
			</div>
		</div>
	);
};

export default SelectProductOptions;
