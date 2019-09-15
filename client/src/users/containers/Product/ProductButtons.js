import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const ProductButtons = ({ inStock, sku, propsAddToCart }) => {
	const addToCart = e => {
		e.preventDefault();
		propsAddToCart(sku);
	};

	return (
		<div className="buttons">
			<button onClick={addToCart} className="btn btn-default add-to-cart">
				<i className="fas fa-shopping-cart" /> Add to Cart
			</button>
			<div className="row ">
				<a href="/" className="compare">
					<i className="fas fa-sync" /> Compare
				</a>
				<button href="#" className="wishlist">
					<i className="fas fa-heart" /> Wishlist
				</button>
			</div>
		</div>
	);
};

const dispatchToProps = dispatch => {
	return {
		propsAddToCart: sku => dispatch(actions.addToCart(sku))
	};
};

export default React.memo(connect(
	null,
	dispatchToProps
)(ProductButtons));
