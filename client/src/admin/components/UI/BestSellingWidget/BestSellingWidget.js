import React from 'react';

const BestSellingWidget = props => {
  return (
    <div className="col-xl-4 mb-30">
      <div className="card card-statistics h-100">
        <div className="card-body">
          <h5 className="card-title text-white">Best Selling Items</h5>
          <ul className="list-unstyled">
            <li className="mb-20">
              <div className="media">
                <div className="position-relative">
                  <img className="img-fluid mr-15 avatar-small" src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" alt="" />
                </div> 
                <div className="media-body  text-white">
                  <h6 className="mt-0 mb-0">Car dealer <span className="float-right text-danger"> 8,561</span>  </h6>
                  <p>Automotive WordPress Theme </p>
                </div>
              </div>
              <div className="divider dotted mt-20"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BestSellingWidget;