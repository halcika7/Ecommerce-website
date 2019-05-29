import React from 'react';

const ProductButtons = ({ inStock }) => {
    return (
        <div className="buttons">
            {inStock && 
                <button href="#" className="btn btn-default add-to-cart">
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
            }
            <div className="row ">
                <a href="/" className="compare"><i className="fas fa-sync"></i> Compare</a>
                <button href="#" className="wishlist">
                    <i className="fas fa-heart"></i> Wishlist
                </button>
            </div>
        </div>
    );
}

export default ProductButtons;