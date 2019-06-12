import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getOrder, updateOrder } from '../../../store/actions';

import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import ToggleSwitchButton from '../../components/UI/Buttons/ToggleSwitchButton';

const Order = props => {
	const orderId = props.match.params.id
		? props.match.params.id
		: new URLSearchParams(props.location.search).get('id');
	const [order, setOrder] = useState({});
	const [shipped, setShipped] = useState(false);

	useEffect(() => {
		props.getOrder(orderId, props.history.push);
	}, []);
	useEffect(() => {
		props.getOrder(orderId, props.history.push);
	}, [props.location.search, props.match.params]);
	useEffect(() => {
		if (Object.keys(props.orders.order).length > 0) {
			setOrder({ ...props.orders.order });
			setShipped(props.orders.order.shipped);
		}
	}, [props.orders.order]);

	const updateOrder = e => {
		e.preventDefault();
		props.updateOrder(orderId, shipped, props.history.push);
	};

	return (
		<div className={'AdminProfile row'}>
			{props.orders.failedMessage && (
				<ResponseMessage
					message={props.orders.failedMessage}
					ClassName="Danger"
				/>
			)}
			{props.orders.successMessage && (
				<ResponseMessage message={props.orders.successMessage} />
			)}
			<div className={'col-12 mb-30'}>
				<div className="Card card text-white">
					<div className="card-header">
						<h4 className="text-white">Order: {orderId}</h4>
					</div>
					<div className="card-body">
						<div className="col-12">
							<form>
								<div className="row">
									<div className="col-12 mb-3">User ID: {order.userId}</div>
									<div className="col-12 col-sm-4 col-md-3 mb-3">
										First Name: {order.firstName}
									</div>
									<div className="col-12 col-sm-4 col-md-3 mb-3">
										Last Name: {order.lastName}
									</div>
									<div className="col-12 col-sm-4 col-md-3 mb-3">
										Address: {order.address}
									</div>
									<div className="col-12 col-sm-4 col-md-3 mb-3">
										City: {order.city}
									</div>
									<div className="col-12 col-sm-4 col-md-3 mb-3">
										Country: {order.country}
									</div>
									<div className="col-12 col-sm-4 col-md-3 mb-3">
										Telephone: {order.telephone}
									</div>
									{Object.keys(order).length > 0 &&
										order.orderNotes.length > 0 && (
											<div className="col-12 mb-3">
												Order Notes:
												<label className="d-block">{order.orderNotes}</label>
											</div>
										)}
									<div className="col-12 col-sm-4 col-md-3 mb-3">
										Zip/Postal code: {order.zip}
									</div>
									<div className="col-12 mb-3">Email: {order.email}</div>
									<div className="col-12 mb-3">
										{props.edit && Object.keys(order).length > 0 && (
											<ToggleSwitchButton
												name="Shipped"
												value={shipped}
												setValue={setShipped}
												error={''}
											/>
										)}
										{props.view &&
											Object.keys(order).length > 0 &&
											'Shipped: ' + order.shipped.toString().toUpperCase()}
									</div>
									<h5 className="mt-3 mb-4 col-12">Ordered Products</h5>
									{Object.keys(order).length > 0 &&
										order.products.map((product, index) => (
											<div className="col-12 mb-3" key={index}>
												<div className="d-flex flex-wrap">
													<div
														className="productImg"
														style={{ width: '280px', maxWidth: '100%' }}>
														<img
															className="w-100"
															src={'/' + product.picture}
															alt={product.name}
														/>
													</div>
													<div className="productInfo ml-3">
														<label className="d-block">
															Product Name: {product.name}
														</label>
														<label className="d-block">
															Product SKU: {product.sku}
														</label>
														<label className="d-block">
															Product Quantity: {product.quantity}
														</label>
														{Object.keys(product.options).map(
															(option, index) => (
																<label
																	className="d-block"
																	key={index}
																	style={{ textTransform: 'capitalize' }}>
																	{option}: {product.options[option]}
																</label>
															)
														)}
													</div>
												</div>
											</div>
										))}
								</div>
								{props.edit && (
									<button className="btn btn-sm mt-20" onClick={updateOrder}>
										Update Order
									</button>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	orders: state.orders
});

const mapDispatchToProps = dispatch => ({
	getOrder: (id, callBack) => dispatch(getOrder(id, callBack)),
	updateOrder: (id, value, callBack) =>
		dispatch(updateOrder(id, value, callBack))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Order);
