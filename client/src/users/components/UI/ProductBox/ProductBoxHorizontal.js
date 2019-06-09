import React from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './ProductBox.css';

const ProductBoxHorizontal = props => {
	return (
		<React.Fragment>
			{props.products.map((product, index) => (
				<div className="col-12 product-inline" key={index}>
					<div className="product-full-width">
						<div className="product-full-width-image">
							{product.options.length > 1 ? (
								<OwlCarousel
									className="box-image owl-carousel owl-theme owl-loaded"
									margin={10}
									items={1}
									animateIn={true}
									lazyLoad={true}
									dots={false}
									nav={true}
									autoHeightClass="">
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
						</div>
						<div className="product-full-width-details">
							<div className="product-full-width-description">
								<p className="category">{product.category}</p>
								<h6 className="product-name">
									<Link to={`/product?id=${product._id}`}>{product.name}</Link>
								</h6>
								<p className="details d-none d-lg-flex">
									{product.smalldescription}
								</p>
								<div
									className={
										'd-none d-lg-flex product rating rating-' +
										product.rating.averageRating
									}>
									<i className="fas fa-star" />
									<i className="fas fa-star" />
									<i className="fas fa-star" />
									<i className="fas fa-star" />
									<i className="fas fa-star" />
									<p>({product.rating.numberOfReviews})</p>
								</div>
							</div>
							<div className="product-full-width-price">
								<div className="old-price">
									<p>Starting from: $ {product.price}</p>
								</div>
								<Link
									to={`/product?id=${product._id}`}
									className="add-to-cart"
									role="button">
									View Product
								</Link>
							</div>
						</div>
					</div>
				</div>
			))}
		</React.Fragment>
	);
};

export default ProductBoxHorizontal;
