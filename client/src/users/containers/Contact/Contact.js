import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import FooterSocialIcons from '../../components/UI/FooterSocialIcons/FooterSocialIcons';
import ContactForm from './ContactForm/ContactForm';
import Map from './Map'

import c from './Contact.module.css';
import SmallSpinner from '../../components/UI/SmallSpinner/SmallSpinner';

const Contact = props => {
    const [socialIcons,setSocialIcons] = useState([]);

    const [store, setStore] = useState({});

    useEffect(() => { 
        document.title = "Contact";
        props.getStore();
    }, []);

    useEffect(() => { 
        if(Object.keys(props.store).length > 0){
            setStore({...props.store})
            const links = Object.keys(props.store.links).map(link => {
                if(link === 'facebook') {
                    return { link: props.store.links[link], icon: 'fab fa-facebook-f' };
                }
                return { link: props.store.links[link], icon: 'fab fa-'+link };
            })
            setSocialIcons(links)
        }
    }, [props.store]);

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
        
            {Object.keys(store).length > 0 ? <section className="container google-map">
                <div id="map-container" style={{height:'444px',marginTop: '15px', position: 'relative'}}>
                    <Map location={store.location}/>
                </div>
            </section> : <SmallSpinner />}
        
            <div className={c.container + " container contact-info " + c.contactInfo}>
                <div className={c.row + " row"}>
                    <div className={cols + " col-12 col-sm-6 col-lg-3"}>
                        <div className={c.col12 + " col-12"}>
                            <i className="fas fa-map-marker-alt"></i>
                            <h5>Address</h5>
                            <p>{store.address}</p>
                        </div>
                    </div>
                    <div className={cols + " col-12 col-sm-6 col-lg-3"}>
                        <div className={c.col12 + " col-12"}>
                            <i className="fas fa-phone-volume"></i>
                            <h5>Phone</h5>
                            <p>{store.phone}</p>
                        </div>
                    </div>
                    <div className={cols + " col-12 col-sm-6 col-lg-3"}>
                        <div className={c.col12 + " col-12"}>
                            <i className="fas fa-envelope"></i>
                            <h5>Email</h5>
                            <p>{store.email}</p>
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

const mapSatateToProps = state => ({
    store: state.stores.store
});

const dispatchMapToProps = dispatch => ({
    getStore: () => dispatch(actions.getStoreContact())
});

export default connect(mapSatateToProps, dispatchMapToProps)(Contact);