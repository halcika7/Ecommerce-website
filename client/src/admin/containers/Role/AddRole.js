import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import TagsInput from '../../components/UI/TagsInput/TagsInput';
import ToggleSwitchButton from '../../components/UI/Buttons/ToggleSwitchButton';
import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';

const AddRole = props => {
	const [allPermissions, setAllPermissions] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [choosenPermissions, setChoosenPermissions] = useState([]);
	const [roleName, setRoleName] = useState('');
	useEffect(() => {
		props.getAllPermissions(props.history.push);
		setAllPermissions(props.allPermissions);
	}, []);
	useEffect(() => {
		setAllPermissions(props.allPermissions);
	}, [props.allPermissions]);
	useEffect(() => {
		if (props.roles.successMessage) {
			setRoleName('');
			setIsAdmin(false);
			setChoosenPermissions([]);
		}
	}, [props.roles.successMessage]);

	const onFormSubmit = e => {
		e.preventDefault();
		const role = { name: roleName, isAdmin, permissions: choosenPermissions };
		props.addNewRole(role, props.history.push);
	};

	return (
		<div className={'AdminProfile row'}>
			{props.roles.failedMessage ? (
				<ResponseMessages
					ClassName="Danger"
					message={props.roles.failedMessage}
				/>
			) : null}
			{props.roles.successMessage ? (
				<ResponseMessages message={props.roles.successMessage} />
			) : null}
			<div className={'col-12 mb-30'}>
				{props.roles.loading ? (
					<div className={'card bg-white'}>
						<SmallSpinner />
					</div>
				) : (
					<React.Fragment>
						<div className="Card card">
							<div className="card-header">
								<h4 className="text-white">Add Role</h4>
							</div>
							<div className="card-body">
								<div className="col-12">
									<form onSubmit={onFormSubmit}>
										<label className="text-white">Select Roles</label>
										<TagsInput
											values={allPermissions}
											choosenValues={choosenPermissions}
											setChoosenValues={setChoosenPermissions}
										/>
										<div className="row mt-20">
											<div className="col-md-6">
												<label className="text-white">Role Name</label>
												<input
													type="text"
													name="roleName"
													className="w-100"
													placeholder="Enter Role Name"
													value={roleName}
													onChange={e => setRoleName(e.target.value)}
													style={{
														border: '1px solid rgba(255, 255, 255, 0.489)'
													}}
												/>
											</div>
											<div className="col-md-6">
												<ToggleSwitchButton
													value={isAdmin}
													setValue={setIsAdmin}
													name="Is Admin"
												/>
											</div>
										</div>
										<button className="btn btn-sm mt-20">Add New Role</button>
									</form>
								</div>
							</div>
						</div>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		allPermissions: state.permissions.allPermissions,
		roles: state.roles
	};
};

const dispatchMapToProps = dispatch => {
	return {
		getAllPermissions: callBack => dispatch(actions.getAllPermissions(callBack)),
		addNewRole: (role, callBack) => dispatch(actions.addRole(role, callBack))
	};
};

export default connect(
	mapStateToProps,
	dispatchMapToProps
)(AddRole);
