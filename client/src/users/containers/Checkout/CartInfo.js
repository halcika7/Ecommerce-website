import React from 'react';
import c from './Checkout.module.css';

const CartInfo = props => (
    <div className={c.colmd5 + " col-md-5"}>
        <div className={c.cart}>
            <h4>Cart Totals</h4>
            <div className={c.products}>
                <div className={c.heading}>
                    <div className={c.options}>
                        <p>Product Name</p>
                        <p>SKU</p>
                        <p></p>
                        <p>Quantity</p>
                        <p>Aditional Price</p>
                        <p>Discount</p>
                        <p style={{ minWidth: '160px' }}>Options</p>
                        <p>Total</p>
                    </div>
                    {props.cartItems.map((item, index) => 
                        <React.Fragment key={index}>
                            <div className={(props.productErrors.length > 0 && props.productErrors[index].error) ? 'invalid ' + c.details : c.details}>
                                <div className="name">
                                    <p>{item.name}</p>
                                </div>
                                <div className="quantity">
                                    <p>{item.sku}</p>
                                </div>
                                <div className="quantity">
                                    {item.display && <p>{item.display}''</p>}
                                    {item.console && <p>{item.console}</p>}
                                    {(item.color && item.color.toLowerCase() !== 'white') && 
                                        <p style={{ backgroundColor: item.color.toLowerCase(), color: 'white', padding: '5px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.color}</p>
                                    }
                                    {(item.color && item.color.toLowerCase() === 'white') && 
                                        <p style={{ backgroundColor: item.color.toLowerCase(), color: 'black', padding: '5px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.color}</p>
                                    }
                                </div>
                                <div className="quantity">
                                    <p>{item.quantity}</p>
                                </div>
                                <div className="quantity">
                                    <p>$ {item.aditionalPrice}</p>
                                </div>
                                <div className="quantity">
                                    <p>{item.discount} %</p>
                                </div>
                                <div className={c.Options}>
                                    {Object.keys(item.options).length > 0 ?
                                        Object.keys(item.options).map(option => <p key={option}>{option}: {item.options[option].toString()}</p> ) :
                                        <p>No options</p>
                                    }
                                </div>
                                <div className="quantity">
                                    <p>$ {item.total}</p>
                                </div>
                            </div>
                            {props.productErrors.length > 0 && <div className='invalid-feedback'>{ props.productErrors[index].error }</div>}
                        </React.Fragment>
                    )}
                </div>
            </div>
            {Object.keys(props.coupon).length > 0 && 
                <React.Fragment>
                    <div className={c.subtotal}>
                        <p>Subtotal:</p>
                        <p className={c.pricesubtotal}>${props.totals.subtotalBefore}</p>
                    </div>
                    <div className={c.couponcode}>
                        <p className={Object.keys(props.couponErrors).length > 0 ? 'invalid' : ''}>Code({props.coupon.code}): -{(props.coupon.type === 'percent') ? props.coupon.value+'%' : '$'+props.coupon.value}</p>
                        {Object.keys(props.couponErrors).length > 0 && <div className='invalid-feedback'>{ props.couponErrors }</div>}
                    </div>
                    <hr/>
                </React.Fragment>
            }
            <div className={c.subtotal}>
                <p>Subtotal:</p>
                <p className={c.pricetotal}>${props.totals.subtotal}</p>
            </div>
            <div className={c.subtotal}>
                <p>Tax(17%):</p>
                <p className={c.pricetotal}>${props.totals.tax}</p>
            </div>
            <div className={c.subtotal}>
                <p>Total:</p>
                <p className={c.pricetotal}>${props.totals.total}</p>
            </div>
            <div className={c.checkoutcart}>
                <a href="/" onClick={props.handlePayment}>Place Order</a>
            </div>
        </div>
    </div>
)


export default CartInfo;