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
import DescriptionAndReviews from './DescriptionAndReviews';

const Product = props => {
    const productID = props.match.params.id ? props.match.params.id : new URLSearchParams(props.location.search).get('id');

    const [socialIcons] = useState([ 
        {link: '/', icon: 'fab fa-facebook-f'}, {link: '/', icon: 'fab fa-twitter'}, {link: '/', icon: 'fab fa-instagram'}, {link: '/', icon: 'fab fa-pinterest'}, 
        {link: '/', icon: 'fab fa-dribbble'}, {link: '/', icon: 'fab fa-google'}
    ]);

    const [product, setProduct] = useState({});
    const [subCat, setSubCat] = useState('');
    const [subCatName, setSubCatName] = useState('');
    const [sizeLabel, setSizeLabel] = useState('');
    const [optionLabeledBy, setOptionLabeledBy] = useState([]);
    const [sizes, setSizes] = useState( [] );

    // for computers and laptops
    const [graphics, setGraphics] = useState([]);
    const [ssd, setSSD] = useState([]);
    const [hdd, setHDD] = useState( [] );
    // computers
    const [withMouse, setWithMouse] = useState([]);
    const [withKeyboard, setWithKeyboard] = useState([]);
    const [withDisplay, setWithDisplay] = useState([]);
    // laptop and monitors
    const [resolution, setResolution] = useState([]);
    // monitors
    const [smart, setSmart] = useState([]);
    const [threeD, setThreeD] = useState([]);

    const [choosenLabeledBy, setChoosenLabeledBy] = useState('');
    const [choosenSize, setChoosenSize] = useState('');
    // comp and laptops
    const [choosenGraphics, setChoosenGraphics] = useState('');
    const [choosenSSD, setChoosenSSD] = useState('');
    const [choosenHDD, setChoosenHDD] = useState('');
    // comp
    const [choosenWithMouse, setChoosenWithMouse] = useState('');
    const [choosenWithKeyboard, setChoosenWithKeyboard] = useState('');
    const [choosenWithDisplay, setChoosenWithDisplay] = useState('');
    // laptops
    const [choosenResolution, setChoosenResolution] = useState('');
    // monitors
    const [choosenSmart, setChoosenSmart] = useState('');
    const [choosenThreeD, setChoosenThreeD] = useState('');

    const [optionPictures, setOptionPictures] = useState(0);

    const [aditionalPrice, setAditionalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [sku, setSKU] = useState('');

    const [firstIndex, setFirstIndex] = useState(0);

    const [inStock, setInStock] = useState(false);
    const [numberInStock, setNumberInStock] = useState(0);

    useEffect( () => {
        props.getProduct(productID);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return () => {props.clearSingleProduct()}
    }, [] );
    
    useEffect( () => {
        resets('all');
        props.getProduct(productID);
	}, [props.location.search, props.match.params]);
    
    useEffect(() => {setProduct({ ...props.product.singleProduct })}, [props.product.singleProduct]);

    useEffect( () => {
        if(numberInStock > 0) {
            setInStock(true);
        } else {
            setInStock(false);
        }
    }, [numberInStock] );
    
    useEffect(() => {
        if(Object.keys(product).length > 0) {
            setSubCatName(product.subcategories[0].sub)
            setSubCat(product.subcategories[0].subName)
            setOptions();
        }
    }, [product]);

    useEffect(() => {
        if ( choosenLabeledBy ) {
            resets('choosenLabeledBy');
            let newSizes = [], findLabeledByOptionIndex = null;
            if ( subCatName !== 'Projection Screens' && subCatName !== 'Games' ) {
                findLabeledByOptionIndex = product.options.findIndex(option => option.color === choosenLabeledBy);
                if ( product.category !== 'Electronics' ) {
                    newSizes = newSizesArray(findLabeledByOptionIndex, 'size');
                    setSizeLabel('Choose Product Size');
                }else if ( subCatName === 'Tablets' || subCatName === 'Phones' ) {
                    newSizes = newSizesArray(findLabeledByOptionIndex, 'memory');
                    setSizeLabel('Select Product Memory');
                }else if ( subCatName === 'Desktop Computers' || subCatName === 'Laptops' ) {
                    newSizes = newSizesArray(findLabeledByOptionIndex, 'ram');
                    setSizeLabel('Select Product Ram'); 
                    resets('choosenLabeledByDL');
                }else if( subCatName === 'Monitors' || subCatName === 'Televisions' ) {
                    newSizes = newSizesArray(findLabeledByOptionIndex, 'display');
                    setSizeLabel('Choose Display Size');
                    resets('choosenLabeledByMT');
                }else {
                    findLabeledByOptionIndex = product.options.findIndex(option => option.color === choosenLabeledBy);
                    setting('other');
                }
            } else {
                findLabeledByOptionIndex = product.options.findIndex(option => {
                    if(subCatName === 'Games') return option.console === choosenLabeledBy;
                    return option.display === choosenLabeledBy;
                });
                setting('other');
            }
            returnTimeouts(newSizes, setSizes, findLabeledByOptionIndex);
        }
    }, [choosenLabeledBy]);

    useEffect(() => {
        ( choosenSize && (product.category === 'Clothing' || product.category === 'Shoes') ) && setting('choosenSize', 'Clothing&Shoes');
        ( choosenSize && (subCatName === 'Tablets' || subCatName === 'Phones') ) && setting('choosenSize', 'Tablets&Phones');
        ( choosenSize && (subCatName === 'Desktop Computers' || subCatName === 'Laptops') ) && commonInUseEffects('choosenSize', 'Computers',false, 'graphics', 'choosenSizeDL', setGraphics);
        ( choosenSize && (subCatName === 'Monitors' || subCatName === 'Televisions') ) && commonInUseEffects('choosenSize', 'Displays',false, 'resolution', 'choosenSizeMT', setResolution);
    }, [choosenSize] );
    
    useEffect(() => { choosenGraphics && commonInUseEffects('choosenSize', 'Computers',false, 'ssd', 'choosenGraphics', setSSD) }, [choosenGraphics] );
    
    useEffect( () => { choosenSSD && commonInUseEffects('choosenSSD', 'Computers',false, 'hdd', 'choosenSSD', setHDD) }, [choosenSSD] );
    
    useEffect( () => {
        if ( choosenHDD && (subCatName === 'Laptops') ) {
            commonInUseEffects('choosenHDD','Laptops',false, 'resolution', 'choosenHDDL', setResolution);
            setting('choosenHDD','Laptops', true);
        }
        ( choosenHDD && subCatName === 'Desktop Computers' ) && commonInUseEffects('choosenHDD','Desktop',false, 'withMouse', 'choosenHDDD', setWithMouse);
    }, [choosenHDD]);

    useEffect( () => {choosenWithMouse && commonInUseEffects('choosenWithMouse',null,null, 'withDisplay', 'choosenWithMouse', setWithDisplay) }, [choosenWithMouse]);

    useEffect( () => {choosenWithDisplay && commonInUseEffects('choosenWithDisplay',null,null,'withKeyboard', 'choosenWithDisplay', setWithKeyboard) }, [choosenWithDisplay]);

    useEffect( () => { choosenWithKeyboard && setting('choosenWithKeyboard') }, [choosenWithKeyboard]);

    useEffect( () => { choosenResolution && commonInUseEffects('choosenResolution',null,null,'threeD', 'choosenResolution', setThreeD) }, [choosenResolution]);

    useEffect( () => { choosenThreeD && commonInUseEffects('choosenThreeD',null,null,'smart', 'choosenThreeD', setSmart); }, [choosenThreeD]);

    useEffect( () => { choosenSmart && setting('choosenSmart') }, [choosenSmart]);

    const commonInUseEffects = (first, second, third, fourth, fifth, setValue) => {
        const value = setting(first, second, third, fourth);
        resets(fifth);
        returnTimeouts(value,setValue);
    }

    const resets = change => {
        (change === 'all') && setProduct({}); 
        (change === 'all') && setSubCat(''); 
        (change === 'all') && setSubCatName(''); 
        (change === 'all') && setSizeLabel(''); 
        (change === 'all') && setOptionLabeledBy([]); 
        (change === 'all' || change === 'choosenLabeledBy') && setSizes([]); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL') && setGraphics([]); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics') && setSSD([]); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics' || change === 'choosenSSD') && setHDD([]); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics' || change === 'choosenSSD' || change === 'choosenHDDD') && setWithMouse([]); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics' || change === 'choosenSSD' || change === 'choosenHDDD' || change === 'choosenWithMouse' || change === 'choosenWithDisplay') && setWithKeyboard([]); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics' || change === 'choosenSSD' || change === 'choosenHDDD' || change === 'choosenWithMouse') && setWithDisplay([]); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenLabeledByMT' || change === 'choosenSizeDL' || change === 'choosenSizeMT' || change === 'choosenGraphics' || change === 'choosenSSD' || change === 'choosenHDDL') && setResolution([]); 
        (change === 'all' || change === 'choosenLabeledByMT' || change === 'choosenSizeMT' || change === 'choosenResolution' || change === 'choosenThreeD') && setSmart([]); 
        (change === 'all' || change === 'choosenLabeledByMT' || change === 'choosenSizeMT' || change === 'choosenResolution') && setThreeD([]); 
        (change === 'all') && setChoosenLabeledBy(''); 
        (change === 'all' || change === 'choosenLabeledBy') && setChoosenSize(''); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL') && setChoosenGraphics(''); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics') && setChoosenSSD(''); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics' || change === 'choosenSSD') && setChoosenHDD(''); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics' || change === 'choosenSSD' || change === 'choosenHDDD') && setChoosenWithMouse(''); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics' || change === 'choosenSSD' || change === 'choosenHDDD' || change === 'choosenWithMouse' || change === 'choosenWithDisplay') && setChoosenWithKeyboard(''); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenSizeDL' || change === 'choosenGraphics' || change === 'choosenSSD' || change === 'choosenHDDD' || change === 'choosenWithMouse') && setChoosenWithDisplay(''); 
        (change === 'all' || change === 'choosenLabeledByDL' || change === 'choosenLabeledByMT' || change === 'choosenSizeDL' || change === 'choosenSizeMT' || change === 'choosenGraphics' || change === 'choosenSSD' || change === 'choosenHDDL') && setChoosenResolution(''); 
        (change === 'all' || change === 'choosenLabeledByMT' || change === 'choosenSizeMT' || change === 'choosenResolution' || change === 'choosenThreeD') && setChoosenSmart(''); 
        (change === 'all' || change === 'choosenLabeledByMT' || change === 'choosenSizeMT' || change === 'choosenResolution') && setChoosenThreeD(''); 
        (change === 'all') && setOptionPictures(0); 
        (change === 'all') && setAditionalPrice(0); 
        (change === 'all') && setDiscount(0); 
        (change === 'all') && setFirstIndex(0); 
        (change === 'all'|| change === 'choosenLabeledBy') && setNumberInStock(0); 
        (change === 'all'|| change === 'choosenLabeledBy') && setInStock(false);
    }
                        
    const newSizesArray = (index, property) => [...new Set(product.options[index].options.filter(option => option.quantity > 0 && option ).map(opt => opt[property]))].sort((a, b) => a - b);

    const setOptions = () => {
        const subName = product.subcategories[0].subName, sub = product.subcategories[0].sub;
        let newLabeledBy = null;
        if( sub !== 'Games' && sub !== 'Projection Screens' ) {
            if( subName === 'Headphones' || subName === 'Camera & Photo' || subName === 'Speakers' || sub === 'Console' || sub === 'Blue-ray Players & Recorders' || sub === 'DVD Players & Recorders' || sub === 'Projectors' ) {
                newLabeledBy = product.options.filter(option => option.options[0].quantity > 0 && option ).map(opt => opt.color );
            }else {
                newLabeledBy = product.options.map(option => option.color);
            }
        }else {
            newLabeledBy = product.options.filter(option => option.options[0].quantity > 0 && option ).map(opt => {
                if(sub === 'Games') return opt.console;
                return opt.display;
            } );
        }
        setOptionLabeledBy(newLabeledBy);
    }

    const bool = (option, change, subCat = null) => {
        const withmouse = choosenWithMouse === 'Yes' ? true : false;
        const withdisplay = choosenWithDisplay === 'Yes' ? true : false;
        const withkeyboard = choosenWithKeyboard === 'Yes' ? true : false;
        const threed = choosenThreeD === 'Yes' ? true : false;
        const smart = choosenSmart === 'Yes' ? true : false;

        if(change === 'choosenSize' && subCat === 'Clothing&Shoes') return option.size === choosenSize;
        if(change === 'choosenSize' && subCat === 'Tablets&Phones') return option.memory === choosenSize;
        if(change === 'choosenSize' && subCat === 'Computers') return option.ram === choosenSize;
        if(change === 'choosenSize' && subCat === 'Displays') return option.display === choosenSize;
        if(change === 'choosenGraphics' && subCat === 'Computers') return option.graphics === choosenGraphics && option.ram === choosenSize;
        if(change === 'choosenSSD' && subCat === 'Computers') return option.graphics === choosenGraphics && option.ram === choosenSize && option.ssd === choosenSSD;
        if(change === 'choosenHDD' && (subCat === 'Laptops' || subCat === 'Desktop')) {
            return option.ram === choosenSize && option.graphics === choosenGraphics && option.ssd === choosenSSD && option.hdd === choosenHDD;
        }
        if(change === 'choosenWithMouse') {
            return option.ram === choosenSize && option.graphics === choosenGraphics && option.ssd === choosenSSD && option.hdd === choosenHDD && option.withMouse === withmouse;
        }
        if(change === 'choosenWithDisplay') {
            return option.ram === choosenSize && option.graphics === choosenGraphics && option.ssd === choosenSSD && option.hdd === choosenHDD && option.withMouse === withmouse && option.withDisplay === withdisplay;
        }
        if(change === 'choosenWithKeyboard') {
            return option.ram === choosenSize && option.graphics === choosenGraphics && option.ssd === choosenSSD && option.hdd === choosenHDD && option.withMouse === withmouse && option.withDisplay === withdisplay && option.withKeyboard === withkeyboard;
        }
        if(change === 'choosenResolution') return option.display === choosenSize && option.resolution === choosenResolution;
        if(change === 'choosenThreeD') return option.display === choosenSize && option.resolution === choosenResolution && option.threeD === threed;
        if(change === 'choosenSmart') return option.display === choosenSize && option.resolution === choosenResolution && option.threeD === threed && option.smart === smart;
    }

    const setting = (change, subCat = null, sizeIndex = null, property = null) => {
        const array = [...new Set(product.options[firstIndex].options.filter(option => bool(option, change, subCat) && option ).map(opt => opt[property]))];
        const sizeIndexx = change === 'other' ? 0 : product.options[firstIndex].options.findIndex( option => bool(option, change, subCat));
        if((change === 'choosenSize' && subCat === 'Computers') || (change === 'choosenGraphics' && subCat === 'Computers') || (change === 'choosenSSD' && subCat === 'Computers') || (change === 'choosenHDD' && subCat === 'Laptops' && !sizeIndex)) return array.sort((a, b) => a - b);

        if(change === 'choosenSize' && subCat === 'Displays') return array;

        if((change === 'choosenHDD' && subCat === 'Desktop') || (change === 'choosenWithMouse') || (change === 'choosenWithDisplay') || (change === 'choosenResolution') || (change === 'choosenThreeD')) {
            return [...new Set(product.options[firstIndex].options.filter(option => bool(option, change, subCat) && option ).map(opt => opt[property] === true ? 'Yes' : 'No'))];
        }

        if((change === 'choosenHDD' && subCat === 'Laptops' && sizeIndex) || change === 'choosenWithKeyboard' || change === 'choosenSmart' || subCat === 'Clothing&Shoes' || subCat === 'Tablets&Phones' || change === 'other') {
            const option = product.options[firstIndex].options[sizeIndexx];
            console.log(option)
            setNumberInStock( option.quantity );
            setAditionalPrice(option.aditionalPrice)
            setDiscount(option.discount)
            setSKU(option.sku);
            return;
        }
    }

    const returnTimeouts = (value, setValue, third = null) => setTimeout(() => {
        if(third !== null) {setFirstIndex(third);setOptionPictures(third);}
        setValue(value);
    },500);

    return (
        <React.Fragment>
            {Object.keys(product).length === 0 ?
                <div className='card' style={{ minHeight: '60vh' }}><SmallSpinner /></div> :
                <React.Fragment>
                    <Breadcrumb links={[ { link: '/', value: 'Home' }, { link: `/product?id=${productID}`, value: product.name } ]} />
                    <div className="container images">
                        <div className="row">
                            {Object.keys(product).length > 0 && props.show && <ImageGalery images={product.options[optionPictures].pictures} />}
                            <div className="col-md-4 about-product">
                                {subCat !== '' && 
                                    <AboutProduct 
                                        name={product.name} 
                                        numberOfSales={product.numberOfsales} 
                                        category={product.category} 
                                        brand={product.brand} 
                                        inStock={inStock} 
                                        numberInStock={numberInStock} 
                                        price={product.price} 
                                        aditionalPrice={aditionalPrice} 
                                        discount={discount} 
                                        subCat={subCat} 
                                        wifi={product.wifi} 
                                        bluetooth={product.bluetooth} 
                                        rating={product.rating} 
                                        createdAt={product.createdAt}
                                        subcategories={product.subcategories}
                                        sku={sku}/>
                                }
                                <div className="options">
                                    <div className="row">
                                        {optionLabeledBy.length > 0 && (subCatName !== 'Projection Screens' && subCatName !== 'Games') && 
                                            <SelectProductOptions color={true} values={optionLabeledBy} change={setChoosenLabeledBy} value={choosenLabeledBy} label='Choose Product'/>
                                        }
                                        {(optionLabeledBy.length > 0 && subCatName === 'Games') && 
                                            <SelectProductOptions size={true} values={optionLabeledBy} change={setChoosenLabeledBy} value={choosenLabeledBy} label='Choose Console'/>
                                        }
                                        {(optionLabeledBy.length > 0 && subCatName === 'Projection Screens') && 
                                            <SelectProductOptions size={true} values={optionLabeledBy} change={setChoosenLabeledBy} value={choosenLabeledBy} label='Choose Display'/>
                                        }
                                        {sizes.length > 0 && <SelectProductOptions size={true} values={sizes} change={setChoosenSize} value={choosenSize} label={sizeLabel} /> }
                                        {graphics.length > 0 && <SelectProductOptions size={true} values={graphics} change={setChoosenGraphics} value={choosenGraphics} label={"Select Product Graphics"} /> }
                                        {ssd.length > 0 && <SelectProductOptions size={true} values={ssd} change={setChoosenSSD} value={choosenSSD} label={"Select Product SSD"} /> }
                                        {hdd.length > 0 && <SelectProductOptions size={true} values={hdd} change={setChoosenHDD} value={choosenHDD} label={"Select Product HDD"} /> }
                                        {resolution.length > 0 &&
                                            <SelectProductOptions size={true} values={resolution} change={setChoosenResolution} value={choosenResolution} label={"Select Product Display Resolution"} />
                                        }
                                        {withMouse.length > 0 &&
                                            <SelectProductOptions size={true} values={withMouse} change={setChoosenWithMouse} value={choosenWithMouse} label="With extra mouse" />
                                        }
                                        {withDisplay.length > 0 &&
                                            <SelectProductOptions size={true} values={withDisplay} change={setChoosenWithDisplay} value={choosenWithDisplay} label="With extra display" />
                                        }
                                        {withKeyboard.length > 0 &&
                                            <SelectProductOptions size={true} values={withKeyboard} change={setChoosenWithKeyboard} value={choosenWithKeyboard} label="With extra keyboard" />
                                        }
                                        {threeD.length > 0 && <SelectProductOptions size={true} values={threeD} change={setChoosenThreeD} value={choosenThreeD} label="Is 3D" /> }
                                        {smart.length > 0 && <SelectProductOptions size={true} values={smart} change={setChoosenSmart} value={choosenSmart} label="Is Smart" /> }
                                    </div>
                                </div>
                                <ProductButtons inStock={inStock} />
                                <FooterSocialIcons icons={socialIcons} />
                            </div>
                        </div>
                    </div>
                    <DescriptionAndReviews product={product} match={props.match} location={props.location}/>
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
        getProduct: (id) => dispatch(actions.getProduct(id)),
        clearSingleProduct: () => dispatch(actions.clearSingleProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);