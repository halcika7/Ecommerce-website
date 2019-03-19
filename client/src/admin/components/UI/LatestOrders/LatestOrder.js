import React from 'react';

const LatestOrders = props => {
    return (
        <div className="col-xl-8 mb-30">
            <div className="card">
                <div className="card-body">
                    <h4 className="mt-0 header-title mb-4 text-white">Latest Trasaction</h4>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">(#) Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col" colSpan="2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">#14256</th>
                                    <td>
                                        <div>
                                            <img src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" alt="" className="thumb-md rounded-circle mr-2" /> Philip Smead
                                        </div>
                                    </td>
                                    <td>15/1/2018</td>
                                    <td>$94</td>
                                    <td>
                                        <span className="badge badge-success">Delivered</span>
                                    </td>
                                    <td>
                                        <div>
                                            <a href="/" className="btn btn-primary btn-sm">Edit</a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LatestOrders;