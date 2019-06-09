import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';
import { processPayment } from '../../../store/actions';

import c from './Checkout.module.css';
import './StripeComponent.css'
import CartInfo from './CartInfo';
import ResponseMessages from '../../components/UI/ResponseMessages/ResponseMessages';

const StripeComponent = props => {

    const [cardElementErrors, setCardElementsErrors] = useState({ cardNumber: '', cardExpiry: '', cardCvc: '' });
    const [inputs, setInputs] = useState({ firstName: '', lastName: '', email: '', telephone: '', country: '', address: '', city: '', zip: '', notes: '' });
    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', telephone: '', country: '', address: '', city: '', zip: '', products: [], coupon: {} });

    useEffect(() => { setErrors({ ...props.errors }); }, [props.errors]);
    useEffect(() => { 
        if(Object.keys(props.inputs).length > 0) {
            setInputs({ ...props.inputs });
        }
    }, [props.inputs]);

    const handleChange = (change) => {
        if(change.error && Object.keys(change.error).length > 0) {
            setCardElementsErrors({ ...cardElementErrors, [change.elementType]: change.error.message})
        }
    };

    const handlePayment = async e => {
        e.preventDefault();
        try {
            if(props.userId) {
                const { token } = await props.stripe.createToken({ name: props.userId });
                const userData = { userId: props.userId, firstName: inputs.firstName, lastName: inputs.lastName, email: inputs.email, telephone: inputs.telephone, country: inputs.country, address: inputs.address, city: inputs.city, zip: inputs.zip, notes: inputs.notes };
                if(token) {
                    props.payment(token, userData, props.callBack);
                    setInputs({ firstName: '', lastName: '', email: '', telephone: '', country: '', address: '', city: '', zip: '', notes: '' });
                }
            }
        }catch(err) {
            console.log('err',err);
        }
    }

    const inputOnChnage = e => {
        e.preventDefault();
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    return(
        <div className={c.container + " container mb-3 " + c.checkout}>
            {props.failedMessage && <ResponseMessages ClassName='Danger' message={props.failedMessage} />}
            {props.successMessage && <ResponseMessages message={props.successMessage} />}
            <div className={c.row + " row"}>
                <div className={c.colmd7 + " col-md-7"}>
                    <h5>Billing details</h5>
                    <div className={c.row + " row"}>
                        <div className="col-12 col-md-6">
                            <label>First Name</label>
                            <input type="text" name="firstName" onChange={inputOnChnage} placeholder='Enter your name' value={inputs.firstName} className={errors.firstName ? 'invalid' : ''}/>
                            {errors.firstName && <div className='invalid-feedback'>{ errors.firstName }</div>}
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Last Name</label>
                            <input type="text" name="lastName" onChange={inputOnChnage} placeholder='Enter Last Name' value={inputs.lastName} className={errors.lastName ? 'invalid' : ''} />
                            {errors.lastName && <div className='invalid-feedback'>{ errors.lastName }</div>}
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Email</label>
                            <input type="email" name="email" onChange={inputOnChnage} placeholder='Enter email' value={inputs.email} className={errors.email ? 'invalid' : ''} />
                            {errors.email && <div className='invalid-feedback'>{ errors.email }</div>}
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Telephone</label>
                            <input type="tel" name="telephone" onChange={inputOnChnage} placeholder='Enter Phone number' value={inputs.telephone} className={errors.telephone ? 'invalid' : ''}/>
                            {errors.telephone && <div className='invalid-feedback'>{ errors.telephone }</div>}
                        </div>
                        <div className="col-12">
                            <label>Country</label>
                            <select name="country" onChange={inputOnChnage} placeholder="Choose Country" value={inputs.country} className={errors.country ? 'invalid' : ''}>
                                {props.countries.map((country, index) =>
                                    <option value={country.code} key={index}>{country.name}</option>
                                )}
                            </select>
                            {errors.country && <div className='invalid-feedback'>{ errors.country }</div>}
                        </div>
                        <div className="col-12">
                            <label>Address</label>
                            <input type="text" name="address" onChange={inputOnChnage} placeholder='Enter Address' value={inputs.address} className={errors.address ? 'invalid' : ''} />
                            {errors.address && <div className='invalid-feedback'>{ errors.address }</div>}
                        </div>
                        <div className="col-12 col-md-6">
                            <label>City</label>
                            <input type="text" name="city" onChange={inputOnChnage} placeholder='Enter City' value={inputs.city} className={errors.city ? 'invalid' : ''}/>
                            {errors.city && <div className='invalid-feedback'>{ errors.city }</div>}
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Postcode/Zip</label>
                            <input type="text" name="zip" onChange={inputOnChnage} placeholder='Enter Postcode/Zip' value={inputs.zip} className={errors.zip ? 'invalid' : ''} />
                            {errors.zip && <div className='invalid-feedback'>{ errors.zip }</div>}
                        </div>
                    </div>
                    <h5>Credit Card Details</h5>
                    <div className={c.row + " row"}>
                        <div className="col-12">
                            <label>Credit card number</label>
                            <CardNumberElement onChange={handleChange} />
                            {cardElementErrors.cardNumber && <div className='invalid-feedback'>{ cardElementErrors.cardNumber }</div>}
                        </div>
                        <div className="col-12">
                            <label>Expiration</label>
                            <CardExpiryElement onChange={handleChange} />
                            {cardElementErrors.cardExpiry && <div className='invalid-feedback'>{ cardElementErrors.cardExpiry }</div>}
                        </div>
                        <div className="col-12">
                            <label>CVC</label>
                            <CardCVCElement onChange={handleChange} />
                            {cardElementErrors.cardCvc && <div className='invalid-feedback'>{ cardElementErrors.cardCvc }</div>}
                        </div>
                    </div>
                    <label>Order Notes</label>
                    <textarea name="notes" rows="5" placeholder="Order Notes" onChange={inputOnChnage}></textarea>
                </div>
                <CartInfo coupon={props.coupon} cartItems={props.cartItems} totals={props.totals} handlePayment={handlePayment} productErrors={errors.products} couponErrors={errors.coupon} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    coupon: state.cart.coupon,
    totals: state.cart.totals,
    errors: state.cart.errors,
    inputs: state.cart.inputs,
    failedMessage: state.cart.failedMessage,
    successMessage: state.cart.successMessage,
    userId: state.login.User.id
});

const mapDispatchToProps = dispatch => ({
    payment: (token, userData, callBack) => dispatch(processPayment(token, userData, callBack))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(StripeComponent));