import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';

import c from './Storelocator.module.css';
import image from '../../assets/images/balck2.jpg';

const StoreLocator = props => {

    useEffect(() => { document.title = "Storelocator" }, []);

    return(
        <React.Fragment>
            <div className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <Link to="/">Home</Link>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">Store Locator</a>
                    </div>
                </div>
            </div>
    
            <div className={c.containerfluid + " container-fluid " + c.storelocator}>
                <div className={c.row + " row"} style={{padding:0}}>
                    <div className={c.colxl3 + " col-xl-3"}>
                        <h5>Store Locator</h5>
                        <ul className={c.countries}>
                            <li>
                                <a className={c.country} data-toggle="collapse" href="/" role="button" aria-expanded="false">$country->name ($country->name)</a>
                                <ul className={c.collapse+ " collapse"} id="country">
                                    <li>
                                        <a className={c.city} href="/">$city->name</a> ($city->name)
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className={c.colxl2 + " col-xl-2 " + c.storedescription}>
                        <h5 id="country">$shops[0]->country</h5>
                        <img src={image} alt="" />
                        <h6>Address</h6>
                        <p className={c.addressparagraph} id="address"></p>
                        <h6>Phone</h6>
                        <p id="phone_number"></p>
                        <h6>Email</h6>
                        <p id="email_address"></p>
                        <h6>Opening Hours</h6>
                        <p id="open_hours"></p>
                    </div>
                    <div className={c.colxl7 + " col-xl-7"} style={{padding:0}}>
                        <div id="map-container" style={{height:'600px'}}></div>
                    </div>
                </div>
            </div>
    
            <ContainerIcons />
        </React.Fragment>
    );
}

export default StoreLocator;