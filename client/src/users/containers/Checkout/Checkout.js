import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';

import c from './Checkout.module.css';

const Checkout = props => {

    useEffect(() => {
        document.title = "Checkout";
    }, []);

    return(
        <React.Fragment>
            <div className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <Link to="/">Home</Link>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">Checkout</a>
                    </div>
                </div>
            </div>

            <div className={c.container + " container " + c.checkout}>
                <div className={c.row + " row"}>
                    <div className={c.colmd7 + " col-md-7"}>
                        <h5>Billing details</h5>
                        <div className={c.row + " row"}>
                            <div className="col-12 col-md-6">
                                <label>First Name</label>
                                <br />
                                <input type="text" name="Name" id="name" />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Last Name</label>
                                <br />
                                <input type="text" name="Lname" id="Lname" />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Email</label>
                                <br />
                                <input type="email" name="email" id="email" />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Telephone</label>
                                <br />
                                <input type="tel" name="tel" id="tel" />
                            </div>
                            <div className="col-12">
                                <label>Country</label>
                                <br />
                                <select name="country" id="country">
                                    <option value="BIH">Bosnia and Herzegovina</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label>Address</label>
                                <br />
                                <input type="text" name="address" id="address" />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>City</label>
                                <br />
                                <input type="text" name="city" id="city" />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Postcode/Zip</label>
                                <input type="text" name="zip" id="zip" />
                            </div>
                        </div>
                        <h5>Credit Card Details</h5>
                        <div className={c.row + " row"}>
                            <div className="col-12">
                                <label>Name on card</label>
                                <br />
                                <input type="text" name="nameOnCard" id="nameOnCard" />
                            </div>
                            <div className="col-12">
                                <label>Credit card number</label>
                                <br />
                                <input type="text" name="cardNumber" id="cardNumber" />
                            </div>
                            <div className="col-12">
                                <label>Expiration</label>
                                <br />
                                <input type="text" name="expiration" id="expiration" />
                            </div>
                            <div className="col-12">
                                <label>CVC</label>
                                <br />
                                <input type="text" name="cvc" id="cvc" />
                            </div>
                        </div>
                        <label>Order Notes</label>
                        <br />
                        <textarea name="orderNotes" id="orderNotes" rows="5"></textarea>
                    </div>
                    <div className={c.colmd5 + " col-md-5"}>
                        <div className={c.cart}>
                            <h4>Cart Totals</h4>
                            <div className={c.products}>
                                <div className={c.heading}>
                                    <div className={c.options}>
                                        <p>Name</p>
                                        <p>Quantity</p>
                                        <p>Options</p>
                                    </div>
                                    <div className={c.details}>
                                        <div className="name">
                                            <p>Apple iPad Mini G2356</p>
                                        </div>
                                        <div className="quantity">
                                            <p>5</p>
                                        </div>
                                        <div className="options">
                                            <p>Color:red</p>
                                            <p>Size:M</p>
                                        </div>
                                    </div>
                                    <div className={c.details}>
                                        <div className="name">
                                            <p>Apple iPad Mini G2356</p>
                                        </div>
                                        <div className="quantity">
                                            <p>5</p>
                                        </div>
                                        <div className="options">
                                            <p>Color:red</p>
                                            <p>Size:M</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={c.subtotal}>
                                <p>Total:</p>
                                <p className={c.pricetotal}>$21,34</p>
                            </div>

                            <div className={c.checkoutcart}>
                                <a href="/">Place Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ContainerIcons />
        </React.Fragment>
    );
}

export default Checkout;