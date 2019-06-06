import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {
  Elements,
  StripeProvider
} from 'react-stripe-elements'

import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';

import c from './Checkout.module.css';
import StripeComponent from './StripeComponent';

const Checkout = props => {

    const [countries, setCountries] = useState([]);

    useEffect(() => { 
        document.title = "Checkout" ;
        getAllCountries();
    }, []);

    const getAllCountries = async () => {
        const response = await axios.get('https://restcountries.eu/rest/v2/all?fields=name');
        const newCountries = response.data.map(country => country.name);
        setCountries(newCountries);
    }

    return(
        <React.Fragment>
            <div className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <Link to="/">Home</Link>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/cart">Cart</a>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">Checkout</a>
                    </div>
                </div>
            </div>

            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
                <Elements>
                    <StripeComponent  countries={countries}/>
                </Elements>
            </StripeProvider>

            <ContainerIcons />
        </React.Fragment>
    );
}

export default Checkout;