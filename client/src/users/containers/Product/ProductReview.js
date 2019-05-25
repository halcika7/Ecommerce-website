import React from 'react';

const ProductReview = ({ inStock, numberInStock }) => {
    return (
        <div className="review">
            <div className="stars">
                <div className="star">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
                <p>(34)reviews</p>
            </div>
            <span className="availability">
                <span className={inStock && numberInStock ? "badge valid" : 'badge notvalid'}>{inStock && numberInStock ? numberInStock + ' In Stock' : 'Out of stock'}</span>
            </span>
        </div>
    );
}

export default ProductReview;