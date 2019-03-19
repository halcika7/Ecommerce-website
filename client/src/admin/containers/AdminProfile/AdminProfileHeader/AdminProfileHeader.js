import React from 'react';

import classes from './AdminProfileHeader.module.css';

const AdminProfileHeader = props => {
    return (
        <div className="col-lg-12 mb-30">
            <div className="card">
                <div className="card-body">
                    <div className={classes.userBg}>
                        <div className={classes.userInfo}>
                            <div className="row mb-30">
                                <div className="col-lg-6 d-flex align-items-center flex-wrap">
                                    <div className={classes.userDp}><img src={'\\' + props.user.profilePicture} alt="" /></div>
                                    <div className={classes.userDetail}>
                                        <h2 className="name">{props.user.name}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-none d-md-flex text-white">
                                <div className="col-md-3">
                                    <div className="ttl-info text-left">
                                        <h6>
                                            <i className="fa fa-envelope"></i>
                                            &nbsp;&nbsp;&nbsp;Email
                                        </h6>
                                        <span>{props.user.email}</span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="ttl-info text-left">
                                        <h6>
                                            <i className="fa fa-calendar"></i>
                                            &nbsp;&nbsp;&nbsp;BOD
                                        </h6>
                                        <span>02 January 1988</span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="ttl-info text-left">
                                        <h6>
                                            <i className="fa fa-calendar"></i>
                                            &nbsp;&nbsp;&nbsp;Company
                                        </h6>
                                        <span>HalcStore</span>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="ttl-info text-left">
                                        <h6>
                                            <i className="fa fa-calendar"></i>
                                            &nbsp;&nbsp;&nbsp;Employed
                                        </h6>
                                        <span>02 January 1988</span>
                                    </div>
                                </div>
                            </div>              
                        </div>              
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfileHeader;