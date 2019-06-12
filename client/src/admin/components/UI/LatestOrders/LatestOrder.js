import React from 'react';
import { Link } from 'react-router-dom';

const LatestOrders = ({ orders }) => {
	console.log(orders);
	return (
		<div className="col-xl-8 mb-30">
			<div className="card">
				<div className="card-body">
					<h4 className="mt-0 header-title mb-4 text-white">
						Latest Trasaction
					</h4>
					<div className="table-responsive">
						<table className="table table-hover" style={{ color: '#fff' }}>
							<thead>
								<tr>
									<th scope="col">Order Id</th>
									<th scope="col">User Id</th>
									<th scope="col">Name</th>
									<th scope="col">Date</th>
									<th scope="col">Amount</th>
									<th scope="col" colSpan="2">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order, index) => (
									<tr key={index}>
										<th scope="row">{order._id}</th>
										<th scope="row">{order.userId}</th>
										<td>
											{order.firstName} {order.lastName}
										</td>
										<td>{order.email}</td>
										<td>${order.payed}</td>
										<td>
											<span
												className={
													order.shipped
														? 'badge badge-success'
														: 'badge badge-danger'
												}>
												{order.shipped.toString().toUpperCase()}
											</span>
										</td>
										<td>
											<div>
												<Link to={`/admindashboard/edit-order?id=${order._id}`} className="btn btn-primary btn-sm">
													Edit
												</Link>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LatestOrders;
