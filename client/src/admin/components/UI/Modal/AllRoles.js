import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Modal.module.css';
import ResponseMessages from '../../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../../users/components/UI/SmallSpinner/SmallSpinner';

const AllRolesModal = props => {

    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        document.body.classList.add(classes.NoScroll);
        props.getAllRoles();
        setAllRoles(props.roles.Roles);
        document.addEventListener('click', toggleModalOnLinkClicked);
        return () => {
            document.body.classList.remove(classes.NoScroll);
            document.removeEventListener('click', toggleModalOnLinkClicked);
        };
    }, []);
    useEffect(() => { setAllRoles(props.roles.Roles); }, [props.roles]);

    
    const toggleModalOnLinkClicked = e => {
        if(e.target.closest('.link-close-modal') || e.target.closest('.far.fa-edit')){
            props.click(e, props.setModal, props.modal);
        }
    }

    return (
        <div className={classes.ModalWrapper}>
            {props.roles.successMessage ? <ResponseMessages message={props.roles.successMessage} /> : null}
            {props.roles.failedMessage ? <ResponseMessages ClassName="Danger" message={props.roles.failedMessage} /> : null}
            <div className={classes.Modal + " " + classes.PermissionsModal}>
                <div className={classes.close} onClick={e => props.click(e, props.setModal, props.modal) }>
                    <i className="fas fa-times"></i>
                </div>
                {allRoles.length === 0 ? (
                    <div className={classes.Card + " card"}>
                        <div className="card-header text-white" style={{ minHeight: '50px' }}>No Roles Found</div>
                        <div className="card-body bg-white">
                            <SmallSpinner />
                        </div>
                    </div>
                ) :
                <div className={classes.Card + " card"}>
                    <div className="card-header">
                        <h4 className="card-title">All Roles</h4>
                        <button className="btn btn-sm btn-danger float-right"
                                onClick={(e) => props.deleteAllRoles()}>Delete All Roles</button>
                    </div>
                    <div className="card-body">
                        <div className={classes.tableResponsive + " table-responsive"}>
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
                                                    className="btn btn-danger" type="button"
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
            <div className={classes.Backdrop} onClick={e => props.click(e, props.setModal, props.modal) }></div>
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