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
					: data.value === 'black'
					? 'white'
					: 'black',
				cursor: isDisabled ? 'not-allowed' : 'default'
			};
		},
		input: styles => ({ ...styles, ...dot() }),
		placeholder: styles => ({ ...styles, ...dot() }),
		singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
		control: (base, state) => ({
			...base,
			// backgroundColor: 'transparent',
			boxShadow: 'transparent',
			borderColor: state.isFocused
				? '#ea7832'
				: props.value
				? '#ea7832'
				: '#ea7832',
			'&:hover': {
				borderColor: state.isFocused
					? '#ea7832'
					: props.value
					? '#ea7832'
					: '#ea7832'
			}
		})
	};

	const sizeStyles = {
		control: (base, state) => ({
			...base,
			backgroundColor: 'transparent',
			boxShadow: 'transparent',
			borderColor: state.isFocused
				? '#ea7832'
				: props.value
				? '#ea7832'
				: '#ea7832',
			'&:hover': {
				borderColor: state.isFocused
					? '#ea7832'
					: props.value
					? '#ea7832'
					: '#ea7832'
			}
		})
	};

	useEffect(() => {
		let newOpt = null;
		if (props.color) {
			newOpt = props.values.map(color => ({
				label: color,
				value: color.toLowerCase()
			}));
			setColors(newOpt);
		}
		if (props.size) {
			newOpt = props.values.map(val => ({ label: val, value: val }));
			setSizes(newOpt);
		}
	}, [props]);

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
