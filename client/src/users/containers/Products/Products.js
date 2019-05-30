import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions';
import './Products.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Breadcrumb from '../../components/UI/Breadcrumb/Breadcrumb';
import Categories from './Categories/Categories';
import Price from './Price/Price';
import Brands from './Filters/Brands';
import Colors from './Filters/Colors';
import Sizes from './Filters/Sizes';

const name = props => {
    const [products, setproducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [category, setCategory] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subcategory, setSubcategory] = useState('');

    const [fixedPrice, setFixedPrice] = useState({});
    
    const [price, setPrice] = useState({});
    const [choosenBrands, setChoosenBrands] = useState([]);
    const [choosenColors, setChoosenColors] = useState([]);
    const [choosenLabeledBy, setChoosenLabeledBy] = useState([]);

    // console.log(props.match.params.id)
    // console.log(props.location.search)

    useEffect(() => {
        setCategory(new URLSearchParams(props.location.search).get('category'));
        setSubcategoryName(new URLSearchParams(props.location.search).get('subcategoryName'));
        setSubcategory(new URLSearchParams(props.location.search).get('subcategory'));
        setCategories(props.categories);
        props.getProductsOnLoad({ category: new URLSearchParams(props.location.search).get('category'), subcategoryName: new URLSearchParams(props.location.search).get('subcategoryName'), subcategory: new URLSearchParams(props.location.search).get('subcategory') });
        props.getFilters({ category: new URLSearchParams(props.location.search).get('category'), subcategoryName: new URLSearchParams(props.location.search).get('subcategoryName'), subcategory: new URLSearchParams(props.location.search).get('subcategory') });
    },[]);

    useEffect(() => {
		setCategories(props.categories);
    }, [props.categories]);
    
    useEffect(() => {
		setBrands(props.brands);
    }, [props.brands]);
    
    useEffect(() => {
		setColors(props.allColors);
    }, [props.allColors]);
    
    useEffect(() => {
		setSizes(props.sizes);
	}, [props.sizes]);

    useEffect(() => {
        setPrice({})
        setBrands([])
        setColors([])
        setSizes([])
        setChoosenBrands([])
        setChoosenColors([])
        setChoosenLabeledBy([])
        setFixedPrice({})
        setSubcategory('')
        setSubcategoryName('')
        setCategory('')
        setCategory(new URLSearchParams(props.location.search).get('category'));
        setSubcategoryName(new URLSearchParams(props.location.search).get('subcategoryName'));
        setSubcategory(new URLSearchParams(props.location.search).get('subcategory'));
        setCategories(props.categories);
        props.getProductsOnLoad({ 
            category: new URLSearchParams(props.location.search).get('category'), 
            subcategoryName: new URLSearchParams(props.location.search).get('subcategoryName'), 
            subcategory: new URLSearchParams(props.location.search).get('subcategory') 
        });
        props.getFilters({ category: new URLSearchParams(props.location.search).get('category'), subcategoryName: new URLSearchParams(props.location.search).get('subcategoryName'), subcategory: new URLSearchParams(props.location.search).get('subcategory') });
    },[props.location.search]);

    useEffect(() => {
        setproducts(props.products);
    },[props.products]);

    useEffect(() => {
        setPrice({...props.price});
        setFixedPrice({...props.price});
    },[props.price]);

    const calculateDateDifferenece = data => {
		const dateNow = Date.now();
		const newDate = new Date(data).getTime();
		return Math.ceil(Math.abs(dateNow - newDate) / (1000 * 3600 * 24));
    };

    const filterChange = (e, filterName) => {
        const name = e.currentTarget.name;
        let newChoosenValues = null;
        if(filterName === 'Brand') { newChoosenValues = [...choosenBrands] }
        if(filterName === 'Color') { newChoosenValues = [...choosenColors] }
        if(filterName === 'Size') { newChoosenValues = [...choosenLabeledBy] }

        if(e.currentTarget.checked) {
            newChoosenValues.push(name);
        }else {
            const findIndex = newChoosenValues.findIndex(value => value === name);
            newChoosenValues.splice(findIndex, 1);
        }

        filterName === 'Brand' && setChoosenBrands(newChoosenValues);
        filterName === 'Color' && setChoosenColors(newChoosenValues);
        filterName === 'Size' && setChoosenLabeledBy(newChoosenValues);
    }

    const applyFilters = e => {
        e.preventDefault();
        const obj = {
            category, 
            subcategoryName, 
            subcategory, 
            min: price.min, 
            max: price.max, 
            brand:choosenBrands, 
            color:choosenColors, 
            size:choosenLabeledBy
        };
        props.filterProducts(obj);
        props.getFilters(obj);
    }

    // console.log(props)

    return (
        <React.Fragment>
            <Breadcrumb links={[ { link: '/', value: 'Home' }, { link: `/product?id=`, value: 'category' } ]} />

            <div className="container products">
                <div className="row">
                    <div className="col-lg-3 col-md-4">
                        <Categories categories={categories} />
                        {Object.keys(price).length > 0 && <Price price={price} setPrice={setPrice} minValue={fixedPrice.min} maxValue={fixedPrice.max}/>}
                        <Brands brands={brands} choosenBrands={choosenBrands} filterChange={filterChange}/>
                        <Colors colors={colors} choosenColors={choosenColors} filterChange={filterChange} />
                        {(category === 'Clothing' || category === 'Shoes') && 
                            <Sizes sizes={sizes} choosenLabeledBy={choosenLabeledBy} filterChange={filterChange} />
                        }
                        <div className="col-12">
                            <button type='button' className='mt-4 apply-filters' onClick={applyFilters} >Apply Filters</button>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <div className="col-12">
                            <div className="owl-carousel-main owl-carousel owl-theme">
                                <div className="product">
                                    <div className="left-part">
                                        <h1>Name of Prodcut</h1>
                                        <p>sdoisafijsdojf difjhoiasdjfohsaodhf dsafojoifoiasjdf dfijsoaijod dsfijasoidjfiojsadf dfsijaiosdjfijd sfdiajoifioasjf asdfijoi</p>
                                    </div>
                                    <div className="right-part">
                                        <img className="" src="{{asset('/img/img5.png')}}" alt="First slide" />
                                    </div>
                                </div>
                                <div className="product">
                                    <div className="left-part">
                                        <h1>Name of Prodcut</h1>
                                        <p>sdoisafijsdojf difjhoiasdjfohsaodhf dsafojoifoiasjdf dfijsoaijod dsfijasoidjfiojsadf dfsijaiosdjfijd sfdiajoifioasjf asdfijoi</p>
                                    </div>
                                    <div className="right-part">
                                        <img className="" src="{{asset('/img/img5.png')}}" alt="First slide" />
                                    </div>
                                </div>
                                <div className="product">
                                    <div className="left-part">
                                        <h1>Name of Prodcut</h1>
                                        <p>sdoisafijsdojf difjhoiasdjfohsaodhf dsafojoifoiasjdf dfijsoaijod dsfijasoidjfiojsadf dfsijaiosdjfijd sfdiajoifioasjf asdfijoi</p>
                                    </div>
                                    <div className="right-part">
                                        <img className="" src="{{asset('/img/img5.png')}}" alt="First slide" />
                                    </div>
                                </div>
                                <div className="product">
                                    <div className="left-part">
                                        <h1>Name of Prodcut</h1>
                                        <p>sdoisafijsdojf difjhoiasdjfohsaodhf dsafojoifoiasjdf dfijsoaijod dsfijasoidjfiojsadf dfsijaiosdjfijd sfdiajoifioasjf asdfijoi</p>
                                    </div>
                                    <div className="right-part">
                                        <img className="" src="{{asset('/img/img5.png')}}" alt="First slide" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 heading">
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                        <h5>{subcategoryName}</h5>
                                </div>
                                <div className="col-12 col-sm-6">
                                        <p>Showing 1–15 of 20 results</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 products">
                            <div className="nav-search">
                                <div className="row">
                                    <div className="col-12 col-sm-3 col-md-4 col-lg-3">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i className="fas fa-list"></i></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i className="fas fa-ellipsis-h"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-9 col-md-8 col-lg-9">
                                        <div className="popularity">
                                            <select name="color" id="colors" className="">
                                                <option value="white">White</option>
                                                <option value="white">White</option>
                                                <option value="white">White</option>
                                                <option value="white">White</option>
                                                <option value="Sort by popularity">Sort by popularity</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row" >
                                    {products.map((product, index) => {
                                        const diff = calculateDateDifferenece(product.createdAt);
                                        return (
                                            <div className="col-12 col-sm-6 col-lg-4" key={index}>
                                                <div className="product-box">
                                                    <div className="imagebox">
                                                        {product.options.length > 1 ? (
                                                            <OwlCarousel
                                                                className="box-image owl-carousel owl-theme owl-loaded"
                                                                items={1}
                                                                margin={10}
                                                                lazyLoad={true}
                                                                dots={false}
                                                                animateIn={true}
                                                                responsiveClass={true}
                                                                nav={true}
                                                                >
                                                                {product.options.map((opt, index) => (
                                                                    <Link to={`/product?id=${product._id}`} key={index}>
                                                                        <img
                                                                            className="owl-lazy"
                                                                            data-src={opt.featuredPicture}
                                                                            alt=""
                                                                        />
                                                                    </Link>
                                                                ))}
                                                            </OwlCarousel>
                                                        ) : (
                                                            <Link to={`/product?id=${product._id}`} key={index}>
                                                                <img src={product.options[0].featuredPicture} alt="" />
                                                            </Link>
                                                        )}
                                                        <div className="box-content">
                                                            <p>{product.category}</p>
                                                            <Link to={`/product?id=${product._id}`}>
                                                                <p>{product.name}</p>
                                                            </Link>
                                                            <p className="new-price">
                                                                Starting from: ${product.price}
                                                            </p>
                                                        </div>
                                                        <div className="box-bottom">
                                                            <div className="product rating three">
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <p>(50)</p>
                                                            </div>
                                                            <p>
                                                                {product.smalldescription.length > 50
                                                                    ? product.smalldescription.slice(0, 50) + '...'
                                                                    : product.smalldescription + '...'}
                                                            </p>
                                                        </div>
                                                        {diff < 32 && <span className="new-product">NEW</span>}
                                                        <p className="options-length">
                                                            {product.optionsSize}{' '}
                                                            {product.optionsSize === 1 ? 'option' : 'options'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="col-12 product-inline">
                                        <div className="product-full-width">
                                            <div className="product-full-width-image">
                                                <a href="/">
                                                    <img src="{{asset('/img/img5.png')}}" alt="" />
                                                </a>
                                            </div>
                                            <div className="product-full-width-details">
                                                <div className="product-full-width-description">
                                                    <p className="category">Cameras</p>
                                                    <h6 className="product-name">
                                                        <a href="/">
                                                            Apple iPad Air 2 32GB 9.7" Tablet
                                                        </a>
                                                    </h6>
                                                    <p className="availability">Availability: <span>In Stock</span></p>
                                                    <p className="details">
                                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eveniet odio temporibus aut est accusantium tempore perspiciatis sunt sit dolore tempora beatae, reprehenderit totam omnis eligendi expedita odit neque? Odio.
                                                    </p>
                                                </div>
                                                <div className="product-full-width-price">
                                                    <div className="old-price">
                                                        <p>$123456</p>
                                                    </div>
                                                    <div className="new-price">
                                                        <p>$212</p>
                                                    </div>
                                                    <a href="/" className="add-to-cart" role="button"><i className="fas fa-shopping-cart"></i>Quick View</a>
                                                    <div className="product-full-width-buttons">
                                                        <a href="/"><i className="fas fa-sync"></i>Comapre</a>
                                                        <a href="/"><i className="fas fa-heart"></i>Wishlist</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 pagination">
                            <span>Showing 1–15 of 20 results</span>
                            <nav aria-label="...">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="/" tabIndex="-1">Previous</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/">1</a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="/">2 
                                            <span className="sr-only">(current)</span>
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/">3</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

const mapStateToProps = state => ({
    products: state.filteredProducts.products,
    brands: state.filteredProducts.brands,
    allColors: state.filteredProducts.colors,
    sizes: state.filteredProducts.sizes,
    graphics: state.filteredProducts.graphics,
    hdds: state.filteredProducts.hdds,
    rams: state.filteredProducts.rams,
    ssds: state.filteredProducts.ssds,
    resolutions: state.filteredProducts.resolutions,
    memorys: state.filteredProducts.memorys,
    displays: state.filteredProducts.displays,
    wifi: state.filteredProducts.wifi,
    bluetooth: state.filteredProducts.bluetooth,
    consoles: state.filteredProducts.consoles,
    price: state.filteredProducts.price,
    categories: state.category.allCategories
})

const mapDispatchToProps = dispatch => ({
    getProductsOnLoad: (obj) => dispatch(actions.getProductsOnLoad(obj)),
    filterProducts: (obj) => dispatch(actions.filterProducts(obj)),
    getFilters: (obj) => dispatch(actions.getFilters(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(name)
