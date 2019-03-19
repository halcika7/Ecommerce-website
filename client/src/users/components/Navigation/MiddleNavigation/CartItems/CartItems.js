import React from 'react';
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom';

import c from '../../Navigation.module.css';

const cartItems = (props) => {
    let subtotal = 0;
    const items = props.items.map( (item,index) => {
        subtotal += (item.qty * item.new);
        return <CartItem key={index} item={item} />
    });

    return(
        <React.Fragment>
            {subtotal !== 0 ? (
                <ul className={c.cartAll}>
                    {items}
                    <li className={c.cartSubtotal}>
                        <span>Subtotal:</span> <p className={c.subtotalp}>${subtotal}</p>
                    </li>
                    <li className={c.cartButtons}>
                        <Link className={c.viewCart} to="/cart" aria-label="cart">View Cart</Link>
                        <Link className={c.checkout} to="/checkout" aria-label="checkout">Checkout</Link>
                    </li>
                </ul>
                )
        : (
            <ul className={c.cartAll}>
                <p>Cart Is empty</p>
            </ul>
            )}
        </React.Fragment>
    );
}

export default cartItems;