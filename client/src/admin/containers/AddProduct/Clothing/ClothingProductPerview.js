import React from 'react';

const ClothingProductPerview = props => {
    return (
        <div className="col-12">
            <label>Color: {props.data.color}</label>
            {props.data.options.map((option, index) => 
                <div key={index} >
                    <label className='d-block'>Aditional Price: {option.aditionalPrice}</label>
                    <label className='d-block'>Discount: {option.discount}</label>
                    <label className='d-block'>Quantity: {option.quantity}</label>
                    <label className='d-block'>Size: {option.size}</label>
                </div>    
            )}
        </div>
    );
}

export default ClothingProductPerview;