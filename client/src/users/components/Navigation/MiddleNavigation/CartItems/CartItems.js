import React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../../store/actions'
import {Link} from 'react-router-dom';

import c from '../../Navigation.module.css';

const cartItems = (props) => {

    const removeFromCart = (e, sku) => {
        e.preventDefault();
        props.deleteFromCart(sku)
    }

    return(
        <div className={c.cartAll}>
            {props.cart.cartItems.length > 0 ?
                <ul >
                    {props.items.map((item, index) => 
                        <li key={index}>
                            <Link to={`/product?id=${item._id}`} >
                                <img src={item.featuredPicture} alt={item.name} />
                            </Link>
                            <Link to={`/product?id=${item._id}`} >
                                <h6>{item.name}</h6>
                            </Link>
                            <span>SKU: {item.sku}</span>
                            <p> {item.quantity} x ${item.price} </p>
                            <span 
                                className={c.span} 
                                data-toggle="data-tooltip" 
                                data-placement="left" 
                                data-tooltip="Delete from Cart"
                                onClick={e => removeFromCart(e,item.sku)}>X</span>
                        </li>    
                    )}
                </ul> :
                <ul >
                    <p>Cart Is empty</p>
                </ul>
            }
            {Object.keys(props.cart.coupon).length > 0 && 
                <React.Fragment>
                    <div className='d-flex justify-content-between mt-2 mb-2 text-dark font-weight-light'>
                        <span className='font-weight-bold'>Subtotal: </span> <p className='m-0'> ${props.cart.totals.subtotalBefore}</p>
                    </div>
                    <div className='d-flex justify-content-between mt-2 mb-2 text-dark font-weight-light'>
                        <span className='font-weight-bold'>Code({props.cart.coupon.code}): </span> <p className='m-0'>-{(props.cart.coupon.type === 'percent') ? props.cart.coupon.value+'%' : '$'+props.cart.coupon.value}</p>
                    </div>
                    <hr style={{ borderTop: '1px solid rgba(0,0,0,0.1)', height: '1px' }}/>
                </React.Fragment>
            }
            <div className='d-flex justify-content-between mt-2 mb-2 text-dark font-weight-light'>
                <span className='font-weight-bold'>Subtotal: </span> <p className='m-0'> ${props.cart.totals.subtotal}</p>
            </div>
            <div className='d-flex justify-content-between mt-2 mb-2 text-dark font-weight-light'>
                <span className='font-weight-bold'>Tax(17%): </span> <p className='m-0'> ${props.cart.totals.tax}</p>
            </div>
            <div className='d-flex justify-content-between mt-2 mb-2 text-dark font-weight-light'>
                <span className='font-weight-bold'>Total: </span> <p className='m-0'> ${props.cart.totals.total}</p>
            </div>
            <div className={c.cartButtons}>
                <Link className={c.viewCart} to="/cart" aria-label="cart">View Cart</Link>
                <Link className={c.checkout} to="/checkout" aria-label="checkout">Checkout</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteFromCart: (sku) => dispatch(deleteFromCart(sku))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(cartItems);