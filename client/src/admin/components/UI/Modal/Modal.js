import React, { useEffect, useState } from 'react';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import classnames from 'classnames';

import classes from './Modal.module.css';
import ResponseMessages from '../../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../../users/components/UI/SmallSpinner/SmallSpinner';

const Modal = props => {
    const [permission, setPermission] = useState('');
    const [allPermissions, setAllPermissions] = useState([]);
    useEffect(() => {
        document.body.classList.add(classes.NoScroll);
        props.getAllPermissions();
        setPermission(props.permissions.permission);
        setAllPermissions(props.permissions.allPermissions);
        return () => document.body.classList.remove(classes.NoScroll);
    }, []);
    useEffect(() => { 
        setPermission(props.permissions.permission); 
        setAllPermissions(props.permissions.allPermissions); 
    }, [props.permissions]);
    const formSubmit = e => { e.preventDefault(); props.addPermission(permission) }

    return (
        <div className={classes.ModalWrapper}>
            {props.permissions.successMessage ? <ResponseMessages message={props.permissions.successMessage} /> : null}
            {props.permissions.failedMessage ? <ResponseMessages ClassName="Danger" message={props.permissions.failedMessage} /> : null}
            <div className={classes.Modal}>
                <div className={classes.close} onClick={e => props.click(e, props.setModal, props.modal) }>
                    <i className="fas fa-times"></i>
                </div>
                {props.permissions.loading ? <SmallSpinner /> :
                <React.Fragment>
                    <div className={classes.Permissions}>
                        <label>All Permissions</label>
                        <input list="permissions" disabled={allPermissions.length < 1 ? true : false}/>
                        <datalist id="permissions" className={classes.datalist}>
                            {allPermissions.length > 0 ? allPermissions.map(perm => <option value={perm.permission} key={perm._id} /> ) : null}
                        </datalist> 
                    </div>
                    <form className={classes.Form} onSubmit={formSubmit}>
                        <label>Permission Name</label>
                        <input type="text" 
                            value={permission} 
                            onChange={e => setPermission(e.currentTarget.value)}
                            className={classnames('', {
                                [classes.Invalid]: props.permissions.failedMessage
                            })}/>
                        {props.permissions.failedMessage && (<p className={classes.invalidFeedback}>{props.permissions.failedMessage}</p>)}
                        <button type="submit">Add new Permission</button>
                    </form>
                </React.Fragment>}
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
        addPermission: (permission) => dispatch(actions.addNewPermission(permission)),
        getAllPermissions: () => dispatch(actions.getAllPermissions())
    };
}

export default connect(mapStateToProps, dispatchMapToProps)(Modal);