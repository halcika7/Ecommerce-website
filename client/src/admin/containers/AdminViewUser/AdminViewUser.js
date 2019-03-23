import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AdminViewUser = props => {

    const [user, setUser] = useState({});
    useEffect(() => { props.getUser(props.match.params.id); }, []);
    useEffect(() => { setUser({ ...user, ...props.User }); }, [props.User]);

    console.log(user)
    return (
        <div className="AdminProfile row">
            {props.failedMessage ? <ResponseMessages message={props.failedMessage} ClassName="Danger"/> : null }
            {props.successMessage ? <ResponseMessages message={props.successMessage} /> : null }
            <div className="col mb-30">
                {props.failedMessage ? null : 
                <div className="card text-white">
                    <div className="card-header">
                        <h5 className="title">{user.name} Profile</h5>
                    </div>
                    <div className="card-body">
                        <div className="row mb-10">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>{user.name} Picture</label>
                                    <img className="d-block" src={user.profilePicture ? `/${user.profilePicture}` : ''} alt={user.profilePicture ? `${user.profilePicture}` : ''} height="200"/>
                                </div>
                            </div>
                        </div>
                        <form className="">
                            <div className="row mb-10">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input value={user.name || ''} disabled type="text" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-10">
                                <div className="col">
                                    <div className="form-group">
                                        <label>User Name</label>
                                        <input value={user.username || ''} disabled type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-10">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input placeholder="Home Address" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-10">
                                <div className="pr-md-1 col-md-4">
                                    <div className="form-group">
                                        <label>Country</label>
                                        <input placeholder="Country" type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="px-md-1 col-md-4">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input placeholder="City" type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="pl-md-1 col-md-4">
                                    <div className="form-group">
                                        <label>Postal Code</label>
                                        <input placeholder="ZIP Code" type="number" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn-fill btn btn-primary">Save</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        User: state.allUsers.SingleUser,
        successMessage: state.allUsers.successMessage,
        failedMessage: state.allUsers.failedMessage
    }
}

const dispatchMapToProps = dispatch => {
    return {
        getUser: (id) => dispatch(actions.getSingleUser(id))
    }
}

export default connect(mapStateToProps, dispatchMapToProps)(AdminViewUser);