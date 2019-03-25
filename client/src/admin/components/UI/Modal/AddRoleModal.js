import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

import classes from './Modal.module.css';
import TagsInput from '../TagsInput/TagsInput';
import ToggleSwitchButton from '../Buttons/ToggleSwitchButton';
import ResponseMessages from '../../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../../users/components/UI/SmallSpinner/SmallSpinner';

const AddRoleModal = props => {
    const [allPermissions, setAllPermissions] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [choosenPermissions, setChoosenPermissions] = useState({});
    const [roleName, setRoleName] = useState('');
    
    useEffect(() => {
        document.body.classList.add(classes.NoScroll);
        props.getAllPermissions();
        setAllPermissions(props.allPermissions);
        return () => document.body.classList.remove(classes.NoScroll);
    }, []);

    useEffect(() => { 
        setAllPermissions(props.allPermissions); 
    }, [props.allPermissions]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const role = { name: roleName, isAdmin, permissions: choosenPermissions }
        props.addNewRole(role);
    } 

    return (
        <div className={classes.ModalWrapper}>
            {props.roles.failedMessage ? <ResponseMessages ClassName="Danger" message={props.roles.failedMessage} /> : null}
            {props.roles.successMessage ? <ResponseMessages message={props.roles.successMessage} /> : null}
            <div className={classes.Modal + " " + classes.AddRoleModal}>
                {props.roles.loading ? (
                    <React.Fragment>
                        <div className={classes.close} onClick={e => props.click(e, props.setModal, props.modal) }>
                            <i className="fas fa-times text-dark"></i>
                        </div>
                        <div className={classes.Card + " card bg-white"}>
                            <div className="card-header">
                                <h4 className="text-dark">Add Role</h4>
                            </div>
                            <SmallSpinner />
                        </div>
                    </React.Fragment>
                ) : 
                <React.Fragment>
                    <div className={classes.close} onClick={e => props.click(e, props.setModal, props.modal) }>
                            <i className="fas fa-times text-white"></i>
                    </div>
                    <div className={classes.Card + " card"}>
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
                                        setChoosenValues={setChoosenPermissions}/>
                                    <div className="row mt-20">
                                        <div className="col-md-6">
                                            <label className="text-white">Role Name</label>
                                            <input type="text" 
                                                name="roleName" 
                                                className="w-100" 
                                                placeholder="Enter Role Name"
                                                value={roleName}
                                                onChange={e => setRoleName(e.target.value)}/>
                                        </div>
                                        <div className="col-md-6">
                                            <ToggleSwitchButton value={isAdmin} setValue={setIsAdmin} name="Is Admin" />
                                        </div>
                                    </div>
                                    <button className="btn btn-sm mt-20">Add New Role</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </React.Fragment>}
            </div>
            <div className={classes.Backdrop} onClick={e => props.click(e, props.setModal, props.modal) }></div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        allPermissions: state.permissions.allPermissions,
        roles: state.roles
    };
};

const dispatchMapToProps = dispatch => {
    return {
        getAllPermissions: () => dispatch(actions.getAllPermissions()),
        addNewRole: (role) => dispatch(actions.addRole(role))
    };
};

export default connect(mapStateToProps, dispatchMapToProps)(AddRoleModal);