import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';
import c from './Cart.module.css';

import image from '../../assets/images/imgJordan.jpg';

const Cart = props => {

    useEffect(() => {
        document.title = "Cart";
    }, []);

    return(
        <React.Fragment>
            <div className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <Link to="/">Home</Link>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a href="/" className="prevent-click">Profile</a>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">Cart</a>
                    </div>
                </div>
            </div>
        
            <div className={c.container + " container " + c.cart}>
                <div className={c.row + " row"}>
                    <div className={c.collg8 + " col-lg-8"}>
                        <h4>Shopping Cart
                            <button className="btn btn-sm btn-danger" data-tooltip="Destroy Cart">Destroy Cart
                            </button>
                        </h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Qunatity</th>
                                    <th>Options</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={c.productname}>
                                            <div className={c.image}>
                                                <a href="/">
                                                    <img src={image} alt="" />
                                                </a>
                                            </div>
                                            <div className={c.name}>
                                                <a href="/">
                                                    Tablet Red Elite Book 
                                                    Revolve 810 G2
                                                </a> 
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <input type="number" name="quantity" id="quantity" min="1" />
                                    </td>
                                    <td>
                                        <div className={c.options}>
                                            <p>Color: red</p>
                                            <p>Size: 18inch</p>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 className={c.price}>$212,32.435</h6>
                                    </td>
                                    <td>
                                        <div className={c.buttons}>
                                            <a href="/" className="add-to-cart-wishlist" data-toggle="data-tooltip" data-placement="top" data-tooltip="Move to Save for Later">
                                                <i className={c.fasave + " far fa-save"}></i>
                                            </a>
                                            <a href="/" className="add-to-cart-wishlist" data-toggle="data-tooltip" data-placement="top" data-tooltip="Delete">
                                                <i className={c.fatrashalt + " far fa-trash-alt"}></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={c.productname}>
                                            <div className={c.image}>
                                                <a href="/">
                                                    <img src={image} alt="" />
                                                </a>
                                            </div>
                                            <div className={c.name}>
                                                <a href="/">
                                                    Tablet Red Elite Book 
                                                    Revolve 810 G2
                                                </a> 
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <input type="number" name="quantity" id="quantity" min="1" />
                                    </td>
                                    <td>
                                        <div className={c.options}>
                                            <p>Color: red</p>
                                            <p>Size: 18inch</p>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 className={c.price}>$212,32.435</h6>
                                    </td>
                                    <td>
                                        <div className={c.buttons}>
                                            <a href="/" className="add-to-cart-wishlist">
                                                <i className={c.facart + " fas fa-shopping-cart"}></i>
                                            </a>
                                            <a href="/" className="add-to-cart-wishlist">
                                                <i className={c.fatrashalt + " far fa-trash-alt"}></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={c.productname}>
                                            <div className={c.image}>
                                                <a href="/">
                                                    <img src={image} alt="" />
                                                </a>
                                            </div>
                                            <div className={c.name}>
                                                <a href="/">
                                                    Tablet Red Elite Book 
                                                    Revolve 810 G2
                                                </a> 
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <input type="number" name="quantity" id="quantity" min="1" />
                                    </td>
                                    <td>
                                        <div className={c.options}>
                                            <p>Color: red</p>
                                            <p>Size: 18inch</p>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 className={c.price}>$212,32.435</h6>
                                    </td>
                                    <td>
                                        <div className={c.buttons}>
                                            <a href="/" className="add-to-cart-wishlist">
                                                <i className={c.facart + " fas fa-shopping-cart"}></i>
                                            </a>
                                            <a href="/" className="add-to-cart-wishlist">
                                                <i className={c.fatrashalt + " far fa-trash-alt"}></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={c.col12 + " col-12"}>
                            <div className={c.input}>
                                <input type="text" name="couponcode" id="couponcode" placeholder="Enter Coupon Code" />
                            </div>
                            <div className="button-add-coupon">
                                <button className="btn btn-sm">Apply Coupon</button>
                            </div>
                        </div>
                    </div>
                    <div className={c.collg4 + " col-lg-4"}>
                        <div className={c.cart}>
                            <h4>Cart Totals</h4>
                            <div className={c.subtotal}>
                                <p>Subtotal:</p>
                                <p className={c.pricesubtotal}>$21,34</p>
                            </div>
                            <div className={c.shipping}>
                                <p>Shipping:</p>
                                <div className={c.shippingrates}>
                                    <div>
                                        <input id="flat-rate" name="shipping-rate" type="radio" />
                                        <label>Flat Rate: <span>$3.00</span></label>
                                    </div>
                                    <div className={c.freeshipping}>
                                        <input id="free-rate" name="shipping-rate" type="radio" />
                                        <label>Free Shipping</label>
                                    </div>
                                </div>
                            </div>
                            <div className={c.tax}>
                                <p>Tax(17%):</p>
                                <p className={c.taxmoney}>$234</p>
                            </div>
                            <div className={c.couponcode}>
                                <div>
                                    <p>Code(4230589458):</p>
                                    <button className="btn btn-sm btn-danger" data-toggle="data-tooltip" data-placement="top" data-tooltip="Remove Coupon">Remove</button>
                                </div>
                                <p className={c.minusmoney}>$212</p>
                            </div>
                            <hr/>
                            <div className={c.subtotal}>
                                <p>Subtotal:</p>
                                <p className={c.pricesubtotal}>$21,34</p>
                            </div>
                            <div className={c.tax}>
                                <p>Tax(17%):</p>
                                <p className={c.taxmoney}>$234</p>
                            </div>
                            <div className={c.subtotal}>
                                <p>Total:</p>
                                <p className="price-total">$21,34</p>
                            </div>
            
                            <div className={c.checkoutcart}>
                                <a href="/">Proceed to Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={c.container + " container " + c.cart}>
                <div className={c.col12 + " col-12 " + c.later}>
                    <h4>Saved for Later
                        <button className="btn btn-sm btn-danger" data-toggle="data-tooltip" data-placement="top" data-tooltip="Destroy Saved Items">
                            Destroy
                            <i className={c.fasave + " far fa-save"}></i>
                        </button>
                    </h4>
                    <table className={c.savedforlater}>
                        <tbody>
                            <tr>
                                <td>
                                    <div className={c.productname}>
                                        <div className={c.image}>
                                            <a href="/">
                                                <img src={image} alt="" />
                                            </a>
                                        </div>
                                        <div className={c.name}>
                                            <a href="/">
                                                Tablet Red Elite Book 
                                                Revolve 810 G2
                                            </a> 
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={c.buttons}>
                                        <a href="/" className="add-to-cart-wishlist" data-toggle="data-tooltip" data-placement="top" data-tooltip="Move to Cart">
                                            <i className={c.facart + " fas fa-shopping-cart"}></i>
                                        </a>
                                        <a href="/" className="add-to-cart-wishlist" data-toggle="data-tooltip" data-placement="top" data-tooltip="Delete">
                                            <i className={c.fatrashalt + " far fa-trash-alt"}></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className={c.productname}>
                                        <div className={c.image}>
                                            <a href="/">
                                                <img src={image} alt="" />
                                            </a>
                                        </div>
                                        <div className={c.name}>
                                            <a href="/">
                                                Tablet Red Elite Book 
                                                Revolve 810 G2
                                            </a> 
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={c.buttons}>
                                        <a href="/" className="add-to-cart-wishlist" data-toggle="data-tooltip" data-placement="top" data-tooltip="Move to Cart">
                                            <i className={c.facart + " fas fa-shopping-cart"}></i>
                                        </a>
                                        <a href="/" className="add-to-cart-wishlist" data-toggle="data-tooltip" data-placement="top" data-tooltip="Delete">
                                            <i className={c.fatrashalt + " far fa-trash-alt"}></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className={c.productname}>
                                        <div className={c.image}>
                                            <a href="/">
                                                <img src={image} alt="" />
                                            </a>
                                        </div>
                                        <div className={c.name}>
                                            <a href="/">
                                                Tablet Red Elite Book 
                                                Revolve 810 G2
                                            </a> 
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={c.buttons}>
                                        <a href="/" className="add-to-cart-wishlist" data-toggle="data-tooltip" data-placement="top" data-tooltip="Move to Cart">
                                            <i className={c.facart + " fas fa-shopping-cart"}></i>
                                        </a>
                                        <a href="/" className="add-to-cart-wishlist" data-toggle="data-tooltip" data-placement="top" data-tooltip="Delete">
                                            <i className={c.fatrashalt + " far fa-trash-alt"}></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    
            <ContainerIcons />
        </React.Fragment>
    );
}

export default Cart;