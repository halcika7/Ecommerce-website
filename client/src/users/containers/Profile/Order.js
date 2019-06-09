import React from 'react';

import classes from './Order.module.css';

const Order = props => (
	<div className={classes.wrapper}>
		<div className={classes.modal}>
			<div className="container">
				<div className="row">
					<div className="col-12 text-center mb-5">
						<h3 className={classes.heading}>Order Id: {props.order._id}</h3>
					</div>
					<h4 className="col-12 mb-5 text-center">Order Details</h4>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">First Name</label>
						<span>{props.order.firstName}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">Last Name</label>
						<span>{props.order.lastName}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">Email</label>
						<span>{props.order.email}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">Telephone</label>
						<span>{props.order.telephone}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">Country</label>
						<span>{props.order.country}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">Address</label>
						<span>{props.order.address}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">City</label>
						<span>{props.order.city}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">Zip</label>
						<span>{props.order.zip}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">Order notes</label>
						<span>{props.order.orderNotes}</span>
					</div>
					<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
						<label className="d-block">Payed</label>
						<span>$ {props.order.payed}</span>
					</div>
					{props.order.coupon && props.order.coupon.applied && (
						<div className={classes.col + ' col-12 col-sm-4 col-md-3 mb-3'}>
							<label className="d-block">Coupon</label>
							<span>Haris</span>
						</div>
					)}
				</div>
				<h4 className="mb-4">Ordered Products</h4>
				<div className={classes.flexRow}>
					{props.order.products &&
						props.order.products.map((product, index) => (
							<div className={classes.flexProduct} key={index}>
								<div className={classes.productName}>
									<img src={product.picture} alt={product.name} />
									{product.name}
								</div>
								<div className="form-group ml-3">
									<label className="d-block">SKU: {product.sku}</label>
									<label className="d-block">
										Quantity: {product.quantity}
									</label>
									<div className="d-flex flex-column">
										{Object.keys(product.options).map((option, index) => (
											<label className={classes.capitalize} key={index}>
												{option}: {product.options[option]}
											</label>
										))}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className={classes.close} onClick={props.setShowOrder}>
				<i className="fas fa-times" />
			</div>
		</div>
		<div className={classes.backdrop} onClick={props.setShowOrder} />
	</div>
);

export default Order;
