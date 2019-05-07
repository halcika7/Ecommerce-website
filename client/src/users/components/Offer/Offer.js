import React, { lazy } from 'react';
import OfferProduct from './OfferProduct';
import OwlCarousel from 'react-owl-carousel';

const Offer = props => {
    return(
        <div className="container-fluid weekly-offer">
            <div className="container weekly-offer">
                <h5>{props.label}</h5>
                <OwlCarousel
                    className="owl-carousel-2 owl-carousel owl-theme owl-loaded owl-drag"
                    margin={10}
                    nav={true}
                    dots={false}
                    items={1}
                    lazyLoad={true}
                    navText={['<span></span>', '<span></span>']}>
                    {props.products.map((product, index) => <OfferProduct key={index} product={product} weekly={props.weekly ? props.weekly : false}/>)}
                </OwlCarousel>
            </div>
        </div>
    );
}

export default Offer;