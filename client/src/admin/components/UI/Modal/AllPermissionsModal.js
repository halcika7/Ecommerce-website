import React, { useEffect, useState } from 'react';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';

import classes from './Modal.module.css';
import ResponseMessages from '../../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../../users/components/UI/SmallSpinner/SmallSpinner';
import DataTable from '../DataTable/DataTable';

const AllPermissionsModal = props => {

    const [allPermission, setAllPermissions] = useState([]);

    useEffect(() => {
        document.body.classList.add(classes.NoScroll);
        props.getAllPermissions();
        setAllPermissions(props.permissions.allPermissions);
        return () => document.body.classList.remove(classes.NoScroll);
    }, []);
    useEffect(() => { setAllPermissions(props.permissions.allPermissions); }, [props.permissions]);

    const deleteOne = (e, id) => {
        e.preventDefault();
        props.deletePermission(id)
    }

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
                <div className={classes.Card + " card text-white"}>
                    <div className="card-header">
                        <h4 className="card-title">All Permissions</h4>
                    </div>
                    <div className="card-body">
                        <DataTable permissionsData={allPermission} click={deleteOne} loading={props.permissions.loading} />
                    </div>
                </div>}
            </div>
            <div className={classes.Backdrop} onClick={e => props.click(e, props.setModal, props.modal) }></div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.permissions
    };
}

const dispatchMapToProps = dispatch => {
    return {
        getAllPermissions: () => dispatch(actions.getAllPermissions()),
        deletePermission: (slug) => dispatch(actions.deletePermission(slug))
    };
}

export default connect(mapStateToProps, dispatchMapToProps)(AllPermissionsModal);