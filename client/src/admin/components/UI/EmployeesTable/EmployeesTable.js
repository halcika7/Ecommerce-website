import React from 'react';

const EmployeesTable = props => {
  return (
    <div className="col-xl-8 mb-30">
      <div className="card card-statistics h-100">
        <div className="card-body">
          <h5 className="mb-15 card-title pb-0 border-0 text-white">Members Profiles </h5>
            <div className="table-responsive">
              <table className="table center-aligned-table mb-0 table-hover">
                <thead>
                  <tr className="text-white">
                    <th>Member</th>
                    <th>Name</th>
                    <th>Earnings</th>
                    <th>Sales</th>
                    <th>Reviews </th>
                    <th>Progress </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> <img className="img-fluid avatar-small" src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" alt="" /> </td>
                    <td>Iphone</td>
                    <td className="text-info">$520</td>
                    <td>250</td>
                    <td>
                      <ul className="list-unstyled">
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                      </ul>
                    </td>
                    <td>
                      <div className="progress progress-small mt-2">
                        <div className="skill2-bar bg-info" role="progressbar" style={{width: '80%'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
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

export default EmployeesTable;