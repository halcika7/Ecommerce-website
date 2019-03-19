import React from 'react';

const AdminProfileEdit = props => {
    return (
        <div className="col mb-30">
            <div className="card text-white">
                <div className="card-header">
                    <h5 className="title">Edit Profile</h5>
                </div>
                <div className="card-body">
                    <form className="">
                        <div className="row mb-10">
                            <div className="col">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input placeholder="Name" type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-10">
                            <div className="col">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input placeholder="User Name" type="text" className="form-control" />
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
            </div>
        </div>
    );
}

export default AdminProfileEdit;