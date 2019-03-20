import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import FooterSocialIcons from '../../components/UI/FooterSocialIcons/FooterSocialIcons';
import ContactForm from './ContactForm/ContactForm';

import c from './Contact.module.css';

const Contact = props => {
    const [socialIcons] = useState([
        {link: '/', icon: 'fab fa-facebook-f'},
        {link: '/', icon: 'fab fa-twitter'},
        {link: '/', icon: 'fab fa-instagram'},
        {link: '/', icon: 'fab fa-pinterest'},
        {link: '/', icon: 'fab fa-dribbble'},
        {link: '/', icon: 'fab fa-google'}
    ]);

    useEffect(() => { document.title = "Contact" }, []);

    const cols = [c.col12,c.colsm6,c.collg3].join(' ');

    const cols2 = [c.colmd12,c.collg8].join(' ');
    
    return(
        <React.Fragment>
            <section className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <Link to="/">Home</Link>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">Contact</a>
                    </div>
                </div>
            </section>
        
            <section className="container google-map">
                <div id="map-container" style={{height:'444px', backgroundColor: 'blue', marginTop: '15px'}}></div>
            </section>
        
            <div className={c.container + " container contact-info " + c.contactInfo}>
                <div className={c.row + " row"}>
                    <div className={cols + " col-12 col-sm-6 col-lg-3"}>
                        <div className={c.col12 + " col-12"}>
                            <i className="fas fa-map-marker-alt"></i>
                            <h5>Address</h5>
                            <p>$shop</p>
                        </div>
                    </div>
                    <div className={cols + " col-12 col-sm-6 col-lg-3"}>
                        <div className={c.col12 + " col-12"}>
                            <i className="fas fa-phone-volume"></i>
                            <h5>Phone</h5>
                            <p>$shop->phone_number</p>
                        </div>
                    </div>
                    <div className={cols + " col-12 col-sm-6 col-lg-3"}>
                        <div className={c.col12 + " col-12"}>
                            <i className="fas fa-envelope"></i>
                            <h5>Email</h5>
                            <p>$shop->email</p>
                        </div>
                    </div>
                    <div className={cols + " col-12 col-sm-6 col-lg-3"}>
                        <div className={c.col12 + " col-12"}>
                            <i className="fas fa-share-alt"></i>
                            <h5>Follow Us</h5>
                            <FooterSocialIcons icons={socialIcons}/>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className={c.container + " container " + c.contactmessage}>
                <div className={c.row + " row justify-content-center"}>
                    <div className={cols2 + " col-md-12 col-lg-8"}>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Contact;