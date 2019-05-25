import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './Product.css';
import FooterSocialIcons from '../../components/UI/FooterSocialIcons/FooterSocialIcons';
import ImageGalery from '../../components/UI/ImageGalery/ImageGalery';
import SelectProductOptions from './SelectProductOptions';
import SmallSpinner from '../../components/UI/SmallSpinner/SmallSpinner';
import Breadcrumb from '../../components/UI/Breadcrumb/Breadcrumb';
import ProductButtons from './ProductButtons';
import AboutProduct from './AboutProduct';

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
    const [subCat, setSubCat] = useState('');
    const [subCatName, setSubCatName] = useState('');
    const [sizeLabel, setSizeLabel] = useState('');
    const [optionLabeledBy, setOptionLabeledBy] = useState([]);
    const [sizes, setSizes] = useState( [] );

    // for computers
    const [graphics, setGraphics] = useState([]);
    const [ssd, setSSD] = useState([]);
    const [hdd, setHDD] = useState( [] );
    const [extra, setExtra] = useState({});
    // laptop
    const [resolution, setResolution] = useState([]);

    const [choosenLabeledBy, setChoosenLabeledBy] = useState('');
    const [choosenSize, setChoosenSize] = useState('');
    const [choosenGraphics, setChoosenGraphics] = useState('');
    const [choosenSSD, setChoosenSSD] = useState('');
    const [choosenHDD, setChoosenHDD] = useState('');
    const [choosenResolution, setChoosenResolution] = useState('');

    const [optionPictures, setOptionPictures] = useState(0);

    const [aditionalPrice, setAditionalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const [firstIndex, setFirstIndex] = useState(0);

    const [inStock, setInStock] = useState(false);
    const [numberInStock, setNumberInStock] = useState(0);

    useEffect( () => {
        setSubCat( '' );
        setSubCatName('');
        props.getProduct(productID);
    }, [] );
    
    useEffect( () => {
        setSubCat( '' );
        setSubCatName('');
		props.getProduct(productID);
	}, [props.location.search, props.match.params]);

    useEffect(() => {
        setProduct({ ...props.product.singleProduct });
    }, [props.product.singleProduct]);

    useEffect(() => {
        if(Object.keys(product).length > 0) {
            setSubCatName(product.subcategories[0].sub)
            setSubCat(product.subcategories[0].subName)
            setOptions();
        }
    }, [product]);

    useEffect(() => {
        if ( choosenLabeledBy ) {
            setSizes( [] );
            const newSizes = [];
            let findLabeledByOptionIndex = null;
            let newNumberInStock = null;
            if ( subCat !== 'Headphones' || subCat !== 'Camera & Photo' || subCat !== 'Speakers' || subCatName !== 'Console' || subCatName !== 'Blue-ray Players & Recorders' || subCatName !== 'DVD Players & Recorders' || subCatName !== 'Projectors' || subCatName !== 'Games' ) {
                if ( product.category !== 'Electronics' ) {
                    product.options.forEach( option => 
                        option.color === choosenLabeledBy && option.options.forEach(opt => opt.quantity > 0 && newSizes.push(opt.size))
                    )
                    setSizeLabel('Choose Product Size');
                }
                if ( subCatName === 'Tablets' || subCatName === 'Phones' ) {
                    product.options.forEach( option => 
                        option.color === choosenLabeledBy && option.options.forEach(opt => opt.quantity > 0 && newSizes.push(opt.memory))
                    )
                    setSizeLabel('Select Product Memory');
                }
                if ( subCatName === 'Desktop Computers' || subCatName === 'Laptops' ) {
                    product.options.forEach( option => 
                        option.color === choosenLabeledBy && option.options.forEach(opt => opt.quantity > 0 && newSizes.push(opt.ram))
                    )
                    setSizeLabel('Select Product Ram');
                }
                findLabeledByOptionIndex = product.options.findIndex(option => option.color === choosenLabeledBy);
                newSizes.length === 0 ? setInStock(false) : setInStock(true);
            }
            if(subCatName === 'Games') {
                findLabeledByOptionIndex = product.options.findIndex(option => option.console === choosenLabeledBy);
                newNumberInStock = product.options[findLabeledByOptionIndex].options[0].quantity;
                setNumberInStock(newNumberInStock);
            }
            if( subCat === 'Headphones' || subCat === 'Camera & Photo' || subCat === 'Speakers' || subCatName === 'Console' || subCatName === 'Blue-ray Players & Recorders' || subCatName === 'DVD Players & Recorders' || subCatName === 'Projectors' ) {
                findLabeledByOptionIndex = product.options.findIndex(option => option.color === choosenLabeledBy);
                newNumberInStock = product.options[findLabeledByOptionIndex].options[0].quantity;
                setNumberInStock(newNumberInStock);
            }
            setFirstIndex(findLabeledByOptionIndex);
            setOptionPictures(findLabeledByOptionIndex);
            setSizes(newSizes);
        }
    }, [choosenLabeledBy]);

    useEffect(() => {
        if(choosenSize) {
            let sizeIndex = null;
            if ( subCat !== 'Headphones' || subCat !== 'Camera & Photo' || subCat !== 'Speakers' || subCatName !== 'Console' || subCatName !== 'Blue-ray Players & Recorders' || subCatName !== 'DVD Players & Recorders' || subCatName !== 'Projectors' || subCatName !== 'Games' ) {
                if ( product.category === 'Clothing' || product.category === 'Shoes' ) {
                    sizeIndex = product.options[firstIndex].options.findIndex( option => option.size === choosenSize );
                    setNumberInStock( product.options[firstIndex].options[sizeIndex].quantity );
                    setAditionalPrice(product.options[firstIndex].options[sizeIndex].aditionalPrice)
                    setDiscount(product.options[firstIndex].options[sizeIndex].discount)
                }
                if ( subCatName === 'Tablets' || subCatName === 'Phones' ) {
                    sizeIndex = product.options[firstIndex].options.findIndex( option => option.memory === choosenSize );
                    setNumberInStock( product.options[firstIndex].options[sizeIndex].quantity );
                    setAditionalPrice(product.options[firstIndex].options[sizeIndex].aditionalPrice)
                    setDiscount(product.options[firstIndex].options[sizeIndex].discount)
                }
                if ( subCatName === 'Desktop Computers' || subCatName === 'Laptops' ) {
                    const graphics = [];
                    sizeIndex = product.options[firstIndex].options.findIndex( option => option.ram === choosenSize );
                    product.options[firstIndex].options.forEach( option => {
                        if ( option.ram === choosenSize ) { 
                            graphics.push( option.graphics );
                        }
                    } )
                    setGraphics( graphics );
                }
            }
        }
    }, [choosenSize] );
    
    useEffect(() => {
        if(choosenGraphics) {
            let sizeIndex = null;
            if ( subCatName === 'Desktop Computers' || subCatName === 'Laptops' ) {
                const ssd = [];
                sizeIndex = product.options[firstIndex].options.findIndex( option => (option.graphics === choosenGraphics && option.ram === choosenSize) );
                product.options[firstIndex].options.forEach( option => {
                    if ( option.ram === choosenSize && option.graphics === choosenGraphics ) { 
                        ssd.push( option.ssd );
                    }
                } )
                setSSD( ssd );
            }
        }
    }, [choosenGraphics] );
    
    useEffect( () => {
        if(choosenSSD) {
            let sizeIndex = null;
            if ( subCatName === 'Desktop Computers' || subCatName === 'Laptops' ) {
                const hdd = [];
                sizeIndex = product.options[firstIndex].options.findIndex( option => (option.graphics === choosenGraphics && option.ram === choosenSize && option.ssd === choosenSSD) );
                product.options[firstIndex].options.forEach( option => {
                    if ( option.ram === choosenSize && option.graphics === choosenGraphics && option.ssd === choosenSSD) { 
                        hdd.push( option.hdd );
                    }
                } )
                setHDD( hdd );
            }
        }
    }, [choosenSSD] );
    
    useEffect( () => {
        if(choosenHDD) {
            if ( subCatName === 'Laptops' ) {
                const resolution = [];
                product.options[firstIndex].options.forEach( option => {
                    if ( option.ram === choosenSize && option.graphics === choosenGraphics && option.ssd === choosenSSD && option.hdd === choosenHDD) { 
                        resolution.push( option.resolution );
                    }
                } )
                setResolution( resolution );
            }
            if ( subCatName === 'Desktop Computers' ) {
                const extra = {};
                product.options[firstIndex].options.forEach( option => {
                    if ( option.ram === choosenSize && option.graphics === choosenGraphics && option.ssd === choosenSSD && option.hdd === choosenHDD) { 
                        extra.withMouse = option.withMouse;
                        extra.withDisplay = option.withDisplay;
                        extra.withKeyboard = option.withKeyboard;
                    }
                } )
                setExtra( extra );
                const sizeIndex = product.options[firstIndex].options.findIndex( option => (option.ram === choosenSize && option.graphics === choosenGraphics && option.ssd === choosenSSD && option.hdd === choosenHDD) );
                setNumberInStock( product.options[firstIndex].options[sizeIndex].quantity );
                setAditionalPrice(product.options[firstIndex].options[sizeIndex].aditionalPrice)
                setDiscount(product.options[firstIndex].options[sizeIndex].discount)
            }
        }
    }, [choosenHDD]);

    const setOptions = () => {
        const subName = product.subcategories[0].subName;
        const sub = product.subcategories[0].sub;
        let newLabeledBy = null;
        if(subName !== 'Headphones' || subName !== 'Camera & Photo' || subName !== 'Speakers' || sub !== 'Console' || sub !== 'Blue-ray Players & Recorders' || sub !== 'DVD Players & Recorders' || sub !== 'Projectors' || sub !== 'Games') {
            newLabeledBy = product.options.map(option => option.color);
            newLabeledBy.length === 0 ? setInStock(false) : setInStock(true);
        }
        if(sub === 'Games') {
            newLabeledBy = [];
            product.options.forEach(option => {
                option.options[0].quantity > 0 && newLabeledBy.push(option.console);
            });
            newLabeledBy.length === 0 ? setInStock(false) : setInStock(true);
        }
        if( subName === 'Headphones' || subName === 'Camera & Photo' || subName === 'Speakers' || sub === 'Console' || sub === 'Blue-ray Players & Recorders' || sub === 'DVD Players & Recorders' || sub === 'Projectors' ) {
            newLabeledBy = [];
            product.options.forEach(option => {
                option.options[0].quantity > 0 && newLabeledBy.push(option.color);
            });
            newLabeledBy.length === 0 ? setInStock(false) : setInStock(true);
        }
        setOptionLabeledBy(newLabeledBy);
    }

    return (
        <React.Fragment>
            {Object.keys(product).length === 0 ?
                <div className='card' style={{ minHeight: '60vh' }}>
                    <SmallSpinner />
                </div> :
                <React.Fragment>
                    <Breadcrumb links={[ { link: '/', value: 'Home' }, { link: '/', value: 'Shop' }, { link: `/product?id=${productID}`, value: product.name } ]} />

                    <div className="container images">
                        <div className="row">
                            {Object.keys(product).length > 0 && props.show && <ImageGalery images={product.options[optionPictures].pictures} />}
                            <div className="col-md-4 about-product">
                                <AboutProduct name={product.name} numberOfSales={product.numberOfsales} category={product.category} brand={product.brand} inStock={inStock} numberInStock={numberInStock} price={product.price} aditionalPrice={aditionalPrice} discount={discount} smalldescription={product.smalldescription} subCat={subCat} wifi={product.wifi} bluetooth={product.bluetooth} />

                                <div className="options">
                                    <div className="row">
                                        {optionLabeledBy.length > 0 && (subCatName !== 'Projection Screens' && subCatName !== 'Games' && subCatName !== '') && <SelectProductOptions color={true} values={optionLabeledBy} change={setChoosenLabeledBy} value={choosenLabeledBy} label='Choose Product'/>}
                                        
                                        {(optionLabeledBy.length > 0 && subCatName === 'Games' && subCatName !== '') && <SelectProductOptions size={true} values={optionLabeledBy} change={setChoosenLabeledBy} value={choosenLabeledBy} label='Choose Console'/>}
                                        
                                        {sizes.length > 0 &&
                                            <SelectProductOptions
                                            size={true} values={sizes} change={setChoosenSize} value={choosenSize}
                                                label={sizeLabel} />}
                                        {graphics.length > 0 &&
                                            <SelectProductOptions
                                            size={true} values={graphics} change={setChoosenGraphics} value={choosenGraphics}
                                                label={"Select Product Graphics"} />}
                                        {ssd.length > 0 &&
                                            <SelectProductOptions
                                            size={true} values={ssd} change={setChoosenSSD} value={choosenSSD}
                                                label={"Select Product SSD"} />}
                                        {hdd.length > 0 &&
                                            <SelectProductOptions
                                            size={true} values={hdd} change={setChoosenHDD} value={choosenHDD}
                                                label={"Select Product HDD"} />}
                                        {resolution.length > 0 &&
                                            <SelectProductOptions
                                            size={true} values={resolution} change={setChoosenResolution} value={choosenResolution}
                                                label={"Select Product Display Resolution"} />}
                                        {extra.withMouse && <p>Product Comes with Mouse</p>}
                                        {extra.withDisplay && <p>Product Comes with Display</p>}
                                        {extra.withKeyboard && <p>Product Comes with Keyboard</p>}
                                    </div>
                                </div>
                                <ProductButtons inStock={inStock} />
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
            }
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