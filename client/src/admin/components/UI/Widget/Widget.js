import React from 'react';
import classes from './Widget.module.css';

const Widget = props => {
    return(
        <div className="col-xl-3 col-sm-6 col-12 mb-30">
            <div className="card">
                <div className={classes.ecommerceWidget + " card-body"}>
                    <div className="row">
                        <div className="col-8">
                            <h4 className={classes.totalNum + " counter"}>459</h4>
                            <span>Total Products</span>
                        </div>
                        <div className="col-4">
                            <div className={classes.icon + " " + classes.textMdRight}>
                                <i className="fas fa-box"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Widget;