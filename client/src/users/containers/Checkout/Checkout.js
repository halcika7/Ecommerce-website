import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Elements, StripeProvider } from 'react-stripe-elements'

import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';
import StripeComponent from './StripeComponent';

const Checkout = props => {

    const [countries, setCountries] = useState([]);

    useEffect(() => { 
        document.title = "Checkout" ;
        getAllCountries();
    }, []);

    const getAllCountries = async () => {
        const response = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code');
        const newCountries = response.data.map(country => ({name: country.name, code: country.alpha2Code}));
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
                    <StripeComponent callBack={props.history.push} countries={countries}/>
                </Elements>
            </StripeProvider>

            <ContainerIcons />
        </React.Fragment>
    );
}

export default Checkout;