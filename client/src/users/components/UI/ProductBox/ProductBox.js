import React from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './ProductBox.css';

const ProductBox = ({ products, home, larger }) => {
	const calculateDateDifferenece = data => {
		const dateNow = Date.now();
		const newDate = new Date(data).getTime();
		return Math.ceil(Math.abs(dateNow - newDate) / (1000 * 3600 * 24));
	};
	return (
		<React.Fragment>
			{products.map((product, index) => {
				const diff = calculateDateDifferenece(product.createdAt);
				return (
					<div
						className={
							!larger
								? 'col-12 col-sm-6 col-md-4 col-lg-3'
								: 'col-12 col-sm-6 col-lg-4'
						}
						key={index}>
						<div className={home ? 'product-box home' : 'product-box'}>
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
									<p className="new-price">Starting from: ${product.price}</p>
								</div>
								<div className="box-bottom">
									<div
										className={
											'product rating rating-' + product.rating.averageRating
										}>
										<i className="fas fa-star" />
										<i className="fas fa-star" />
										<i className="fas fa-star" />
										<i className="fas fa-star" />
										<i className="fas fa-star" />
										<p>({product.rating.numberOfReviews})</p>
									</div>
									<p>
										{product.smalldescription.length > 50
											? product.smalldescription.slice(0, 50) + '...'
											: product.smalldescription + '...'}
									</p>
								</div>
								{diff < 32 && <span className="new-product">NEW</span>}
								{product.featured && (
									<span className="featured-product">NEW</span>
								)}
								<p className="options-length">
									{product.options.length}{' '}
									{product.options.length === 1 ? 'option' : 'options'}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</React.Fragment>
	);
};

export default React.memo(ProductBox);
