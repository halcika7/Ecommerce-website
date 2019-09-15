import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './ProductBox.css';

const ProductCarousel = ({ products }) => {
    useEffect(() => {
        const elems = document.querySelectorAll('.owl-nav > button > span');
        elems.forEach(elem => {
            elem.innerHTML = '';
            console.log(elem);
        })
    }, []);

	return (
        <div class="container mightlike">
            <h5>Might Also Like</h5>
            <OwlCarousel
                className="owl-carousel-1 owl-carousel owl-theme owl-loaded owl-height mt-4 mb-5"
                margin={30}
                items={1}
                animateIn={true}
                lazyLoad={true}
                dots={false}
                nav={true}
                loop={true}
                smartSpeed={500}
                responsive={{
                    0:{
                        items:1
                    },
                    576:{
                        items:2
                    },
                    768:{
                        items:3
                    },
                    992:{
                        items:4
                    },
                    1200:{
                        items:4
                    }
                }}>
                    {products.map((product, index) => 
                        <div class="col-12" key={index}>
                            <Link to={`/product?id=${product._id}`}>
                                <img src={product.options[0].featuredPicture} alt={product.name} />
                            </Link>
                            <p>{product.category}</p>
                            <Link to={`/product?id=${product._id}`}>
                                <h6>{product.name}</h6>
                            </Link>
                            <div className={'product rating rating-' + product.rating.averageRating}>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <p>{product.rating.numberOfReviews}</p>
                            </div>
                            <div class="row">
                                <p class="new-price">Starting from: ${product.price}</p>
                            </div>
                            <p className="options-length">
                                {product.options.length}{' '}
                                {product.options.length === 1 ? 'option' : 'options'}
                            </p>
                        </div>
                    )}
            </OwlCarousel>
        </div>
	);
};

export default React.memo(ProductCarousel);
