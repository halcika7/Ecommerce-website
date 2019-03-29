import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import classes from './AllUserRoles.module.css'
import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';

const AllRolesModal = props => {

    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        props.getAllRoles();
        setAllRoles(props.roles.Roles);
    }, []);
    useEffect(() => { setAllRoles(props.roles.Roles); }, [props.roles]);

    return (
        <div className={classes.Role + ' AdminProfile row'}>
            {props.roles.successMessage ? <ResponseMessages message={props.roles.successMessage} /> : null}
            {props.roles.failedMessage ? <ResponseMessages ClassName="Danger" message={props.roles.failedMessage} /> : null}
            <div className='col-12'>
                {allRoles.length === 0 ? (
                    <div className="card">
                        <div className="card-header text-white" style={{ minHeight: '50px' }}>No Roles Found</div>
                        <div className="card-body bg-white">
                            <SmallSpinner />
                        </div>
                    </div>
                ) :
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title text-white">All Roles</h4>
                        <button className="btn btn-sm btn-danger float-right"
                                onClick={(e) => props.deleteAllRoles()}>Delete All Roles</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover text-white">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>IsAdmin</th>
                                        <th>Name</th>
                                        <th>Permissions</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allRoles.length > 0 ? allRoles.map(perm => (
                                        <tr key={perm._id}>
                                            <td>{perm._id}</td>
                                            <td>{perm.isAdmin.toString()}</td>
                                            <td>{perm.name}</td>
                                            <td className={classes.TdPermissionSpans}>
                                                {perm.permissions ? Object.keys(perm.permissions).map((permission, index) => 
                                                    (<span key={index} className={classes.PermissionTableSpan}>
                                                        {permission}
                                                    </span>)) : 'No Permissions'}
                                            </td>
                                            <td className="text-center" style={{  minWidth: '220px'}}>
                                                <button 
                                                    className={classes.button + " btn"}
                                                    onClick={e => props.deleteRole(perm.name)}>
                                                    <i className="far fa-trash-alt"></i>
                                                </button>
                                                <Link to={`/admindashboard/updateRole?id=${perm._id}`} className="btn btn-primary link-close-modal">
                                                    <i className="far fa-edit"></i>
                                                </Link>
                                            </td>
                                        </tr>)) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        roles: state.roles,
    };
}

const dispatchMapToProps = dispatch => {
    return {
        getAllRoles: () => dispatch(actions.getRoles()),
        deleteAllRoles: () => dispatch(actions.deleteAllUserRoles()),
        deleteRole: (name) => dispatch(actions.deleteUserRole(name))
    };
}

export default connect(mapStateToProps, dispatchMapToProps)(AllRolesModal);