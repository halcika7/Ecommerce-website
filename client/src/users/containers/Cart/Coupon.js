import React from 'react';
import c from './Cart.module.css';

const Coupon = props => {
	return (
		<div className={c.col12 + ' col-12'}>
			<div className={c.input}>
				<input
					type="text"
					name="couponcode"
					onChange={e => props.setCoupon(e.target.value)}
					placeholder="Enter Coupon Code"
				/>
			</div>
			<div className="button-add-coupon">
				<button className="btn btn-sm" onClick={props.applyCoupon}>
					Apply Coupon
				</button>
			</div>
		</div>
	);
};

export default Coupon;
