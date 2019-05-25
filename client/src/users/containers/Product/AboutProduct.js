import React from 'react';
import ProductReview from './ProductReview';

const AboutProduct = ({ name, numberOfSales, category, brand, inStock, numberInStock, price, aditionalPrice, discount, smalldescription, subCat, wifi, bluetooth }) => {
    return (
        <React.Fragment>
            <h4>{name} {numberOfSales} sold</h4>
            <p className="category-name mt-3">Category: {category}</p>
            <p className="category-name">Brand: {brand}</p>
            <ProductReview inStock={inStock} numberInStock={numberInStock} />
            <p className="new-price">
            {discount === 0 && `Price: $${price + aditionalPrice}`}
            {discount !== 0 &&  `Price with Discount: $${(price + aditionalPrice) - ((price + aditionalPrice) / discount)} `}
            </p>
            <p className="description">
                Description: {smalldescription}
            </p>
            <p className="sku"><span>SKU: </span>Lorem ipsum</p>
            {discount !== 0 && <p>Discount: {discount}%</p>}
            {(subCat === 'Headphones' || subCat === 'Speakers') && <p>Wir: <strong>{wifi.toString()}</strong></p>}
            {(subCat === 'Headphones' || subCat === 'Speakers') && <p>Bluetooth: <strong>{bluetooth.toString()}</strong></p>}
        </React.Fragment>
    );
}

export default AboutProduct;