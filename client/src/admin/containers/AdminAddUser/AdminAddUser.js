import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import UploadPicture from '../../components/UI/UploadPicture/UploadPicture';

const AdminAddUser = props => {

    const [roles, setRoles] = useState([]);
    const [inputs] = useState([
        {
            label: 'Date of Birth',
            type: 'date',
            classInout: 'form-control',
            name: 'bod',
            change: () => dateChange,
            placeholder: 'Date of Birth'
        }
    ])

    useEffect(() => {
        props.getRoles();
    }, []);

    useEffect(() => {
        setRoles(props.roles);
    }, [props.roles]);

    const dateChange = e => {
        e.preventDefault();

        console.log(e.target.value)
    }

    return (
        <div className="AdminProfile row">
            <div className="col mb-30">
                <form className="">
                    <div className="card text-white">
                        <div className="card-header">
                            <h5 className="title">Add New Employee</h5>
                        </div>
                        <div className="card-body row">
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" className="form-control" name="bod" onChange={dateChange}/>
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Date of Employment</label>
                                    <input type="date" className="form-control" name="doe" onChange={dateChange}/>
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input placeholder="Name" name="name" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Role</label>
                                    <input placeholder="Name" name="name" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input placeholder="User Name" type="text" name="username" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input placeholder="Email" type="email" name="email" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input placeholder="**********" type="password" name="password" className="form-control" />
                                </div>
                            </div>
                            {/* <div className="col-12 mb-10">
                                <div className="form-group">
                                    <label className="d-block">Profile Picture</label>
                                    <UploadPicture name="profilePicture" />
                                </div>
                            </div> */}
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Facebook Link</label>
                                    <input placeholder="Home Address" type="text" className="form-control" name="f-link" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Instagram Link</label>
                                    <input placeholder="Home Address" type="text" name="i-link" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Github Link</label>
                                    <input placeholder="Home Address" type="text" name="g-link" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Twitter Link</label>
                                    <input placeholder="Home Address" type="text" name="t-link" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input placeholder="Home Address" type="number" name="salary" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Telephone</label>
                                    <input placeholder="Home Address" type="text" name="phone" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Country</label>
                                    <input placeholder="Home Address" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input placeholder="Home Address" type="text" name="address" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>City</label>
                                    <input placeholder="Home Address" type="text" name="city" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-10">
                                <div className="form-group">
                                    <label>Postal Code</label>
                                    <input placeholder="Home Address" type="text" name="zipCode" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn-fill btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* {roles.Roles ? roles.Roles.map( (item, index) => {
                console.log(item)
                return <div key={index}>jfoiaf</div>
            }) : null} */}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        roles: state.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRoles: () => dispatch(actions.getRoles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddUser);