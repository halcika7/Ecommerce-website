import React from 'react';

const SelectSubcategory = ({
	categories,
	error,
	change,
	category,
	subcategories
}) => {
	return (
		<div className="form-group">
			<label className="col-12">Select Sub Category</label>
			<div className="col-12 checkbox-wrapper">
				{categories.map(
					(cat, index) =>
						cat.name === category && (
							<React.Fragment key={index}>
								{error && (
									<div className="options-error">
										{error[0].subName}
										<br />
										{error[0].sub}
									</div>
								)}
								{cat.subcategories.map((subname, index) => (
									<div className="d-flex flex-column mt-3 mr-3" key={index}>
										<label className="d-block">{subname.name}</label>
										{category !== 'Electronics'
											? subname.subcategories.map((sub, i) => {
													const finIndex = subcategories.findIndex(
														subb => subb.subName === subname.name
													);
													const finSubIndex =
														finIndex !== -1 &&
														subcategories[finIndex].sub.findIndex(
															subb => subb === sub
														);
													return (
														<div className="checkbox" key={i}>
															<input
																type="checkbox"
																defaultChecked={
																	finSubIndex !== false && finSubIndex !== -1
																		? true
																		: false
																}
																onChange={e => change(e, subname.name, sub)}
															/>
															<label>{sub}</label>
														</div>
													);
											  })
											: subname.subcategories.map((sub, i) => {
													const finIndex = subcategories.findIndex(
														subb => subb.subName === subname.name
													);
													const finSubIndex =
														finIndex !== -1 &&
														subcategories[finIndex].sub === sub;
													return (
														<label className="checkbox" key={i}>
															<input
																type="radio"
																name="icon"
																defaultChecked={
																	finSubIndex !== false && finSubIndex !== -1
																		? true
																		: false
																}
																onChange={e => change(e, subname.name, sub)}
															/>
															<label>{sub}</label>
														</label>
													);
											  })}
									</div>
								))}
							</React.Fragment>
						)
				)}
			</div>
		</div>
	);
};

export default SelectSubcategory;
