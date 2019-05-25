import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import './Home.css';
import Offer from '../../components/Offer/Offer';
import SmallSpinner from '../../components/UI/SmallSpinner/SmallSpinner';

const Home = props => {
	const [topColumn, setTopColumn] = useState([]);
	const [bottomColumn, setBottomColumn] = useState([]);
	
	useEffect(() => {
		document.title = 'Home Page';
		props.getHomeProducts();
	}, []);

	useEffect(() => {
		if(props.product.ourProducts.length > 0) {
			const newTopColumn = props.product.ourProducts.slice(0, (Math.floor(props.product.ourProducts.length / 2))).map(product => product);
			const newBottomColumn = props.product.ourProducts.slice((Math.floor(props.product.ourProducts.length / 2))).map(product => product);
			setTopColumn(newTopColumn);
			setBottomColumn(newBottomColumn);
		}
	}, [props.product.ourProducts]);

	const calculateDateDifferenece = data => {
		const dateNow = Date.now();
		const newDate = new Date(data).getTime();
		return Math.ceil(Math.abs(dateNow - newDate) / (1000 * 3600 * 24));
	};

	console.log( props.product.newProducts );

	    const options = {
			items: 1,
			margin: 10,
			lazyLoad: true,
			dots: false,
			animateIn: true,
			autoHeightClass: 'owl-height',
			responsiveClass: true,
			nav:true
		};

	return (
		<React.Fragment>
			<div className="container-fluid carousel-main d-none d-sm-block">
				<div className="container carousel-main">
					{props.product.bannerProducts.length > 0 ? (
						<OwlCarousel
							className="owl-carousel-main owl-carousel owl-theme"
							loop
							margin={10}
							dotsEach={true}
							dots={true}
							items={1}
							animateIn={true}
							lazyLoad={true}>
							{props.product.bannerProducts.map((product, index) => (
								<div className="product" key={index}>
									<div className="left-part">
										<h1>{product.name}</h1>
										<p>{product.smalldescription}</p>
										<div className="row">
											<div className="old-price">${product.price}</div>
											<Link to={`/product?id=${product._id}`}>Shop Now</Link>
										</div>
									</div>
									<div className="right-part">
										<img
											className="owl-lazy"
											data-src={product.options[0].featuredPicture}
											alt={product.name}
										/>
									</div>
								</div>
							))}
						</OwlCarousel>
					) : 
					<div className='card'>
						<SmallSpinner />
					</div>}
				</div>
			</div>

			<section className="flat-row flat-banner-box d-none d-md-block">
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<div className="banner-box one-half">
								<div className="inner-box">
									<a href="/" title="">
										<img
											src="https://grandetest.com/theme/techno-html/images/banner_boxes/home-01.jpg"
											alt=""
										/>
									</a>
								</div>
								<div className="inner-box">
									<a href="/" title="">
										<img
											src="https://grandetest.com/theme/techno-html/images/banner_boxes/home-05.jpg"
											alt=""
										/>
									</a>
								</div>
								<div className="clearfix" />
							</div>
							<div className="banner-box">
								<div className="inner-box">
									<a href="/" title="">
										<img
											src="https://grandetest.com/theme/techno-html/images/banner_boxes/home-04.jpg"
											alt=""
										/>
									</a>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="banner-box">
								<div className="inner-box">
									<a href="/" title="">
										<img
											src="https://grandetest.com/theme/techno-html/images/banner_boxes/home-03.jpg"
											alt=""
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="container nav-main">
				<h4>New Arrivals</h4>
				<div className="row">
					{props.product.newProducts.map((product, index) => {
						const diff = calculateDateDifferenece(product.createdAt);
						return (
							<div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
								<div className="product-box">
									<div className="imagebox">
										{product.options.length > 1 ? (
											<OwlCarousel
												className="box-image owl-carousel owl-theme owl-loaded"
												{...options}>
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

			{props.product.weeklyOffer.length > 0 && <Offer label='Weekly Offer' products={props.product.weeklyOffer} weekly={true} />}

			<div className="container nav-main">
				<h4>Featured Products</h4>
				<div className="row">
					{props.product.featuredProducts.map((product, index) => {
						const diff = calculateDateDifferenece(product.createdAt);
						return (
							<div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
								<div className="product-box">
									<div className="imagebox">
										{product.options.length > 1 ? (
											<OwlCarousel
												className="box-image owl-carousel owl-theme owl-loaded owl-height"
												margin={10}
												items={1}
												lazyLoad={true}
												dots={false}
												animateIn={true}
												nav={true}>
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
											{product.options.length}{' '}
											{product.options.length === 1 ? 'option' : 'options'}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{props.product.dailyOffer.length > 0 && <Offer label='Daily Offer' products={props.product.dailyOffer} />}

			<div className="container nav-main">
				<h4>Top Selling Products</h4>
				<div className="row">
					{props.product.topSellingProducts.map((product, index) => {
						const diff = calculateDateDifferenece(product.createdAt);
						return (
							<div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
								<div className="product-box">
									<div className="imagebox">
										{product.options.length > 1 ? (
											<OwlCarousel
												className="box-image owl-carousel owl-theme owl-loaded owl-height"
												margin={10}
												items={1}
												animateIn={true}
												lazyLoad={true}
												dots={false}
												nav={true}>
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
											{product.options.length}{' '}
											{product.options.length === 1 ? 'option' : 'options'}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{topColumn.length > 0 && 
			<section className="flat-imagebox style1">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="flat-row-title">
								<h3>Our Products</h3>
							</div>
						</div>
					</div>
					<div className="row ">
						<OwlCarousel
							className="col-md-12 owl-carousel-10 owl-carousel owl-theme owl-loaded owl-drag"
							dots
							margin={10}
							responsive={{
								0:{
									items: 1,
									// dots: false
								},
								479:{
									items: 1,
									// dots: false
								},
								599:{
									items: 1,
									// dots: false
								},
								768:{
									items: 2,
									// dots: false
								},
								991:{
									items: 3
								},
								1200: {
									items: 3
								}
							}}>
							{topColumn.map((product, index) => {
								const diffTop = calculateDateDifferenece(product.createdAt);
								const diffBottom = calculateDateDifferenece(bottomColumn[index].createdAt);
								return <div className='owl-carousel-item' key={index}>
									<div className="product-box style1">
										<div className="imagebox style1">
											<div className="box-image">
												<Link to={`/product?id=${product._id}`} >
													<img src={product.options[0].featuredPicture} alt="" />
												</Link>
												<p className="options-length">
													{product.options.length}{' '}
													{product.options.length === 1 ? 'option' : 'options'}
												</p>
												{diffTop < 32 && <span className="new-product">NEW</span>}
											</div>
											<div className="box-content">
												<div className="cat-name">
													{product.category}
												</div>
												<div className="product-name">
													<Link to={`/product?id=${product._id}`}>
														{product.name}
													</Link>
												</div>
												<div className="price">
													<span className="regular">From: ${product.price}</span>
												</div>
											</div>
										</div>
									</div>
									<div className="product-box style1">
										<div className="imagebox style1">
											<div className="box-image">
												<Link to={`/product?id=${bottomColumn[index]._id}`}>
													<img
														src={bottomColumn[index].options[0].featuredPicture}
														alt=""
													/>
												</Link>
												<p className="options-length">
													{product.options.length}{' '}
													{product.options.length === 1 ? 'option' : 'options'}
												</p>
												{diffBottom < 32 && <span className="new-product">NEW</span>}
											</div>
											<div className="box-content">
												<div className="cat-name">
													{bottomColumn[index].category}
												</div>
												<div className="product-name">
													<Link to={`/product?id=${bottomColumn[index]._id}`}>
														{bottomColumn[index].name}
													</Link>
												</div>
												<div className="price">
													<span className="regular">From: ${bottomColumn[index].price}</span>
												</div>
											</div>
										</div>
									</div>
								</div>}
							)}
						</OwlCarousel>
					</div>
				</div>
			</section>}

			<div className="container-fluid icons">
				<div className="container icons">
					<div className="row">
						<div className="col-12 col-sm-6 col-lg-3">
							<i className="fas fa-truck" />
							<h5>Worldwide Shipping</h5>
							<p>Free Shipping On Order Over $100</p>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<i className="fas fa-headphones" />
							<h5>Order Online Service</h5>
							<p>Free return products in 30 days</p>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<i className="far fa-credit-card" />
							<h5>Payment</h5>
							<p>Secure System</p>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<i className="fas fa-redo-alt" />
							<h5>Return 30 Days</h5>
							<p>Free return products in 30 days</p>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		product: state.product
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getHomeProducts: () => dispatch(actions.homePageProducts())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
