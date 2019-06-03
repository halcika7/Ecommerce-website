import React from 'react';
import ProductReview from './ProductReview';
import TimeAgo from 'react-timeago'

const AboutProduct = (
    { 
        name, 
        numberOfSales, 
        category, 
        brand, 
        inStock, 
        numberInStock, 
        price, 
        aditionalPrice, 
        discount, 
        subCat, 
        wifi, 
        bluetooth, 
        rating, 
        createdAt, 
        subcategories, 
        sku,
        dailyOffer,
        weeklyOffer
    }) => {
        const date = dailyOffer ? new Date(dailyOffer.expires).toDateString() : weeklyOffer ? new Date(weeklyOffer.expires).toDateString() : null;
    return (
        <React.Fragment>
            <h4>{name}</h4>
            <div className='d-flex justify-content-between mt-2'>
                <p className="sku m-0">
                    <span>Sold:</span> {numberOfSales}
                </p>
                <p className="sku m-0">
                    <span>Posted:</span> <TimeAgo date={createdAt} />
                </p>
            </div>
            <ProductReview inStock={inStock} numberInStock={numberInStock} rating={rating} />
            {dailyOffer && 
                <p>Product is on Daily discount and every product option is discounted by {dailyOffer.discount}%. This offer expires on {date}.</p>
            }
            {weeklyOffer && 
                <p>Product is on Daily discount and every product option is discounted by {weeklyOffer.discount}%. This offer expires on {date}.</p>
            }
            <p className="sku">
                <span>Category:</span> {category}
            </p>
            <p className="sku">
                <span>Brand:</span> {brand}
            </p>
            <p className="sku">
                <span>Subcategories:</span>
            </p>
            {subcategories.map((category, index) => 
                <React.Fragment key={index}>
                    {Array.isArray(category.sub) ? 
                        <div className='multy'>
                            <div className='multy-sub' >
                                {category.sub.map(subcat => 
                                    <span key={subcat}>{subcat}</span>
                                ) }
                            </div>
                        </div> : 
                        <div className='one-sub'>
                            <p className="">
                                <strong>Subcategory:</strong>
                            </p>
                            <span>{category.sub}</span>
                        </div>
                    }
                </React.Fragment>
            )}
            {sku && discount > 0 &&
                <p className="sku">
                    <span>Discount:</span> {discount}%
                </p>
            }
            {sku && 
                <p className="sku">
                    <span>SKU: </span>{sku}
                </p>
            }
            <p className="new-price mt-2">
                {discount === 0 && `Price: $${price + aditionalPrice}`}
                {discount !== 0 &&  `Price with Discount: $${(price + aditionalPrice) - ((price + aditionalPrice) / discount)} `}
            </p>
            {(subCat === 'Headphones' || subCat === 'Speakers') && 
                <p>Wir: <strong>{wifi.toString()}</strong></p>
            }
            {(subCat === 'Headphones' || subCat === 'Speakers') && 
                <p>Bluetooth: <strong>{bluetooth.toString()}</strong></p>
            }
        </React.Fragment>
    );
}

export default AboutProduct;