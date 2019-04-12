import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';
import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const Brand = props => {
    return (
        <div className={'AdminProfile row'}>
            <div className={'col-12 mb-30'}>
                {/* {props.roles.loading ? (
                    <React.Fragment>
                        <div className={"card bg-white"}>
                            <div className="card-header">
                                <h4 className="text-dark">Add Role</h4>
                            </div>
                            <SmallSpinner />
                        </div>
                    </React.Fragment>
                ) :  */}
                <React.Fragment>
                    <div className="Card card">
                        <div className="card-header">
                            {props.addbrand && <h4 className="text-white">Add Brand</h4>}
                            {props.viewbrand && <h4 className="text-white">Add Brand</h4>}
                            {props.editbrand && <h4 className="text-white">Add Brand</h4>}
                        </div>
                        <div className="card-body">
                            <div className="col-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="text-white">Brand Name</label>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                    </div>
                                    {props.addbrand && <button className="btn btn-sm mt-20">Add New Brand</button>}
                                    {props.editbrand && <button className="btn btn-sm mt-20">Update Brand</button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {}
}

const maDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, maDispatchToProps)(Brand);