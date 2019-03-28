import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';
import ToggleSwitchButton from '../../components/UI/Buttons/ToggleSwitchButton';
import Spinner from '../../../users/components/UI/Spinner/Spinner';

import TagsInput from '../../components/UI/TagsInput/TagsInput';

const UpdateUserRole = props => {
    const [role, setRole] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [choosenPermissions, setChoosenPermissions] = useState({});
    const [allPermissions, setAllPermissions] = useState([]);
    useEffect(() => { 
        const id = new URLSearchParams(props.location.search).get('id'); 
        props.getRole(id);
        props.getPermissions();
    }, []);
    useEffect(() => { 
        setRole({ ...props.roleState }); 
        setIsAdmin(props.roleState.isAdmin);
        setChoosenPermissions({...props.roleState.permissions});
    }, [props.roleState]);
    useEffect(() => {
        setAllPermissions(props.allPermissions);
    }, [props.allPermissions]);

    const nameOnChange = e => {
        e.preventDefault();
        setRole({
            ...role,
            name: e.target.value
        });
    }

    const onFormSubmit = e => {
        e.preventDefault();
        console.log(role._id);
    }

    if(props.failedMessage === true) {
        return (
            <React.Fragment>
                <Redirect to='/admindashboard/dashboard'/>
            </React.Fragment>
        )
    }

    if(isAdmin !== undefined || !Object.keys(role)) {
        return (
            <div className="AdminProfile row">
                <div className='col-12'>
                    <div className="card mb-30 text-white">
                        <div className="card-header">
                            <h4>Update {props.roleState.name} Role</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={onFormSubmit}>
                                <div className=''>
                                    <label className='d-block'>Role Name</label>
                                    <input 
                                        className='w-100' 
                                        type="text" 
                                        placeholder="Enter Role Name" 
                                        value={role.name}
                                        onChange={nameOnChange}
                                        style={{ outline: '0px', boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.489)' }} />
                                </div>
                                <div className=''>
                                    {isAdmin !== undefined ? <ToggleSwitchButton value={isAdmin} setValue={setIsAdmin} name="Is Admin" /> : null }
                                </div>
                                <div className="mb-30">
                                    <label>Permissions</label>
                                    {allPermissions.length < 1 ? null : <TagsInput 
                                        values={allPermissions}
                                        choosenValues={choosenPermissions}
                                        setChoosenValues={setChoosenPermissions} />}
                                </div>
                                <button className="btn">Update Role</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else {
        return (
            <Spinner />
        );
    }
}

const mapStateToProps = state => {
    return {
        roleState: state.roles.Role,
        failedMessage: state.roles.failedMessage,
        allPermissions: state.permissions.allPermissions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRole: (id) => dispatch(actions.getUserRole(id)),
        getPermissions: () => dispatch(actions.getAllPermissions())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserRole);