import React, { useState, useEffect } from 'react';
import * as actions from '../../../../store/actions';
import { connect } from 'react-redux';

import classes from './NewPassword.module.css';
import LoginRegisterInputs from '../../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';

const NewPassword = props => {

    const [passwords, setPasswords] = useState({});
    const [inputs] = useState([
        {name: 'password',placeholder: '*******',label: 'New Password',type: 'password'},
        {name: 'password2',placeholder: '*******',label: 'Confirm Password',type: 'password'}
    ]);

    useEffect(() => { setPasswords({...props.updatePasswordState}); }, []);
    
    useEffect(() => { setPasswords({...props.updatePasswordState}); }, [props.updatePasswordState]);

    const passwordChange = (e) => setPasswords({...passwords,[e.target.name]: e.target.value});

    const formSubmit = (e) => {
        e.preventDefault();
        props.updatePassword({
            password: passwords.password, 
            password2: passwords.password2, 
            username: props.userName
        });
    }

    return (
        <div className="col-md-6 mb-30">
            {!passwords.errors ? null : 
            <div className="card text-white h-100">
                <div className="card-header">
                    <h5 className="title">Change Password</h5>
                </div>
                <div className="card-body align-items-center d-flex">
                    <form className="w-100" onSubmit={formSubmit}>
                        <div className="row mb-10">
                            {inputs.map((input, index) =>
                                <div className="col-12" key={index} > 
                                <LoginRegisterInputs
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={passwords[input.name]}
                                    label={input.label}
                                    error={passwords.errors[input.name]}
                                    type={input.type}
                                    onChange={passwordChange}
                                    formBox='form-group'
                                    invalidInput='invalid'
                                    invalidFeedback='invalid-feedback'
                                    inputClass="form-control"
                                    />  
                                </div>  
                            )}
                        </div>
                        <button type="submit" className="btn-fill btn btn-primary">Change Password</button>
                    </form>
                </div>
            </div>}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        updatePasswordState: state.resetPassword,
        userState: state.login.User
    }
}

const dispatchMapToProps = dispatch => {
    return {
        updatePassword: (passwords) => dispatch(actions.updatePassword(passwords))
    }
}

export default connect(mapStateToProps, dispatchMapToProps)(NewPassword);