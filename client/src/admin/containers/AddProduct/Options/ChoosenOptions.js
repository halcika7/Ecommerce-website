import React from 'react';

import LoginRegisterInputs from '../../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import OptionsPictures from './OptionsPictures';
import ToggleSwitchButton from '../../../components/UI/Buttons/ToggleSwitchButton';

const ChoosenOptions = ({
	options,
	errors,
	setOptions,
	changeOptions,
	inputs,
	setShowButton,
	category,
	subCatName
}) => {
	const removeSizeOption = (e, colorIndex, sizeIndex) => {
		e.preventDefault();
		const newOptions = [...options];
		newOptions[colorIndex].options.splice(sizeIndex, 1);
		newOptions[colorIndex].options.length === 0 &&
			newOptions.splice(colorIndex, 1);
		setOptions(newOptions);
		changeOptions(newOptions);
	};

	const perviewChangeInput = (e, colorOptionIndex, optionIndex) => {
		const changedValue = [...options];
		changedValue[colorOptionIndex].options[optionIndex] = {
			...changedValue[colorOptionIndex].options[optionIndex],
			[e.target.name]: e.target.value
		};
		setOptions(changedValue);
	};

	return (
		<div className="accordion">
			{options.map((option, index) => (
				<div key={index}>
					<label
						className="mt-3 mb-3 option-color-wrapper"
						data-toggle="collapse"
						data-target={'#' + index}
						data-tooltip={`Click to show ${
							option.color
								? option.color.toLowerCase()
								: option.display
								? option.display
								: option.console
						} options`}>
						{subCatName !== 'Projection Screens' && subCatName !== 'Games' && (
							<React.Fragment>
								Color: <span className="color-name">{option.color}</span>
								<span
									className="option-color"
									style={{
										background: `${option.color && option.color.toLowerCase()}`
									}}
								/>
							</React.Fragment>
						)}
						{subCatName === 'Projection Screens' && (
							<React.Fragment>
								Screen Size:{' '}
								<span className="color-name">{option.display}</span>
							</React.Fragment>
						)}
						{subCatName === 'Games' && (
							<React.Fragment>
								Console: <span className="color-name">{option.console}</span>
							</React.Fragment>
						)}
					</label>
					{errors[index] && errors[index].color && (
						<div className="options-error"> {errors[index].color}</div>
					)}
					{errors[index] && errors[index].display && (
						<div className="options-error"> {errors[index].display}</div>
					)}
					{errors[index] && errors[index].console && (
						<div className="options-error"> {errors[index].console}</div>
					)}
					<div id={index} className="collapse">
						{option.options.map((opt, i) => (
							<div className="form-group row mb-4" key={i}>
								<div className="col-12">
									<button
										className="btn btn-sm btn-danger"
										type="button"
										onClick={e => removeSizeOption(e, index, i)}>
										{' '}
										Delete Option
									</button>
								</div>
								{inputs.map(input => (
									<LoginRegisterInputs
										key={input.name}
										formBox="col-sm-6 mt-3 mb-3"
										label={input.label}
										type={input.type}
										name={input.name}
										placeholder={input.placeholder}
										inputClass="w-100"
										invalidInput="invalid"
										invalidFeedback="invalid-feedback"
										value={opt[input.name]}
										onChange={e => perviewChangeInput(e, index, i)}
										required={input.required}
										error={
											errors[index] && errors[index].options
												? errors[index].options[i][input.name]
												: ''
										}
									/>
								))}
								{category !== 'Electronics' && (
									<LoginRegisterInputs
										formBox="col-sm-6 mt-3 mb-3"
										label={'Size'}
										type="text"
										name="size"
										placeholder="Enter Size"
										inputClass="w-100"
										invalidInput="invalid"
										invalidFeedback="invalid-feedback"
										value={opt.size}
										error={
											errors[index] && errors[index].options
												? errors[index].options[i].size
												: ''
										}
										onChange={() => {}}
										disabled={true}
									/>
								)}
								{(subCatName === 'Desktop Computers' ||
									subCatName === 'Laptops') && (
									<React.Fragment>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label="Ram"
											type="text"
											name="ram"
											placeholder="Enter Ram"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.ram}
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].ram
													: ''
											}
											onChange={() => {}}
											disabled={true}
										/>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label="Graphics"
											type="text"
											name="graphics"
											placeholder="Enter Graphics"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.graphics}
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].graphics
													: ''
											}
											onChange={() => {}}
											disabled={true}
										/>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label="SSD"
											type="text"
											name="ssd"
											placeholder="Enter SSD"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.ssd}
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].ssd
													: ''
											}
											onChange={() => {}}
											disabled={true}
										/>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label="HDD"
											type="text"
											name="hdd"
											placeholder="Enter HDD"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.hdd}
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].hdd
													: ''
											}
											onChange={() => {}}
											disabled={true}
										/>
									</React.Fragment>
								)}
								{subCatName === 'Desktop Computers' && (
									<React.Fragment>
										<div className="col-md-2 mb-3">
											<ToggleSwitchButton
												name="Mouse"
												value={opt.withMouse}
												disabled={true}
											/>
										</div>
										<div className="col-md-2 mb-3">
											<ToggleSwitchButton
												name="Keyboard"
												value={opt.withKeyboard}
												disabled={true}
											/>
										</div>
										<div className="col-md-2 mb-3">
											<ToggleSwitchButton
												name="Display"
												value={opt.withDisplay}
												disabled={true}
											/>
										</div>
									</React.Fragment>
								)}
								{subCatName === 'Laptops' && (
									<LoginRegisterInputs
										formBox="col-sm-6 mt-3 mb-3"
										label="Resolution"
										type="text"
										name="resolution"
										placeholder="Enter Resolution"
										inputClass="w-100"
										invalidInput="invalid"
										invalidFeedback="invalid-feedback"
										value={opt.resolution}
										error={
											errors[index] && errors[index].options
												? errors[index].options[i].resolution
												: ''
										}
										onChange={() => {}}
										disabled={true}
									/>
								)}
								{(subCatName === 'Tablets' || subCatName === 'Phones') && (
									<LoginRegisterInputs
										formBox="col-sm-6 mt-3 mb-3"
										label="Memory"
										type="text"
										name="memory"
										placeholder="Enter Memory"
										inputClass="w-100"
										invalidInput="invalid"
										invalidFeedback="invalid-feedback"
										value={opt.memory}
										error={
											errors[index] && errors[index].options
												? errors[index].options[i].memory
												: ''
										}
										onChange={() => {}}
										disabled={true}
									/>
								)}
								{(subCatName === 'Monitors' ||
									subCatName === 'Televisions') && (
									<React.Fragment>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label="Display Size"
											type="text"
											name="displaySize"
											placeholder="Display Size"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.display}
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].display
													: ''
											}
											onChange={() => {}}
											disabled={true}
										/>
										<LoginRegisterInputs
											formBox="col-sm-6 mt-3 mb-3"
											label="Select Display Resolution"
											type="text"
											name="resolution"
											placeholder="Select Display Resolution"
											inputClass="w-100"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={opt.resolution}
											error={
												errors[index] && errors[index].options
													? errors[index].options[i].resolution
													: ''
											}
											onChange={() => {}}
											disabled={true}
										/>
										<div className="col-sm-3 mb-3">
											<ToggleSwitchButton
												name="Smart"
												value={opt.smart}
												disabled={true}
											/>
										</div>
										<div className="col-sm-3 mb-3">
											<ToggleSwitchButton
												name="3D"
												value={opt.threeD}
												disabled={true}
											/>
										</div>
									</React.Fragment>
								)}
							</div>
						))}
						<OptionsPictures
							options={options}
							setShowButton={setShowButton}
							index={index}
							error={errors[index]}
							setOptions={setOptions}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChoosenOptions;
