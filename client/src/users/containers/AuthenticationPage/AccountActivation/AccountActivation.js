import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import * as actions from '../../../../store/actions';
import classes from '../AuthPage.module.css';
import ResponseMessage from '../../../components/UI/ResponseMessages/ResponseMessages';
import Spinner from '../../../components/UI/Spinner/Spinner';

const AccountActivation = props => {

    const [messages, setMessages] = useState({});

    useEffect(() => {setMessages({...props.activation}); checkToken(); }, []);

    useEffect(() =>  { setMessages({ ...props.activation });}, [props.activation]);

    const checkToken = () => {
        const query = new URLSearchParams(props.location.search).get('token');
        const localStorageToken = localStorage.getItem('activationToken');

        console.log(query === localStorage)
        console.log(query)
        console.log(localStorageToken)

        if(!query || !localStorageToken) {
            setMessages({...messages, redirect: true });
        }else if(localStorageToken !== query) {
            console.log('hahaha')
            setMessages({ ...messages, redirect: true });
        }else {
            const decoded = jwt_decode(localStorageToken);
            const user = { email: decoded.email }
            props.activateAccount(user);
        }
    }

    const onFormSubmit = e => {
        e.preventDefault();
        const decoded = jwt_decode(localStorage.getItem('activationToken'));
        const user = { email: decoded.email }
        props.resendActivationLink(user);
    }

    return (
        <React.Fragment>
            {messages.successMessage ? <Spinner /> :
            <React.Fragment>
                {messages.redirect ? <Redirect to='/authentication' /> : (
                <React.Fragment>
                    {messages.successMessage ? <ResponseMessage message={messages.successMessage} /> : null}
                    {messages.failedMessage ? <ResponseMessage ClassName="Danger" message={messages.failedMessage} /> : null}
                    <section className={classes.flatAccount}>
                        <div className={classes.container + " container"}>
                            <div className="row justify-content-center">
                                <div className={classes.formContainer + " col-md-6"}>
                                    <div className={classes.formLogin}>
                                        <div className={classes.title}>
                                            <h3>Activate Account</h3>
                                        </div>
                                        <form onSubmit={onFormSubmit}>
                                            <div className={classes.formBox + ' ' + classes.formBoxActivation}>
                                                <button type="submit" className="login">Send Activation Link</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>)}
            </React.Fragment>}
        </React.Fragment>
    );

}

const mapStateToProps = state => {
    return {
        activation: state.register.activation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        activateAccount: (activationObject) => dispatch(actions.activateAccount(activationObject)),
        resendActivationLink: mail => dispatch(actions.resendActivationLink(mail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountActivation);