import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import jwt_decode from 'jwt-decode';

import classes from '../AuthPage.module.css';
import LoginRegisterInputs from '../../../components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ResponseMessages from '../../../components/UI/ResponseMessages/ResponseMessages';
import Spinner from '../../../components/UI/Spinner/Spinner';

const ResetPassword = props => {

    const [token, setToken] = useState({});

    const [State, SetState] = useState({});

    const [inputs] = useState([
        {name: 'password',placeholder: '*******',label: 'Password',type: 'password'},
        {name: 'password2',placeholder: '*******',label: 'Confirm Password',type: 'password'}
    ]);

    useEffect(() => {checkLocalStorageToken(); SetState({...props.resetState});}, []);

    useEffect(() => { SetState({...State, ...props.resetState}); checkLocalStorageToken();}, [props.resetState]);

    const changePasswordValue = e => {
        e.preventDefault();
        SetState({ ...State, [e.target.name]: e.target.value});
    }

    const onFormSubmit = e => {
        e.preventDefault();
        const decoded = jwt_decode(localStorage.resetpasswordtoken);
        const token = localStorage.resetpasswordtoken.replace('Bearer ', '');
        const passwords = {
            password: State.password,
            password2: State.password2,
            email: decoded.email,
            token
        }
        props.resetpasswordFunc(passwords);
    }

    const checkLocalStorageToken = () => {
        const query = new URLSearchParams(props.location.search).get('token');
        const localStorageToken = localStorage.getItem('resetpasswordtoken');

        if(!query || !localStorageToken) {
            setToken(false)
        }else if(localStorageToken !== query) {
            setToken(false);
        }
    }

    return (
        <React.Fragment>
            {!State.errors ? <Spinner /> :
            <React.Fragment>
                {token === false ? <Redirect to={props.resetState.redirectTo} /> : (
                    <React.Fragment>
                        {State.errors.expiredToken ? <ResponseMessages ClassName="Danger" message={State.errors.expiredToken} /> : null}
                        {State.failedMessage ? <ResponseMessages ClassName="Danger" message={State.failedMessage} /> : null}
                        {State.successMessage ? <ResponseMessages message={State.successMessage} /> : null}
                        <div className={classes.title}>
                            <h3>Reset Password</h3>
                        </div>
                        <form onSubmit={onFormSubmit}>
                        {inputs.map((input, index) => 
                            <LoginRegisterInputs
                                key={index} 
                                name={input.name}
                                placeholder={input.placeholder}
                                value={State[input.name]}
                                label={input.label}
                                error={State.errors[input.name]}
                                type={input.type}
                                onChange={changePasswordValue}
                                formBox={classes.formBox}
                                invalidFeedback={classes.invalidFeedback}
                                invalidInput={classes.invalid}
                                    />    
                            )}
                            <div className={classes.formBox}>
                                <button type="submit" className="login">Reset Password</button>
                            </div>
                        </form>
                    </React.Fragment>
                )}
            </React.Fragment>}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        resetState: state.resetPassword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetpasswordFunc: (passwords) => dispatch(actions.resetPassword(passwords))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);