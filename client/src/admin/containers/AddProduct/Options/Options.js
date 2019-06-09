import React, { useState, useEffect } from 'react';

import SelectOptions from './SelectOptions';
import LoginRegisterInputs from '../../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ChoosePictures from './ChoosePictures';
import ChoosenOptions from './ChoosenOptions';
import ToggleSwitchButton from '../../../components/UI/Buttons/ToggleSwitchButton';

const Options = props => {
	const [Inputs] = useState([
		{
			type: 'number',
			label: 'Enter Quantity',
			placeholder: 'Enter Option Quantity',
			name: 'quantity',
			required: true
		},
		{
			type: 'number',
			label: 'Enter Aditional Price',
			placeholder: 'Enter Option Aditional Price',
			name: 'aditionalPrice',
			required: true
		},
		{
			type: 'number',
			label: 'Enter Discount',
			placeholder: 'Enter Option Discount',
			name: 'discount',
			required: true
		},
		{
			type: 'text',
			label: 'Enter SKU',
			placeholder: 'Enter Option SKU',
			name: 'sku',
			required: true
		}
	]);
	const [inputs, setInputs] = useState({
		quantity: 0,
		aditionalPrice: 0,
		discount: 0,
		sku: ''
	});
	const [color, setColor] = useState('');
	const [size, setSize] = useState('');
	// computer
	const [withMouse, setWithMouse] = useState(false);
	const [withKeyboard, setWithKeyboard] = useState(false);
	const [withDisplay, setWithDisplay] = useState(false);
	// comoputer & laptop inputs
	const [ram, setRam] = useState('');
	const [graphics, setGraphics] = useState('');
	const [ssd, setSSD] = useState('');
	const [hdd, setHDD] = useState('');
	// tablets and phones
	const [memory, setMemory] = useState('');
	// monitors and projection screen
	const [display, setDisplay] = useState('');
	const [resolution, setResolution] = useState(''); // for laptop also
	const [smart, setSmart] = useState(false);
	const [threeD, setThreeD] = useState(false);
	// games
	const [gameConsole, setConsole] = useState('');

	const [singlePicture, setSinglePicture] = useState(false);
	const [multyPicture, setMultyPicture] = useState(false);
	const [options, setOptions] = useState([]);
	const [showButton, setShowButton] = useState(true);
	const [showImagesChooser, setShowImagesChooser] = useState(true);
	const [errors, setErrors] = useState([]);
	const [subCatName, setSubCatName] = useState('');

	useEffect(() => {
		const findIndex = options.findIndex(option => option.color === color);
		findIndex !== -1 && setShowImagesChooser(false);
		findIndex === -1 && setShowImagesChooser(true);
	}, [color]);

	useEffect(() => {
		const findIndex = options.findIndex(
			option => option.console === gameConsole
		);
		findIndex !== -1 && setShowImagesChooser(false);
		findIndex === -1 && setShowImagesChooser(true);
	}, [gameConsole]);

	useEffect(() => {
		if (subCatName === 'Projection Screens') {
			const findIndex = options.findIndex(option => option.display === display);
			findIndex !== -1 && setShowImagesChooser(false);
			findIndex === -1 && setShowImagesChooser(true);
		}
	}, [display]);

	useEffect(() => {
		props.options && setOptions(props.options);
	}, [props.options]);

	useEffect(() => {
		props.errors && setErrors(props.errors);
	}, [props.errors]);

	useEffect(() => {
		props.subcategories && setSubCatName(props.subcategories[0].sub);
	}, [props.subcategories]);

	useEffect(() => {
		setColor('');
	}, [props.category, props.subcategories]);

	// add product option
	const addOption = e => {
		e.preventDefault();
		addProductOption();
		setInputs({ quantity: 0, aditionalPrice: 0, discount: 0, sku: '' });
	};

	const addProductOption = () => {
		const newOptions = [...options];
		const bool = setBool();
		const findOptionIndex = getOptionIndex(newOptions);
		const option = setOption();
		if (findOptionIndex === -1) {
			const pushOption = setPushOption(option);
			newOptions.push(pushOption);
			setSinglePicture(false);
			setMultyPicture(false);
			setShowImagesChooser(false);
		} else {
			const findSize = setFindSize(newOptions, findOptionIndex);
			if (bool) {
				findSize !== -1 &&
					setFindSizeOption(newOptions, findOptionIndex, findSize);
				findSize === -1 && newOptions[findOptionIndex].options.push(option);
			} else {
				setFindSizeOption(newOptions, findOptionIndex);
			}
		}
		setOptions(newOptions);
		props.setOptions(newOptions, false);
	};

	const getOptionIndex = newOptions => {
		let findOptionIndex = newOptions.findIndex(
			option => option.color === color
		);
		if (subCatName === 'Projection Screens') {
			findOptionIndex = newOptions.findIndex(
				option => option.display === display
			);
		} else if (subCatName === 'Games') {
			findOptionIndex = newOptions.findIndex(
				option => option.console === gameConsole
			);
		}
		return findOptionIndex;
	};

	const setBool = () => {
		return props.category !== 'Electronics' ||
			subCatName === 'Desktop Computers' ||
			subCatName === 'Laptops' ||
			subCatName === 'Monitors' ||
			subCatName === 'Televisions' ||
			subCatName === 'Tablets' ||
			subCatName === 'Phones'
			? true
			: false;
	};

	const setOption = () => {
		let option = {
			quantity: +inputs.quantity,
			aditionalPrice: +inputs.aditionalPrice,
			discount: +inputs.discount,
			sku: inputs.sku
		};
		if (props.category !== 'Electronics') {
			option = { ...option, size };
		} else if (subCatName === 'Desktop Computers') {
			option = {
				...option,
				ram: +ram,
				graphics: +graphics,
				ssd: +ssd,
				hdd: +hdd,
				withMouse,
				withDisplay,
				withKeyboard
			};
		} else if (subCatName === 'Laptops') {
			option = {
				...option,
				ram: +ram,
				graphics: +graphics,
				ssd: +ssd,
				hdd: +hdd,
				resolution
			};
		} else if (subCatName === 'Monitors' || subCatName === 'Televisions') {
			option = { ...option, display, resolution, smart, threeD };
		} else if (subCatName === 'Tablets' || subCatName === 'Phones') {
			option = { ...option, memory: +memory };
		}
		return option;
	};

	const setPushOption = option => {
		let pushOption = {
			options: [option],
			featuredPicture: singlePicture ? singlePicture : '',
			pictures: multyPicture
		};
		if (subCatName === 'Projection Screens') {
			pushOption = { ...pushOption, display };
		} else if (subCatName === 'Games') {
			pushOption = { ...pushOption, console: gameConsole };
		} else {
			pushOption = { ...pushOption, color };
		}
		return pushOption;
	};

	const setFindSize = (newOptions, findOptionIndex) => {
		let findSize = newOptions[findOptionIndex].options.findIndex(
			option => option.size === size
		);
		if (subCatName === 'Desktop Computers') {
			findSize = newOptions[findOptionIndex].options.findIndex(
				option =>
					option.ram === parseInt(ram) &&
					option.graphics === parseInt(graphics) &&
					option.ssd === parseInt(ssd) &&
					option.hdd === parseInt(hdd) &&
					option.withKeyboard === withKeyboard &&
					option.withMouse === withMouse &&
					option.withDisplay === withDisplay
			);
		} else if (subCatName === 'Laptops') {
			findSize = newOptions[findOptionIndex].options.findIndex(
				option =>
					option.ram === parseInt(ram) &&
					option.graphics === parseInt(graphics) &&
					option.ssd === parseInt(ssd) &&
					option.hdd === parseInt(hdd) &&
					option.resolution === resolution
			);
		} else if (subCatName === 'Monitors' || subCatName === 'Televisions') {
			findSize = newOptions[findOptionIndex].options.findIndex(
				option =>
					option.display === display &&
					option.resolution === resolution &&
					option.smart === smart &&
					option.threeD === threeD
			);
		} else if (subCatName === 'Tablets' || subCatName === 'Phones') {
			findSize = newOptions[findOptionIndex].options.findIndex(
				option => option.memory === parseInt(memory)
			);
		}
		return findSize;
	};

	const setFindSizeOption = (newOptions, findOptionIndex, findSize = 0) => {
		newOptions[findOptionIndex].options[findSize] = {
			...newOptions[findOptionIndex].options[findSize],
			quantity:
				newOptions[findOptionIndex].options[findSize].quantity +
				parseInt(inputs.quantity)
		};
	};
	// end add product option

	const finalizeOptions = e => {
		e.preventDefault();
		props.setOptions(options);
	};

	const inputOnChange = e => {
		e.preventDefault();
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const setFeaturedPicture = (name, file) => setSinglePicture(file);

	return (
		<form className="form-group mb-20" onSubmit={addOption}>
			<div className="row m-0">
				{subCatName !== 'Projection Screens' && subCatName !== 'Games' && (
					<SelectOptions
						setColor={setColor}
						color={true}
						value={color}
						label="Select Color"
					/>
				)}
				{(props.category === 'Clothing' || props.category === 'Shoes') && (
					<SelectOptions
						setSize={setSize}
						sizes={props.category === 'Clothing' ? true : false}
						shoeSizes={props.category === 'Shoes' ? true : false}
						value={size}
						label="Select Size"
					/>
				)}
				{(subCatName === 'Desktop Computers' || subCatName === 'Laptops') && (
					<React.Fragment>
						<SelectOptions
							value={ram}
							setSize={setRam}
							ram={true}
							label="Select Ram"
						/>
						<SelectOptions
							value={graphics}
							setSize={setGraphics}
							graphics={true}
							label="Select Graphics"
						/>
						<SelectOptions
							value={ssd}
							setSize={setSSD}
							ssd={true}
							label="Select SSD"
						/>
						<SelectOptions
							value={hdd}
							setSize={setHDD}
							hdd={true}
							label="Select HDD"
						/>
					</React.Fragment>
				)}
				{subCatName === 'Desktop Computers' && (
					<React.Fragment>
						<div className="col-md-2 mb-3">
							<ToggleSwitchButton
								name="Mouse"
								value={withMouse}
								setValue={setWithMouse}
							/>
						</div>
						<div className="col-md-2 mb-3">
							<ToggleSwitchButton
								name="Keyboard"
								value={withKeyboard}
								setValue={setWithKeyboard}
							/>
						</div>
						<div className="col-md-2 mb-3">
							<ToggleSwitchButton
								name="Display"
								value={withDisplay}
								setValue={setWithDisplay}
							/>
						</div>
					</React.Fragment>
				)}
				{subCatName === 'Laptops' && (
					<SelectOptions
						value={resolution}
						setSize={setResolution}
						resolution={true}
						label="Select Display Resolution"
					/>
				)}
				{(subCatName === 'Tablets' || subCatName === 'Phones') && (
					<SelectOptions
						value={memory}
						setSize={setMemory}
						memory={true}
						label="Select Memory"
					/>
				)}
				{(subCatName === 'Monitors' || subCatName === 'Televisions') && (
					<React.Fragment>
						<SelectOptions
							value={display}
							setSize={setDisplay}
							display={true}
							label="Select Display Size"
						/>
						<SelectOptions
							value={resolution}
							setSize={setResolution}
							resolution={true}
							label="Select Display Resolution"
						/>
						<div className="col-sm-3 mb-3">
							<ToggleSwitchButton
								name="Smart"
								value={smart}
								setValue={setSmart}
							/>
						</div>
						<div className="col-sm-3 mb-3">
							<ToggleSwitchButton
								name="3D"
								value={threeD}
								setValue={setThreeD}
							/>
						</div>
					</React.Fragment>
				)}
				{subCatName === 'Projection Screens' && (
					<SelectOptions
						value={display}
						setSize={setDisplay}
						projectionscreen={true}
						label="Select Projection Screen Size"
					/>
				)}
				{subCatName === 'Games' && (
					<SelectOptions
						value={gameConsole}
						setSize={setConsole}
						consoles={true}
						label="Select Console"
					/>
				)}
			</div>
			<div className="col-12 mb-4">
				<div className="row">
					{Inputs.map(input => (
						<LoginRegisterInputs
							key={input.name}
							formBox="col-md-4 mb-3"
							label={input.label}
							type={input.type}
							name={input.name}
							placeholder={input.placeholder}
							inputClass="w-100"
							value={inputs[input.name]}
							onChange={inputOnChange}
							required={input.required}
						/>
					))}
				</div>
				{showImagesChooser && (
					<ChoosePictures
						changeFeaturedPicture={setFeaturedPicture}
						changePictures={setMultyPicture}
						setShowButton={setShowButton}
					/>
				)}
				{showButton && (
					<button type="submit" className="btn btn-primary mt-4 d-block">
						Add Option
					</button>
				)}
				<ChoosenOptions
					options={options}
					errors={errors}
					setOptions={setOptions}
					changeOptions={props.changeOptions}
					inputs={Inputs}
					setShowButton={setShowButton}
					category={props.category}
					subCatName={subCatName}
				/>
				{options.length > 0 && showButton && (
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

export default Options;
