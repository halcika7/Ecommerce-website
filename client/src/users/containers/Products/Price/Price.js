import React from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

const Price = ({ price, setPrice, minValue, maxValue }) => (
    <div className="col-12">
        <p className="dropdown-category-links color">Price<i className="fas fa-angle-down color"></i></p>
        <div className="category-search-list price">
            <InputRange
                maxValue={maxValue}
                minValue={minValue === maxValue ? minValue-1 : minValue}
                value={price}
                formatLabel={value => `${value} $`}
                onChangeComplete={value => console.log(value)}
                onChange={value => setPrice(value)} />
        </div>
    </div>
)


export default Price;