import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

import classes from './AdminProfile.module.css';
import Spinner from '../../../users/components/UI/Spinner/Spinner';
import AdminProfileHeader from './AdminProfileHeader/AdminProfileHeader';
import AdminProfileEdit from './AdminProfileEdit/AdminProfileEdit';
import AdminNewPassword from './AdminNewPassword/AdminNewPassword';
import AdminChangeProfilePicture from './AdminChangeProfilePicture/AdminChangeProfilePicture';
import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AdminProfile = props => {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser({
            ...props.user
        });
    }, []);

    useEffect(() => {
        setUser({
            ...user,
            ...props.user
        });
    }, [props.user]);

    if(! user.User){
        return <Spinner />;
    }
    return(
        <React.Fragment>
            {props.user.failedMessage ? <ResponseMessage ClassName="Danger" message={props.user.failedMessage} /> : null}
            {props.user.successMessage ? <ResponseMessage message={props.user.successMessage} /> : null}
            {props.updatePasswordSuccessMessage ? <ResponseMessage message={props.updatePasswordSuccessMessage} /> : null}
            <div className={classes.AdminProfile + " row"}>
                <AdminProfileHeader user={user.User}/>
            </div>
            <div className={classes.AdminProfile + " row"}>
                <AdminProfileEdit/>
            </div>
            <div className={classes.AdminProfile + " row"}>
                <AdminNewPassword userName={props.user.User.username} rememberMe={props.user.User.rememberMe}/>
                <AdminChangeProfilePicture submit={props.updateUser} user={props.user.User} remember={props.user.rememberMe}/>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        user: state.login,
        updatePasswordSuccessMessage: state.resetPassword.successMessage
    };
};

const mapDispatchToProps = dispatch => {
    return{
        updateUser: (formData,config) => dispatch(actions.userUpdateProfilePicture(formData,config))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminProfile);