import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './Product.css';
import FooterSocialIcons from '../../components/UI/FooterSocialIcons/FooterSocialIcons';
import ImageGalery from '../../components/UI/ImageGalery/ImageGalery';
import SelectProductOptions from './SelectProductOptions';

const Product = props => {
    const productID = props.match.params.id
    ? props.match.params.id
    : new URLSearchParams(props.location.search).get('id');
    const [socialIcons] = useState([
        {link: '/', icon: 'fab fa-facebook-f'},
        {link: '/', icon: 'fab fa-twitter'},
        {link: '/', icon: 'fab fa-instagram'},
        {link: '/', icon: 'fab fa-pinterest'},
        {link: '/', icon: 'fab fa-dribbble'},
        {link: '/', icon: 'fab fa-google'}
    ]);

    const [product, setProduct] = useState({});
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [choosenColor, setChoosenColor] = useState('');
    const [choosenSize, setChoosenSize] = useState('');

    const [optionPictures, setOptionPictures] = useState(0);

    const [aditionalPrice, setAditionalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(0);

    useEffect(() => {
        props.getProduct(productID);
    }, []);
    
	// useEffect(() => {
	// 	props.getProduct(productID);
    // }, [props.location.search, props.match.params]);

    useEffect(() => {
        setProduct({ ...props.product.singleProduct });
    }, [props.product.singleProduct]);

    useEffect(() => {
        if(Object.keys(product).length > 0) {
            setOptions();
        }
    }, [product]);

    useEffect(() => {
        if(choosenColor) {
            const newSizes = [];
            product.options.forEach(option => 
                option.color === choosenColor && option.options.forEach(opt => opt.quantity > 0 && newSizes.push(opt.size))
            )
            const findColorOptionIndex = product.options.findIndex(option => option.color === choosenColor);
            setFirstIndex(findColorOptionIndex);
            setOptionPictures(findColorOptionIndex);
            setSizes(newSizes);
        }
    }, [choosenColor]);

    useEffect(() => {
        if(choosenSize) {
            const sizeIndex = product.options[firstIndex].options.findIndex(option => option.size === choosenSize);
            setAditionalPrice(product.options[firstIndex].options[sizeIndex].aditionalPrice)
            setDiscount(product.options[firstIndex].options[sizeIndex].discount)
        }
    }, [choosenSize]);

    const setOptions = () => {
        const subCatName = product.subcategories[0].sub;
        const category = product.category;
        if(subCatName !== 'Projection Screens' && subCatName !== 'Games') {
            const newColors = product.options.map(option => option.color);
            setColors(newColors);
        }
    }

    return (
        <React.Fragment>
            <div className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <a href="{{route('home.index')}}">Home</a>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">Shop</a>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">{product.name}</a>
                    </div>
                </div>
            </div>

            <div className="container images">
                <div className="row">
                    {Object.keys(product).length > 0 && props.show && <ImageGalery images={product.options[optionPictures].pictures} />}
                    <div className="col-md-4 about-product">
                        <h4>{product.name}</h4>
                        <p className="category-name">{product.category}</p>
                        <div className="review">
                            <div className="stars">
                                <div className="star">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <p>(34)reviews</p>
                            </div>
                            <span className="availability">
                                <span className="badge">In Stock</span>
                            </span>
                        </div>
                        <p className="new-price">
                            Starting from: ${product.price}
                        </p>
                        <p className="description">
                            {product.smalldescription}
                        </p>
                        <p className="sku"><span>SKU: </span>Lorem ipsum</p>
                        {discount !== 0 && <p>Discount: {discount}%</p>}

                        <div className="options">
                            <div className="row">
                                {colors.length > 0 && <SelectProductOptions color={true} values={colors} change={setChoosenColor} value={choosenColor} label='Choose Product'/>}
                                {sizes.length > 0 && <SelectProductOptions size={true} values={sizes} change={setChoosenSize} value={choosenSize} label='Choose Product Size'/>}
                            </div>
                        </div>
                        <div className="buttons">
                            <button href="#" className="btn btn-default add-to-cart">
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <div className="row ">
                                <a href="/" className="compare"><i className="fas fa-sync"></i> Compare</a>
                                <button href="#" className="wishlist">
                                    <i className="fas fa-heart"></i> Wishlist
                                </button>
                            </div>
                        </div>
                        <FooterSocialIcons icons={socialIcons} />
                    </div>
                </div>
            </div>

            <div className="container-fluid about-product">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Description</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="true">Reviews</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="container">
                            <div className="row">
                                <div className="col description" dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <div className="container">
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-6">
                                    <h5>Based on 3 reviews</h5>
                                    <div className="review-score">
                                        <div className="scores">
                                            <p className="number">4.3</p>
                                            <p className="text">Average Score</p>
                                        </div>
                                    </div>
                                    <ul>
                                        <li className="five-star">
                                            <span className="stars">
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="number-star" id="number-star-5">
                                                3
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '85%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                        <li className="four-star">
                                            <span className="stars">
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="number-star">
                                                4
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '25%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                        <li className="three-star">
                                            <span className="stars">
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="number-star">
                                                3
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '25%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                        <li className="two-star">
                                            <span className="stars">
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="number-star">
                                                2
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '25%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                        <li className="one-star">
                                            <span className="stars">
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="number-star">
                                                0
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '25%'}}></div>
                                                </div>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h5>Add a review</h5>
                                    <div className="user-rating">
                                        Your rating
                                        <div className="stars-rating">
                                            <span className="star" data-value="1">
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="star" data-value="2">
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="star" data-value="3">
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="star" data-value="4">
                                                <i className="fa fa-star"></i>
                                            </span>
                                            <span className="star" data-value="5">
                                                <i className="fa fa-star"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="user-comment">
                                        <div className="wrapper-content-editabel">
                                            <div className="contenteditable" contentEditable="true" tabIndex="5"></div>
                                            <div className="navbar-content-editable"></div>
                                        </div>
                                        <button className="btn btn-default add-comment">Add Review</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row comments" style={{ margin: '0px' }}>
                                <div className="blog-post-comments">
                                    <ol className="blog-comment">
                                        <li className="comment">
                                            <div className="comment-author">
                                                <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                            </div>
                                            <div className="comment-text">
                                                <div className="top">
                                                    <span><b>Ali Tufan: </b></span>
                                                    <button className="like"><i className="fas fa-thumbs-up"></i>(50)</button>
                                                    <button className="dislike"><i className="fas fa-thumbs-down"></i>(4)</button>
                                                    <div className="stars-rating five-stars">
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and <b>Halcika</b>
                                                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                </div>
                                                <div className="comment-footer">
                                                    <button>
                                                        <i className="fas fa-reply"></i> Reply
                                                    </button>
                                                    <button>
                                                        <i className="far fa-edit"></i>
                                                    </button>
                                                    <button>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                    <button>
                                                        Replays(10)
                                                    </button>
                                                </div>
                                            </div>
                                            {/* <li className="comment comment-sub">
                                                <div className="comment-author">
                                                    <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                                </div>
                                                <div className="comment-text">
                                                    <div className="top">
                                                        <span><b>Ali Tufan: </b></span>
                                                        <button className="like"><i className="fas fa-thumbs-up"></i>(50)</button>
                                                        <button className="dislike"><i className="fas fa-thumbs-down"></i>(4)</button>
                                                    </div>
                                                    <div className="text">
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                    </div>
                                                    <div className="comment-footer">
                                                        <button>
                                                            <i className="fas fa-reply"></i> Reply
                                                        </button>
                                                        <button>
                                                            <i className="far fa-edit"></i>
                                                        </button>
                                                        <button>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                        <button>
                                                            Replays(10)
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* <li className="comment comment-sub-sub">
                                                    <div className="comment-author">
                                                        <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                                    </div>
                                                    <div className="comment-text">
                                                        <div className="top">
                                                            <span><b>Ali Tufan: </b></span>
                                                            <button className="like"><i className="fas fa-thumbs-up"></i>(50)</button>
                                                            <button className="dislike"><i className="fas fa-thumbs-down"></i>(4)</button>
                                                        </div>
                                                        <div className="text">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                        </div>
                                                    </div>
                                                </li> */}
                                            {/* </li> */} 
                                        </li>
                                        <li className="comment">
                                            <div className="comment-author">
                                                <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                            </div>
                                            <div className="comment-text">
                                                <div className="top">
                                                    <span><b>Ali Tufan: </b></span>
                                                    <button className="like"><i className="fas fa-thumbs-up"></i>(50)</button>
                                                    <button className="dislike"><i className="fas fa-thumbs-down"></i>(4)</button>
                                                    <div className="stars-rating five-stars">
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="comment">
                                            <div className="comment-author">
                                                <img src="{{asset('/img/profile5.jpg')}}" alt="" />
                                            </div>
                                            <div className="comment-text">
                                                <div className="top">
                                                    <span><b>Ali Tufan: </b></span>
                                                    <button className="like"><i className="fas fa-thumbs-up"></i>(50)</button>
                                                    <button className="dislike"><i className="fas fa-thumbs-down"></i>(4)</button>
                                                    <div className="stars-rating five-stars">
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <span className="star">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the lea</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        product: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProduct: (id) => dispatch(actions.getProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);