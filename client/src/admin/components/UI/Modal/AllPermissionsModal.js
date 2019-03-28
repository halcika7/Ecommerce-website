import React, { useEffect, useState } from 'react';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';

import classes from './Modal.module.css';
import ResponseMessages from '../../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../../users/components/UI/SmallSpinner/SmallSpinner';

const AllPermissionsModal = props => {

    const [allPermission, setAllPermissions] = useState([]);

    useEffect(() => {
        document.body.classList.add(classes.NoScroll);
        props.getAllPermissions();
        setAllPermissions(props.permissions.allPermissions);
        return () => document.body.classList.remove(classes.NoScroll);
    }, []);
    useEffect(() => { 
        setAllPermissions(props.permissions.allPermissions); 
    }, [props.permissions]);

    return (
        <div className={classes.ModalWrapper}>
            {props.permissions.successMessage ? <ResponseMessages message={props.permissions.successMessage} /> : null}
            {props.permissions.failedMessage ? <ResponseMessages ClassName="Danger" message={props.permissions.failedMessage} /> : null}
            <div className={classes.Modal + " " + classes.PermissionsModal}>
                <div className={classes.close} onClick={e => props.click(e, props.setModal, props.modal) }>
                    <i className="fas fa-times"></i>
                </div>
                {allPermission.length === 0 ? (
                    <div className={classes.Card + " card"}>
                        <div className="card-header" style={{ minHeight: '50px' }}></div>
                        <div className="card-body bg-white">
                            <SmallSpinner />
                        </div>
                    </div>
                ) :
                <div className={classes.Card + " card"}>
                    <div className="card-header">
                        <h4 className="card-title">All Permissions</h4>
                        {props.deletePermissionState ? <button className="btn btn-sm btn-danger float-right"
                                onClick={(e) => props.deleteAllPermissions()}>Delete All Permissions</button> : null }
                    </div>
                    <div className="card-body">
                        <div className={classes.tableResponsive + " table-responsive"}>
                            <table className="table table-hover text-white">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Slug</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allPermission.length > 0 ? allPermission.map(perm => (
                                        <tr key={perm._id}>
                                            <td>{perm._id}</td>
                                            <td>{perm.slug}</td>
                                            <td>{perm.permission}</td>
                                            {props.deletePermissionState ? 
                                            <td className="text-center">
                                                <button 
                                                className="btn btn-danger" type="button"
                                                onClick={e => props.deletePermission(perm.slug)}>
                                                    <i className="far fa-trash-alt"></i>
                                                </button>
                                            </td> : null }
                                        </tr>)) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}
            </div>
            <div className={classes.Backdrop} onClick={e => props.click(e, props.setModal, props.modal) }></div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.permissions,
        deletePermissionState: state.login.User.role.permissions['Delete Permission']
    };
}

const dispatchMapToProps = dispatch => {
    return {
        getAllPermissions: () => dispatch(actions.getAllPermissions()),
        deletePermission: (slug) => dispatch(actions.deletePermission(slug)),
        deleteAllPermissions: () => dispatch(actions.deleteAllPermissions())
    };
}

export default connect(mapStateToProps, dispatchMapToProps)(AllPermissionsModal);