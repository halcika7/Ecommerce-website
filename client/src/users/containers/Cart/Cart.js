import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteFromCart, updateCartItem, setCart, moveToSaveForLater, moveToCart, deleteFromSavedForLater } from '../../../store/actions'
import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';
import c from './Cart.module.css';

import ResponseMessage from '../../components/UI/ResponseMessages/ResponseMessages';

const Cart = props => {

    useEffect(() => { document.title = "Cart" }, []);

    const removeFromCart = (e, sku) => { e.preventDefault(); props.removeFromCart(sku); }
    const deleteFromSavedForLater = (e, sku) => { e.preventDefault(); props.deleteFromSavedForLater(sku); }

    const destroyCart = e => {
        e.preventDefault();
        localStorage.removeItem('cart');
        props.setCart();
    }

    const destroySaveForLater = e => {
        e.preventDefault();
        localStorage.removeItem('saveforlater');
        props.setCart();
    }
    const updateCartItem = (e, sku) => { e.preventDefault(); props.updateCartItem(sku, e.target.value); }
    const moveToSaveForLater = (e, sku) => { e.preventDefault(); props.moveToSaveForLater(sku); }
    const moveToCart = (e, sku) => { e.preventDefault(); props.moveToCart(sku); }

    return(
        <React.Fragment>
            {props.cart.failedMessage && <ResponseMessage ClassName="Danger" message={props.cart.failedMessage} />}
            {props.cart.successMessage && <ResponseMessage message={props.cart.successMessage} />}
            <div className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <Link to="/">Home</Link>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">Cart</a>
                    </div>
                </div>
            </div>
        
            <div className={c.container + " container " + c.cart}>
                <div className={c.row + " row"}>
                    <div className={c.collg8 + " col-lg-8"}>
                        <h4>Shopping Cart {props.cart.cartItems.length > 0 && <button onClick={destroyCart} className="btn btn-sm btn-danger" data-tooltip="Destroy Cart">Destroy Cart</button>}</h4>
                        {props.cart.cartItems.length > 0 ? 
                            <table>
                                <thead><tr><th>Product Name</th><th>SKU</th><th></th><th>Quantity</th><th>Aditional Price</th><th>Discount</th><th>Options</th><th>Total</th><th></th></tr></thead>
                                <tbody>
                                    {props.cart.cartItems.map((item, index) => 
                                        <tr key={index}>
                                            <td>
                                                <div className={c.productname}>
                                                    <div className={c.image}>
                                                        <Link to={`/product?id=${item._id}`}>
                                                            <img src={item.featuredPicture} alt={item.name} />
                                                        </Link>
                                                    </div>
                                                    <div className={c.name}><Link to={`/product?id=${item.id}`}>{item.name}</Link></div>
                                                </div>
                                            </td>
                                            <td>{item.sku}</td>
                                            <td>
                                                {item.display && <p>{item.display}''</p>}
                                                {item.console && <p>{item.console}</p>}
                                                {item.color && 
                                                    <p style={{ backgroundColor: item.color.toLowerCase(), color: 'white', mixBlendMode: 'difference', padding: '5px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.color}</p>
                                                }
                                            </td>
                                            <td>
                                                <input type="number" min="1" value={item.quantity} onChange={e => updateCartItem(e, item.sku)} />
                                            </td>
                                            <td>$ {item.aditionalPrice}</td>
                                            <td><p>{item.discount} %</p></td>
                                            <td>
                                                <div className={c.options}>
                                                    {Object.keys(item.options).length > 0 ?
                                                        Object.keys(item.options).map(option => <p key={option}>{option}: {item.options[option].toString()}</p> ) :
                                                        <p>No options</p>
                                                    }
                                                </div>
                                            </td>
                                            <td><h6 className={c.price}>${item.total}</h6></td>
                                            <td>
                                                <div className={c.buttons}>
                                                    <a href="/" className="add-to-cart-wishlist" onClick={e => moveToSaveForLater(e, item.sku)} data-toggle="data-tooltip" data-tooltip="Move to Save for Later">
                                                        <i className={c.fasave + " far fa-save"}></i>
                                                    </a>
                                                    <a href="/" onClick={e => removeFromCart(e, item.sku)} className="add-to-cart-wishlist" data-toggle="data-tooltip" data-tooltip="Delete">
                                                        <i className={c.fatrashalt + " far fa-trash-alt"}></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table> :
                            <h1>No Products in Cart</h1>
                        }
                        {props.cart.cartItems.length > 0 && 
                            <div className={c.col12 + " col-12"}>
                                <div className={c.input}><input type="text" name="couponcode" id="couponcode" placeholder="Enter Coupon Code" /></div>
                                <div className="button-add-coupon"><button className="btn btn-sm">Apply Coupon</button></div>
                            </div>
                        }
                    </div>
                    <div className={c.collg4 + " col-lg-4"}>
                        <div className={c.cart}>
                            <h4>Cart Totals</h4>
                            <div className={c.subtotal}>
                                <p>Subtotal:</p>
                                <p className={c.pricesubtotal}>${props.cart.totals.subtotal}</p>
                            </div>
                            <div className={c.tax}>
                                <p>Tax(17%):</p>
                                <p className={c.taxmoney}>$ {props.cart.totals.tax}</p>
                            </div>
                            {/* <div className={c.couponcode}>
                                <div>
                                    <p>Code(4230589458):</p>
                                    <button className="btn btn-sm btn-danger" data-toggle="data-tooltip" data-placement="top" data-tooltip="Remove Coupon">Remove</button>
                                </div>
                                <p className={c.minusmoney}>$212</p>
                            </div> */}
                            <hr/>
                            <div className={c.subtotal}>
                                <p>Subtotal:</p>
                                <p className={c.pricesubtotal}>$ {props.cart.totals.subtotal}</p>
                            </div>
                            <div className={c.tax}>
                                <p>Tax(17%):</p>
                                <p className={c.taxmoney}>$ {props.cart.totals.tax}</p>
                            </div>
                            <div className={c.subtotal}>
                                <p>Total:</p>
                                <p className="price-total">$ {props.cart.totals.total}</p>
                            </div>
                            <div className={c.checkoutcart}>
                                <a href="/">Proceed to Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={c.container + " container " + c.cart}>
                <div className={c.collg12 + " col-12 mb-4"}>
                    <h4>Saved for Later 
                        {props.cart.saveForLaterItems.length > 0 && <button onClick={destroySaveForLater} className="btn btn-sm btn-danger ml-2" data-tooltip="Destroy Saved for Later">Destroy Saved for Later</button>}
                    </h4>
                    {props.cart.saveForLaterItems.length > 0 ? 
                        <table>
                            <thead><tr><th>Product Name</th><th>SKU</th><th></th><th>Quantity</th><th>Aditional Price</th><th>Discount</th><th>Options</th><th>Total</th><th></th></tr></thead>
                            <tbody>
                                {props.cart.saveForLaterItems.map((item, index) => 
                                    <tr key={index}>
                                        <td>
                                            <div className={c.productname}>
                                                <div className={c.image}>
                                                    <Link to={`/product?id=${item._id}`}>
                                                        <img src={item.featuredPicture} alt={item.name} />
                                                    </Link>
                                                </div>
                                                <div className={c.name}><Link to={`/product?id=${item.id}`}>{item.name}</Link></div>
                                            </div>
                                        </td>
                                        <td>{item.sku}</td>
                                        <td>
                                            {item.display && <p>{item.display}''</p>}
                                            {item.console && <p>{item.console}</p>}
                                            {item.color && 
                                                <p style={{ backgroundColor: item.color.toLowerCase(), color: 'white', mixBlendMode: 'difference', padding: '5px', borderRadius: '5px' }}>{item.color}</p>
                                            }
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>$ {item.aditionalPrice}</td>
                                        <td>{item.discount} %</td>
                                        <td>
                                            <div className={c.options}>
                                                {Object.keys(item.options).length > 0 ?
                                                    Object.keys(item.options).map(option => <p key={option}>{option}: {item.options[option].toString()}</p> ) :
                                                    <p>No options</p>
                                                }
                                            </div>
                                        </td>
                                        <td><h6 className={c.price}>${item.total}</h6></td>
                                        <td>
                                            <div className={c.buttons}>
                                                <a href="/" onClick={e => moveToCart(e, item.sku)} className="add-to-cart-wishlist" data-toggle="data-tooltip" data-tooltip="Move to Cart">
                                                    <i className={c.fasave + " fas fa-shopping-cart"}></i>
                                                </a>
                                                <a href="/" onClick={e => deleteFromSavedForLater(e, item.sku)} className="add-to-cart-wishlist" data-toggle="data-tooltip" data-tooltip="Delete">
                                                    <i className={c.fatrashalt + " far fa-trash-alt"}></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table> :
                        <h1>No Products Saved for Later</h1>
                    }
                </div>
            </div>
    
            <ContainerIcons />
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (sku) => dispatch(deleteFromCart(sku)),
        deleteFromSavedForLater: (sku) => dispatch(deleteFromSavedForLater(sku)),
        updateCartItem: (sku, value) => dispatch(updateCartItem(sku, value)),
        moveToSaveForLater: (sku) => dispatch(moveToSaveForLater(sku)),
        moveToCart: (sku) => dispatch(moveToCart(sku)),
        setCart: () => dispatch(setCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);