import React, { useState, useEffect } from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

const Price = ({ price, maxPrice, setPrice }) => {

    const [maxValue, setMaxValue] = useState(1);

    useEffect(() => {
        maxPrice > 0 && setMaxValue(maxPrice)
    }, []);

    useEffect(() => {
        maxPrice > 0 && setMaxValue(maxPrice)
    }, [maxPrice]);

    return (
        <div className="col-12">
            <p className="dropdown-category-links color">Price<i className="fas fa-angle-down color"></i></p>
            <div className="category-search-list price">
                <InputRange
                    draggableTrack
                    maxValue={maxValue}
                    minValue={0}
                    value={price}
                    formatLabel={value => `${value} $`}
                    onChangeComplete={value => console.log(value)}
                    onChange={value => setPrice(value)} />
            </div>
        </div>
    )

}

export default Price;