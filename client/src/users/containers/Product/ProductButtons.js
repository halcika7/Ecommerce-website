import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const ProductButtons = ({ inStock, sku, propsAddToCart }) => {

    const addToCart = e => {
        e.preventDefault();
        propsAddToCart(sku);
    }

    return (
        <div className="buttons">
            <button onClick={addToCart} className="btn btn-default add-to-cart">
                <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <div className="row ">
                <a href="/" className="compare"><i className="fas fa-sync"></i> Compare</a>
                <button href="#" className="wishlist">
                    <i className="fas fa-heart"></i> Wishlist
                </button>
            </div>
        </div>
    );
}

const dispatchToProps = dispatch => {
    return {
        propsAddToCart: (sku) => dispatch(actions.addToCart(sku))
    }
}

export default connect(null, dispatchToProps)(ProductButtons);