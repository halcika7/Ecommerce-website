import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe,
} from 'react-stripe-elements'

import c from './Checkout.module.css';
import './StripeComponent.css'

const StripeComponent = props => {

    const [name, setName] = useState('');

    const handleBlur = () => {
        console.log('[blur]');
      };
      const handleChange = (change) => {
        console.log('[change]', change);
      };
      const handleClick = () => {
        console.log('[click]');
      };
      const handleFocus = () => {
        console.log('[focus]');
      };
      const handleReady = () => {
        console.log('[ready]');
      };

      const handlePayment = async e => {
          e.preventDefault();
          try {
              let token = await props.stripe.createToken({ name, amount:1000 })
              console.log(token);
          }catch(err) {
              console.log(err);
          }
      }

      console.log(props)

    return(
        <div className={c.container + " container " + c.checkout}>
            <div className={c.row + " row"}>
                <div className={c.colmd7 + " col-md-7"}>
                    <h5>Billing details</h5>
                    <div className={c.row + " row"}>
                        <div className="col-12 col-md-6">
                            <label>First Name</label>
                            <input type="text" name="Name" placeholder='Enter your name'/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Last Name</label>
                            <input type="text" name="Lname" placeholder='Enter Last Name' />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Email</label>
                            <input type="email" name="email" placeholder='Enter email' />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Telephone</label>
                            <input type="tel" name="tel" placeholder='Enter Phone number'/>
                        </div>
                        <div className="col-12">
                            <label>Country</label>
                            <select name="country" placeholder="Choose Country">
                                {props.countries.map((country, index) =>
                                    <option value={country} key={index}>{country}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-12">
                            <label>Address</label>
                            <input type="text" name="address" placeholder='Enter Address' />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>City</label>
                            <input type="text" name="city" placeholder='Enter City'/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Postcode/Zip</label>
                            <input type="text" name="zip" placeholder='Enter Postcode/Zip' />
                        </div>
                    </div>
                    <h5>Credit Card Details</h5>
                    <div className={c.row + " row"}>
                        <div className="col-12">
                            <label>Name on card</label>
                            <input type="text" onChange={e => setName(e.target.value)} value={name} name="nameOnCard" placeholder='Enter name on card'/>
                        </div>
                        <div className="col-12">
                            <label>Credit card number</label>
                            <CardNumberElement
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onReady={handleReady}
                            />
                        </div>
                        <div className="col-12">
                            <label>Expiration</label>
                            <CardExpiryElement
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onReady={handleReady}
                            />
                        </div>
                        <div className="col-12">
                            <label>CVC</label>
                            <CardCVCElement
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onReady={handleReady}
                            />
                        </div>
                    </div>
                    <label>Order Notes</label>
                    <textarea name="orderNotes" rows="5" placeholder="Order Notes"></textarea>
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
                                    <div className="name"><p>Apple iPad Mini G2356</p></div>
                                    <div className="quantity"><p>5</p></div>
                                    <div className="options">
                                        <p>Color:red</p>
                                        <p>Size:M</p>
                                    </div>
                                </div>
                                <div className={c.details}>
                                    <div className="name"><p>Apple iPad Mini G2356</p></div>
                                    <div className="quantity"><p>5</p></div>
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
                            <a href="/" onClick={handlePayment}>Place Order</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default injectStripe(StripeComponent);