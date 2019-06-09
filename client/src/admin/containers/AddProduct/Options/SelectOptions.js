import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';

const SelectOptions = props => {
	const [colors] = useState([
		{ value: 'aliceblue', label: 'AliceBlue' },
		{ value: 'antiquewhite', label: 'AntiqueWhite' },
		{ value: 'aqua', label: 'Aqua' },
		{ value: 'aquamarine', label: 'Aquamarine' },
		{ value: 'azure', label: 'Azure' },
		{ value: 'beige', label: 'Beige' },
		{ value: 'bisque', label: 'Bisque' },
		{ value: 'black', label: 'Black' },
		{ value: 'blanchedalmond', label: 'BlanchedAlmond' },
		{ value: 'blue', label: 'Blue' },
		{ value: 'blueviolet', label: 'BlueViolet' },
		{ value: 'brown', label: 'Brown' },
		{ value: 'burlywood', label: 'BurlyWood' },
		{ value: 'cadetblue', label: 'CadetBlue' },
		{ value: 'chartreuse', label: 'Chartreuse' },
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'coral', label: 'Coral' },
		{ value: 'cornflowerblue', label: 'CornflowerBlue' },
		{ value: 'cornsilk', label: 'Cornsilk' },
		{ value: 'crimson', label: 'Crimson' },
		{ value: 'cyan', label: 'Cyan' },
		{ value: 'darkblue', label: 'DarkBlue' },
		{ value: 'darkcyan', label: 'DarkCyan' },
		{ value: 'darkgoldenrod', label: 'DarkGoldenRod' },
		{ value: 'darkgray', label: 'DarkGray' },
		{ value: 'darkgrey', label: 'DarkGrey' },
		{ value: 'darkgreen', label: 'DarkGreen' },
		{ value: 'darkkhaki', label: 'DarkKhaki' },
		{ value: 'darkmagenta', label: 'DarkMagenta' },
		{ value: 'darkolivegreen', label: 'DarkOliveGreen' },
		{ value: 'darkorange', label: 'Darkorange' },
		{ value: 'darkorchid', label: 'DarkOrchid' },
		{ value: 'darkred', label: 'DarkRed' },
		{ value: 'darksalmon', label: 'DarkSalmon' },
		{ value: 'darkseagreen', label: 'DarkSeaGreen' },
		{ value: 'darkslateblue', label: 'DarkSlateBlue' },
		{ value: 'darkslategray', label: 'DarkSlateGray' },
		{ value: 'darkslategrey', label: 'DarkSlateGrey' },
		{ value: 'darkturquoise', label: 'DarkTurquoise' },
		{ value: 'darkviolet', label: 'DarkViolet' },
		{ value: 'deeppink', label: 'DeepPink' },
		{ value: 'deepskyblue', label: 'DeepSkyBlue' },
		{ value: 'dimgray', label: 'DimGray' },
		{ value: 'dimgrey', label: 'DimGrey' },
		{ value: 'dodgerblue', label: 'DodgerBlue' },
		{ value: 'firebrick', label: 'FireBrick' },
		{ value: 'floralwhite', label: 'FloralWhite' },
		{ value: 'forestgreen', label: 'ForestGreen' },
		{ value: 'fuchsia', label: 'Fuchsia' },
		{ value: 'gainsboro', label: 'Gainsboro' },
		{ value: 'ghostwhite', label: 'GhostWhite' },
		{ value: 'gold', label: 'Gold' },
		{ value: 'goldenrod', label: 'GoldenRod' },
		{ value: 'gray', label: 'Gray' },
		{ value: 'grey', label: 'Grey' },
		{ value: 'green', label: 'Green' },
		{ value: 'greenyellow', label: 'GreenYellow' },
		{ value: 'honeydew', label: 'HoneyDew' },
		{ value: 'hotpink', label: 'HotPink' },
		{ value: 'indianred', label: 'IndianRed' },
		{ value: 'indigo', label: 'Indigo' },
		{ value: 'ivory', label: 'Ivory' },
		{ value: 'khaki', label: 'Khaki' },
		{ value: 'lavender', label: 'Lavender' },
		{ value: 'lavenderblush', label: 'LavenderBlush' },
		{ value: 'lawngreen', label: 'LawnGreen' },
		{ value: 'lemonchiffon', label: 'LemonChiffon' },
		{ value: 'lightblue', label: 'LightBlue' },
		{ value: 'lightcoral', label: 'LightCoral' },
		{ value: 'lightcyan', label: 'LightCyan' },
		{ value: 'lightgoldenrodyellow', label: 'LightGoldenRodYellow' },
		{ value: 'lightgray', label: 'LightGray' },
		{ value: 'lightgrey', label: 'LightGrey' },
		{ value: 'lightgreen', label: 'LightGreen' },
		{ value: 'lightpink', label: 'LightPink' },
		{ value: 'lightsalmon', label: 'LightSalmon' },
		{ value: 'lightseagreen', label: 'LightSeaGreen' },
		{ value: 'lightskyblue', label: 'LightSkyBlue' },
		{ value: 'lightslategray', label: 'LightSlateGray' },
		{ value: 'lightslategrey', label: 'LightSlateGrey' },
		{ value: 'lightsteelblue', label: 'LightSteelBlue' },
		{ value: 'lightyellow', label: 'LightYellow' },
		{ value: 'lime', label: 'Lime' },
		{ value: 'limegreen', label: 'LimeGreen' },
		{ value: 'linen', label: 'Linen' },
		{ value: 'magenta', label: 'Magenta' },
		{ value: 'maroon', label: 'Maroon' },
		{ value: 'mediumaquamarine', label: 'MediumAquaMarine' },
		{ value: 'mediumblue', label: 'MediumBlue' },
		{ value: 'mediumorchid', label: 'MediumOrchid' },
		{ value: 'mediumpurple', label: 'MediumPurple' },
		{ value: 'mediumseagreen', label: 'MediumSeaGreen' },
		{ value: 'mediumslateblue', label: 'MediumSlateBlue' },
		{ value: 'mediumspringgreen', label: 'MediumSpringGreen' },
		{ value: 'mediumturquoise', label: 'MediumTurquoise' },
		{ value: 'mediumvioletred', label: 'MediumVioletRed' },
		{ value: 'midnightblue', label: 'MidnightBlue' },
		{ value: 'mintcream', label: 'MintCream' },
		{ value: 'mistyrose', label: 'MistyRose' },
		{ value: 'moccasin', label: 'Moccasin' },
		{ value: 'navajowhite', label: 'NavajoWhite' },
		{ value: 'navy', label: 'Navy' },
		{ value: 'oldlace', label: 'OldLace' },
		{ value: 'olive', label: 'Olive' },
		{ value: 'olivedrab', label: 'OliveDrab' },
		{ value: 'orange', label: 'Orange' },
		{ value: 'orangered', label: 'OrangeRed' },
		{ value: 'orchid', label: 'Orchid' },
		{ value: 'palegoldenrod', label: 'PaleGoldenRod' },
		{ value: 'palegreen', label: 'PaleGreen' },
		{ value: 'paleturquoise', label: 'PaleTurquoise' },
		{ value: 'palevioletred', label: 'PaleVioletRed' },
		{ value: 'papayawhip', label: 'PapayaWhip' },
		{ value: 'peachpuff', label: 'PeachPuff' },
		{ value: 'peru', label: 'Peru' },
		{ value: 'pink', label: 'Pink' },
		{ value: 'plum', label: 'Plum' },
		{ value: 'powderblue', label: 'PowderBlue' },
		{ value: 'purple', label: 'Purple' },
		{ value: 'red', label: 'Red' },
		{ value: 'rosybrown', label: 'RosyBrown' },
		{ value: 'royalblue', label: 'RoyalBlue' },
		{ value: 'saddlebrown', label: 'SaddleBrown' },
		{ value: 'salmon', label: 'Salmon' },
		{ value: 'sandybrown', label: 'SandyBrown' },
		{ value: 'seagreen', label: 'SeaGreen' },
		{ value: 'seashell', label: 'SeaShell' },
		{ value: 'sienna', label: 'Sienna' },
		{ value: 'silver', label: 'Silver' },
		{ value: 'skyblue', label: 'SkyBlue' },
		{ value: 'slateblue', label: 'SlateBlue' },
		{ value: 'slategray', label: 'SlateGray' },
		{ value: 'slategrey', label: 'SlateGrey' },
		{ value: 'snow', label: 'Snow' },
		{ value: 'springgreen', label: 'SpringGreen' },
		{ value: 'steelblue', label: 'SteelBlue' },
		{ value: 'tan', label: 'Tan' },
		{ value: 'teal', label: 'Teal' },
		{ value: 'thistle', label: 'Thistle' },
		{ value: 'tomato', label: 'Tomato' },
		{ value: 'turquoise', label: 'Turquoise' },
		{ value: 'violet', label: 'Violet' },
		{ value: 'wheat', label: 'Wheat' },
		{ value: 'white', label: 'White' },
		{ value: 'whitesmoke', label: 'WhiteSmoke' },
		{ value: 'yellow', label: 'Yellow' },
		{ value: 'yellowgreen', label: 'YellowGreen' }
	]);

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
					: data.value,
				cursor: isDisabled ? 'not-allowed' : 'default'
			};
		},
		input: styles => ({ ...styles, ...dot() }),
		placeholder: styles => ({ ...styles, ...dot() }),
		singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
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
		if (props.sizes) {
			setSizes([
				{ value: 'XXS', label: 'XXS' },
				{ value: 'XS', label: 'XS' },
				{ value: 'S', label: 'S' },
				{ value: 'M', label: 'M' },
				{ value: 'L', label: 'L' },
				{ value: 'XL', label: 'XL' },
				{ value: '2XL', label: '2XL' },
				{ value: '3XL', label: '3XL' },
				{ value: '4XL', label: '4XL' },
				{ value: '5XL', label: '5XL' }
			]);
		}
		if (props.shoeSizes) {
			setSizes([
				{ value: '16', label: '16' },
				{ value: '17', label: '17' },
				{ value: '18', label: '18' },
				{ value: '19', label: '19' },
				{ value: '20', label: '20' },
				{ value: '21', label: '21' },
				{ value: '22', label: '22' },
				{ value: '23', label: '23' },
				{ value: '24', label: '24' },
				{ value: '25', label: '25' },
				{ value: '26', label: '26' },
				{ value: '27', label: '27' },
				{ value: '28', label: '28' },
				{ value: '29', label: '29' },
				{ value: '30', label: '30' },
				{ value: '31', label: '31' },
				{ value: '32', label: '32' },
				{ value: '33', label: '33' },
				{ value: '34', label: '34' },
				{ value: '35', label: '35' },
				{ value: '36', label: '36' },
				{ value: '37', label: '37' },
				{ value: '38', label: '38' },
				{ value: '39', label: '39' },
				{ value: '40', label: '40' },
				{ value: '41', label: '41' },
				{ value: '42', label: '42' },
				{ value: '43', label: '43' },
				{ value: '44', label: '44' },
				{ value: '45', label: '45' },
				{ value: '46', label: '46' },
				{ value: '47', label: '47' },
				{ value: '48', label: '48' },
				{ value: '49', label: '49' },
				{ value: '51', label: '51' },
				{ value: '52', label: '52' },
				{ value: '53', label: '53' },
				{ value: '54', label: '54' },
				{ value: '55', label: '55' }
			]);
		}
		if (props.ram) {
			setSizes([
				{ value: '2', label: '2' },
				{ value: '4', label: '4' },
				{ value: '8', label: '8' },
				{ value: '12', label: '12' },
				{ value: '16', label: '16' },
				{ value: '20', label: '20' },
				{ value: '24', label: '24' },
				{ value: '32', label: '32' },
				{ value: '64', label: '64' },
				{ value: '128', label: '128' },
				{ value: '256', label: '256' }
			]);
		}
		if (props.graphics) {
			setSizes([
				{ value: '2', label: '2' },
				{ value: '4', label: '4' },
				{ value: '6', label: '6' },
				{ value: '8', label: '8' },
				{ value: '12', label: '12' },
				{ value: '16', label: '16' },
				{ value: '20', label: '20' },
				{ value: '24', label: '24' },
				{ value: '32', label: '32' },
				{ value: '64', label: '64' },
				{ value: '128', label: '128' },
				{ value: '256', label: '256' }
			]);
		}
		if (props.ssd) {
			setSizes([
				{ value: '0', label: '0' },
				{ value: '128', label: '128' },
				{ value: '256', label: '256' },
				{ value: '512', label: '512' },
				{ value: '1000', label: '1000' },
				{ value: '2000', label: '2000' },
				{ value: '3000', label: '3000' },
				{ value: '4000', label: '4000' },
				{ value: '5000', label: '5000' },
				{ value: '6000', label: '6000' },
				{ value: '7000', label: '7000' },
				{ value: '8000', label: '8000' },
				{ value: '9000', label: '9000' },
				{ value: '10000', label: '10000' },
				{ value: '11000', label: '11000' },
				{ value: '12000', label: '12000' },
				{ value: '13000', label: '13000' },
				{ value: '14000', label: '14000' },
				{ value: '15000', label: '15000' },
				{ value: '16000', label: '16000' }
			]);
		}
		if (props.hdd) {
			setSizes([
				{ value: '0', label: '0' },
				{ value: '256', label: '256' },
				{ value: '512', label: '512' },
				{ value: '1000', label: '1000' },
				{ value: '2000', label: '2000' },
				{ value: '3000', label: '3000' },
				{ value: '4000', label: '4000' },
				{ value: '5000', label: '5000' },
				{ value: '6000', label: '6000' },
				{ value: '7000', label: '7000' },
				{ value: '8000', label: '8000' },
				{ value: '9000', label: '9000' },
				{ value: '10000', label: '10000' },
				{ value: '11000', label: '11000' },
				{ value: '12000', label: '12000' },
				{ value: '13000', label: '13000' },
				{ value: '14000', label: '14000' },
				{ value: '15000', label: '15000' },
				{ value: '16000', label: '16000' }
			]);
		}
		if (props.memory) {
			setSizes([
				{ value: '4', label: '4' },
				{ value: '8', label: '8' },
				{ value: '16', label: '16' },
				{ value: '32', label: '32' },
				{ value: '64', label: '64' },
				{ value: '128', label: '128' },
				{ value: '256', label: '256' },
				{ value: '512', label: '512' }
			]);
		}
		if (props.display) {
			setSizes([
				{ value: '14', label: '14' },
				{ value: '15', label: '15' },
				{ value: '17', label: '17' },
				{ value: '18', label: '18' },
				{ value: '19', label: '19' },
				{ value: '20', label: '20' },
				{ value: '21', label: '21' },
				{ value: '22', label: '22' },
				{ value: '23', label: '23' },
				{ value: '24', label: '24' },
				{ value: '25', label: '25' },
				{ value: '26', label: '26' },
				{ value: '27', label: '27' },
				{ value: '28', label: '28' },
				{ value: '29', label: '29' },
				{ value: '30', label: '30' },
				{ value: '31', label: '31' },
				{ value: '32', label: '32' },
				{ value: '34', label: '34' },
				{ value: '39', label: '39' },
				{ value: '40', label: '40' },
				{ value: '42', label: '42' },
				{ value: '46', label: '46' },
				{ value: '48', label: '48' },
				{ value: '50', label: '50' },
				{ value: '55', label: '55' },
				{ value: '58', label: '58' },
				{ value: '60', label: '60' },
				{ value: '64', label: '64' },
				{ value: '70', label: '70' },
				{ value: '80', label: '80' },
				{ value: '84', label: '84' },
				{ value: '99', label: '99' },
				{ value: '102', label: '102' },
				{ value: '108', label: '108' },
				{ value: '111', label: '111' },
				{ value: '152', label: '152' }
			]);
		}
		if (props.resolution) {
			setSizes([
				{ label: 'HD 1280 x 720', value: 'HD 1280 x 720' },
				{ label: 'HD+ 1600 x 900', value: 'HD+ 1600 x 900' },
				{ label: 'FHD 1920 x 1080', value: 'FHD 1920 x 1080' },
				{ label: '(W)QHD 2560 x 1440', value: '(W)QHD 2560 x 1440' },
				{ label: 'QHD+ 3200 x 1800', value: 'QHD+ 3200 x 1800' },
				{ label: '4K UHD 3840 x 2160', value: '4K UHD 3840 x 2160' },
				{ label: '5K 5120 x 2880', value: '5K 5120 x 2880' },
				{ label: '8K UHD 7680 x 4320', value: '8K UHD 7680 x 4320' }
			]);
		}
		if (props.projectionscreen) {
			setSizes([
				{ value: '60', label: '60' },
				{ value: '65', label: '65' },
				{ value: '71', label: '71' },
				{ value: '72', label: '72' },
				{ value: '73', label: '73' },
				{ value: '82', label: '82' },
				{ value: '84', label: '84' },
				{ value: '85', label: '85' },
				{ value: '92', label: '92' },
				{ value: '96', label: '96' },
				{ value: '99', label: '99' },
				{ value: '100', label: '100' },
				{ value: '106', label: '106' },
				{ value: '108', label: '108' },
				{ value: '110', label: '110' },
				{ value: '119', label: '119' },
				{ value: '120', label: '120' },
				{ value: '130', label: '130' },
				{ value: '132', label: '132' },
				{ value: '133', label: '133' },
				{ value: '136', label: '136' },
				{ value: '150', label: '150' },
				{ value: '151', label: '151' },
				{ value: '153', label: '153' },
				{ value: '159', label: '159' },
				{ value: '161', label: '161' },
				{ value: '162', label: '162' },
				{ value: '170', label: '170' },
				{ value: '173', label: '173' },
				{ value: '180', label: '180' },
				{ value: '182', label: '182' },
				{ value: '184', label: '184' },
				{ value: '188', label: '188' },
				{ value: '190', label: '190' },
				{ value: '193', label: '193' },
				{ value: '200', label: '200' },
				{ value: '204', label: '204' },
				{ value: '210', label: '210' },
				{ value: '216', label: '216' },
				{ value: '218', label: '218' },
				{ value: '220', label: '220' },
				{ value: '238', label: '238' },
				{ value: '240', label: '240' },
				{ value: '272', label: '272' },
				{ value: '305', label: '305' }
			]);
		}
		if (props.consoles) {
			setSizes([
				{ label: 'PS4', value: 'PS4' },
				{ label: 'PS3', value: 'PS3' },
				{ label: 'PS2', value: 'PS4' },
				{ label: 'PS', value: 'PS' },
				{ label: 'PS Vista', value: 'PS Vista' },
				{ label: 'PC', value: 'PC' },
				{ label: 'Wii', value: 'Wii' },
				{ label: 'Nintendo DS', value: 'Nintendo DS' }
			]);
		}
	}, []);

	return (
		<div className="col-sm-6">
			<label className="">{props.label}</label>
			<div className="mb-20">
				{props.color && (
					<Select
						options={colors}
						onChange={e => props.setColor(e.label)}
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
						onChange={e => props.setSize(e.label)}
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

export default SelectOptions;
